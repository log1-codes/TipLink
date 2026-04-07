import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-4 py-20 text-center relative">
        
        {/* Ambient glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
          The Kinetic Observatory
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Institutional-Grade<br/>Asset Intelligence.
        </h1>

        <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
          CoinLink is a secure protocol designed for creating, sending, and holding digital assets with precision. Generate non-custodial transfer links, monitor your active treasury, and execute swaps with deep liquidity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-28">
          <Link href="/dashboard" className="px-8 py-3.5 rounded-full text-on-primary font-bold ambient-shadow hover:opacity-90 transition"  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}>
            Enter App
          </Link>
          <a href="#how-it-works" className="px-8 py-3.5 rounded-full text-white font-bold border border-white/10 hover:bg-surface-container transition">
            Explore Protocol
          </a>
        </div>

        {/* How it works grid */}
        <div id="how-it-works" className="w-full text-left">
           <h2 className="text-sm font-bold text-on-surface-variant tracking-widest uppercase mb-8">How to use CoinLink</h2>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl ghost-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                 <div className="text-primary text-4xl font-light mb-8">01.</div>
                 <h3 className="text-lg font-bold text-white mb-3">Connect Identity</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   Authenticate through a secure, non-custodial session. Your keys remain completely offline; we only sign what you approve. Click "Connect Wallet" at the top right to start.
                 </p>
              </div>
              <div className="glass-panel p-6 rounded-2xl ghost-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                 <div className="text-primary text-4xl font-light mb-8">02.</div>
                 <h3 className="text-lg font-bold text-white mb-3">Generate Transfers</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   Use the "Send" module to escrow funds into a smart contract and mint a secure digital voucher link. Perfect for tipping recipients without addresses.
                 </p>
              </div>
              <div className="glass-panel p-6 rounded-2xl ghost-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                 <div className="text-primary text-4xl font-light mb-8">03.</div>
                 <h3 className="text-lg font-bold text-white mb-3">Monitor Treasury</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   The dashboard acts as your intelligence hub. You can monitor performance metrics, verify claims, swap assets, and oversee your holdings dynamically.
                 </p>
              </div>
           </div>
        </div>

      </main>
    </>
  );
}
