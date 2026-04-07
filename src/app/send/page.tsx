"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Navbar from "../components/Navbar";

export default function Send() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(145.22);
  const [sendAmount, setSendAmount] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isFetchingRef = useRef(false);
  const address = (session?.user as any)?.publicKey;

  // Fetch SOL price
  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
        const data = await res.json();
        if (data.solana) setSolPrice(data.solana.usd);
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    }
    fetchPrice();
  }, []);

  // Fetch wallet balance
  const fetchBalance = useCallback(async () => {
    if (!address || isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const pubkey = new PublicKey(address);
      const lamports = await connection.getBalance(pubkey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error("Balance fetch error:", err);
    } finally {
      isFetchingRef.current = false;
    }
  }, [address]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleCreateLink = async () => {
    if (!sendAmount || isNaN(Number(sendAmount)) || Number(sendAmount) <= 0) return;

    setIsCreating(true);
    try {
      const response = await fetch("/api/links/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(sendAmount) }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create link");

      const link = `${window.location.origin}/i#${data.privateKey}`;
      setCreatedLink(link);
      setTimeout(fetchBalance, 2000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUseMax = () => {
    const maxAmount = Math.max(0, balance - 0.005);
    setSendAmount(maxAmount.toFixed(4));
  };

  const handleReset = () => {
    setCreatedLink(null);
    setSendAmount("");
    setCopied(false);
  };

  const handleCopy = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const numericAmount = Number(sendAmount) || 0;
  const usdValue = numericAmount * solPrice;
  const isValidAmount = numericAmount > 0 && numericAmount <= balance;

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 md:py-24">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Side: Form */}
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Precision Transfer</div>
            <h1 className="text-4xl font-bold text-white mb-4">Create Asset Link</h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-10">
              Send funds to anyone via a secure, encrypted claim link. They don&apos;t even need a wallet to accept them.
            </p>

            {createdLink ? (
              /* Success State */
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '2s' }}></div>
                    <svg className="w-8 h-8 text-primary relative z-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Link Generated!</h4>
                  <p className="text-sm text-on-surface-variant">Share this URL with whoever you want to send the funds to.</p>
                </div>

                <div className="glass-panel ghost-border rounded-xl p-4 break-all text-xs font-mono text-primary select-all">
                  {createdLink}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3.5 bg-white text-surface font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3.5 bg-surface-container-highest text-white font-bold rounded-xl hover:bg-surface-container-high transition ghost-border"
                  >
                    New Link
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Amount to Transfer</div>
                  <div className="glass-panel ghost-border rounded-xl p-4 flex justify-between items-center bg-surface-container-high transition-colors focus-within:bg-surface-container-lowest focus-within:border-primary/60">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="bg-transparent text-3xl font-bold text-white w-full outline-none placeholder:text-on-surface-variant/50"
                    />
                    <div className="flex items-center gap-2 bg-surface-container-low border border-white/10 rounded-full px-3 py-1.5 shrink-0 ml-4">
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                      </div>
                      <span className="text-sm font-bold text-white">SOL</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs">
                    <span className="text-on-surface-variant">Balance: {balance.toFixed(4)} SOL</span>
                    <button
                      onClick={handleUseMax}
                      className="text-primary font-bold hover:text-primary-container transition cursor-pointer"
                    >
                      Use Max
                    </button>
                  </div>
                </div>

                {/* Live Preview */}
                {numericAmount > 0 && (
                  <div className="mb-8 glass-panel ghost-border rounded-xl p-5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Transfer Summary</div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-on-surface-variant">Amount</span>
                      <span className="text-sm font-bold text-white">{numericAmount.toFixed(4)} SOL</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-on-surface-variant">USD Value</span>
                      <span className="text-sm font-bold text-white">≈ ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-on-surface-variant">Network Fee</span>
                      <span className="text-sm font-bold text-on-surface-variant">~0.000005 SOL</span>
                    </div>
                    {numericAmount > balance && (
                      <div className="mt-3 px-3 py-2 bg-error/10 border border-error/20 rounded-lg text-xs text-error font-medium">
                        Insufficient balance
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handleCreateLink}
                  disabled={isCreating || !isValidAmount}
                  className="w-full flex items-center justify-center gap-2 text-on-primary text-base font-bold rounded-xl py-4 transition hover:opacity-90 ambient-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
                >
                  {isCreating ? (
                    <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {isCreating ? "Generating..." : "Generate Secure Link"}
                </button>
              </>
            )}
          </div>

          {/* Right Side: Info Cards */}
          <div className="flex flex-col gap-6 max-w-md w-full mx-auto lg:mr-0 pl-0 lg:pl-12 lg:pt-16">

            {/* How it works */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                How It Works
              </h3>
              <div className="space-y-5">
                {[
                  { step: "01", title: "Enter Amount", desc: "Specify how much SOL you want to send" },
                  { step: "02", title: "Generate Link", desc: "An encrypted link is created with funds escrowed" },
                  { step: "03", title: "Share & Claim", desc: "Recipient opens the link to claim funds instantly" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-[10px] font-bold text-primary group-hover:bg-primary/25 transition">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Info */}
            <div className="glass-panel ghost-border rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 text-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">Escrowed Security</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Funds are securely locked in the CoinLink Escrow contract. Only the link holder can withdraw them.
                </p>
              </div>
            </div>

            {/* Network Badge */}
            <div className="glass-panel ghost-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(192,193,255,0.6)]"></div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Solana Devnet</div>
                  <div className="text-[10px] text-on-surface-variant">Active Network</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Live</span>
              </div>
            </div>

          </div>

        </div>

      </main>
    </>
  );
}
