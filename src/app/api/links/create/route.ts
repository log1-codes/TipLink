import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { prisma } from "@/lib/Prisma";
import { loadKmsWallet } from "@/lib/wallet";
import bs58 from "bs58";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.encryptedPrivateKey) {
      return NextResponse.json({ error: "User wallet not found" }, { status: 404 });
    }

    const userKeypair = await loadKmsWallet(user.encryptedPrivateKey);

    // 1. Calculate Rent-Exempt Minimum
    // All Solana accounts must now be rent-exempt. For a 0-byte system account, this is ~0.00089 SOL.
    const rentExemptBalance = await connection.getMinimumBalanceForRentExemption(0);
    const amountInLamports = Number(amount) * LAMPORTS_PER_SOL;
    const totalFunding = amountInLamports + rentExemptBalance;

    // 2. Generate a new temporary CoinLink Keypair
    const tempKeypair = Keypair.generate();

    // 3. Create Transfer Transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userKeypair.publicKey,
        toPubkey: tempKeypair.publicKey,
        lamports: totalFunding,
      })
    );

    // 4. Send and Confirm
    const signature = await sendAndConfirmTransaction(connection, transaction, [userKeypair]);

    return NextResponse.json({
      success: true,
      signature,
      publicKey: tempKeypair.publicKey.toBase58(),
      privateKey: bs58.encode(tempKeypair.secretKey),
      amount: amount,
      rentExemptFee: rentExemptBalance / LAMPORTS_PER_SOL
    });

  } catch (error: any) {
    console.error("Link Creation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create CoinLink" },
      { status: 500 }
    );
  }
}
