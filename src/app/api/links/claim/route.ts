import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import { prisma } from "@/lib/Prisma";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please sign in to claim." }, { status: 401 });
    }

    const { privateKey } = await req.json();

    if (!privateKey) {
      return NextResponse.json({ error: "Missing CoinLink private key" }, { status: 400 });
    }

    // 1. Recover the temporary CoinLink Keypair
    let tempKeypair: Keypair;
    try {
      const decodedSecret = bs58.decode(privateKey);
      tempKeypair = Keypair.fromSecretKey(decodedSecret);
    } catch (e) {
      return NextResponse.json({ error: "Invalid CoinLink key format" }, { status: 400 });
    }

    // 2. Check balance of the CoinLink
    const balance = await connection.getBalance(tempKeypair.publicKey);

    if (balance <= 0) {
      return NextResponse.json({ error: "This CoinLink is empty or already claimed" }, { status: 400 });
    }

    // 3. Find recipient (current logged-in user)
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser || !dbUser.publicKey) {
      return NextResponse.json({ error: "Recipient user address not found" }, { status: 404 });
    }

    const recipientPubkey = new PublicKey(dbUser.publicKey);

    // 4. Create Transfer Transaction (Temp -> User)
    // To avoid "insufficient funds for rent", we must drain the account COMPLETELY to 0.
    // The fee for a simple transfer is typically 5000 lamports.
    const fee = 5000;
    const claimAmount = balance - fee;

    if (claimAmount <= 0) {
      return NextResponse.json({ error: "Balance too low to cover transaction fees" }, { status: 400 });
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: tempKeypair.publicKey,
        toPubkey: recipientPubkey,
        lamports: claimAmount,
      })
    );

    // 5. Sign and Confirm
    // tempKeypair is the sender and the fee payer. 
    // After transferring claimAmount, exactly 5000 lamports will remain, 
    // which will then be consumed by the transaction fee, leaving exactly 0.
    const signature = await sendAndConfirmTransaction(connection, transaction, [tempKeypair]);

    return NextResponse.json({
      success: true,
      signature,
      amountClaimed: claimAmount / LAMPORTS_PER_SOL,
    });

  } catch (error: any) {
    console.error("Link Claim Error:", error);

    // Check for specific Solana errors
    let message = error.message || "Failed to claim CoinLink";
    if (message.includes("insufficient funds for rent")) {
      message = "Transaction failed: Account must be fully drained or stay rent-exempt.";
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
