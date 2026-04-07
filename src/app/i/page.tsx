"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
import Navbar from "../components/Navbar";

export default function ClaimPage() {
  const { data: session, status } = useSession();
  const [balance, setBalance] = useState<number | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    async function loadLinkData() {
      try {
        const hash = window.location.hash.replace("#", "");
        if (!hash) {
          setError("No Link detected. Make sure you have the full URL.");
          setLoading(false);
          return;
        }

        setPrivateKey(hash);
        const connection = new Connection("https://api.devnet.solana.com");
        const decodedSecret = bs58.decode(hash);
        const tempKeypair = Keypair.fromSecretKey(decodedSecret);

        const lamports = await connection.getBalance(tempKeypair.publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (err) {
        console.error(err);
        setError("Invalid link format.");
      } finally {
        setLoading(false);
      }
    }

    loadLinkData();
  }, []);

  const handleClaim = async () => {
    if (!session) {
      signIn("google");
      return;
    }

    setClaiming(true);
    setError(null);

    try {
      const response = await fetch("/api/links/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privateKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Claim failed");
      }

      setClaimed(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-on-surface-variant font-medium">Loading CoinLink...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 ambient-shadow text-center">

          {error ? (
            <>
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Oops!</h1>
              <p className="text-on-surface-variant mb-8">{error}</p>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-3 bg-surface-container-high text-white font-bold rounded-2xl hover:bg-surface-container-highest transition"
              >
                Go to Home
              </button>
            </>
          ) : claimed ? (
            <>
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 scale-up-animation">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Claimed!</h1>
              <p className="text-on-surface-variant mb-8">
                Funds have been successfully added to your CoinLink wallet.
              </p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-4 bg-primary text-surface font-bold rounded-2xl hover:opacity-90 transition shadow-[0_0_20px_rgba(192,193,255,0.3)]"
              >
                View Dashboard
              </button>
            </>
          ) : (
            <>
              <div className="text-xs font-black tracking-widest text-primary uppercase mb-4">YOU RECEIVED</div>
              <div className="text-6xl font-black text-white mb-2 tracking-tight">
                {balance ? balance.toFixed(2) : "0.00"} <span className="text-2xl text-on-surface-variant">SOL</span>
              </div>
              <div className="text-sm text-on-surface-variant font-medium mb-10">
                Managed securely with AWS KMS
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full py-4 bg-white text-surface font-black rounded-2xl hover:opacity-90 shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {claiming ? (
                    <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {session ? "CLAIM TO WALLET" : "SIGN IN TO CLAIM"}
                </button>

                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                  Instant • Gasless • Secure
                </p>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
