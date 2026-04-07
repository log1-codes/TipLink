"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Claim() {
  const [claimUrl, setClaimUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClaimLink = () => {
    if (!claimUrl) return;
    setError(null);
    try {
      const url = new URL(claimUrl);
      const hash = url.hash;
      if (hash) {
        window.location.href = `/i${hash}`;
      } else {
        setError("This link doesn't look right. Make sure it contains the full URL with the # key.");
      }
    } catch (e) {
      setError("That doesn't look like a valid URL. Double-check and try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 lg:py-20 flex flex-col h-full relative">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center flex-1">

          {/* Left Side: Hero Text */}
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">Claim SOL</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Someone sent<br />you <span className="text-primary">crypto.</span>
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-10 max-w-sm">
              Paste the link you received below. We&apos;ll verify it on-chain and move the SOL into your wallet.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-on-surface-variant">
                    <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2zM5 8h14M5 16h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Sign in first</h3>
                  <p className="text-[10px] md:text-xs text-on-surface-variant leading-relaxed">Use your Google account. We&apos;ll set up a wallet if you don&apos;t have one.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 rounded bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-on-surface-variant">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Verified on Solana</h3>
                  <p className="text-[10px] md:text-xs text-on-surface-variant leading-relaxed">We check the link against the blockchain before moving any funds.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Claim Card */}
          <div className="flex flex-col max-w-md w-full mx-auto lg:mr-0 relative pt-10 lg:pt-0">

            {/* Glowing Padlock Float */}
            <div className="absolute right-6 -top-6 w-16 h-16 rounded-full glass-panel border border-white/10 ambient-shadow flex items-center justify-center z-20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-on-surface-variant">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5 relative z-10 shadow-[0_24px_48px_rgba(0,0,0,0.3)]">

              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Claim</div>
                  <div className="text-sm font-bold text-white tracking-widest uppercase">Paste your link</div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center border border-white/5">
                  <div className="w-4 h-4 text-primary">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">CoinLink URL</div>
                <input
                  type="text"
                  value={claimUrl}
                  onChange={(e) => { setClaimUrl(e.target.value); setError(null); }}
                  placeholder="https://coinlink-six.vercel.app/i#..."
                  className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-primary/50 transition placeholder:text-on-surface-variant/40"
                />
                {error && (
                  <div className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                    </svg>
                    {error}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleClaimLink}
                  disabled={!claimUrl}
                  className="w-full text-on-primary text-base font-bold rounded-xl py-4 transition hover:opacity-90 ambient-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
                >
                  Claim My SOL
                </button>
                <Link
                  href="/dashboard"
                  className="block w-full text-center text-white text-sm font-bold rounded-xl py-4 transition bg-surface-container-highest border border-white/5 hover:bg-surface-container-high ghost-border"
                >
                  Go to Dashboard
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-surface border-white/5 flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-gradient-to-tr from-yellow-500 to-orange-400"></div></div>
                  <div className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-surface border-white/5 flex items-center justify-center overflow-hidden"><div className="w-full h-full bg-gradient-to-tr from-cyan-500 to-blue-500"></div></div>
                  <div className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-surface flex items-center justify-center border border-white/5 text-[9px] font-bold text-white">+5</div>
                </div>
                <div className="text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">
                  Powered by Solana
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Feature Bar */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 pb-8 border-t border-white/5 pt-10">
          {[
            { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Funds are locked', desc: 'SOL sits in an escrow wallet until the recipient claims it. If nobody claims, it stays there.' },
            { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Settled in seconds', desc: 'Once you hit claim, the SOL moves to your wallet within a few seconds. No waiting around.' },
            { icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title: 'Runs on Solana', desc: 'Transactions cost a fraction of a cent and confirm in under a second.' },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-start text-left">
              <div className="w-5 h-5 text-on-surface-variant mb-4">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d={feature.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-[10px] md:text-xs text-on-surface-variant leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </main>
    </>
  );
}
