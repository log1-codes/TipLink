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
          Built on Solana
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Send crypto to anyone.<br/>No wallet required.
        </h1>

        <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
          Create a link, drop in some SOL, and share it. The recipient clicks the link to claim — even if they&apos;ve never used crypto before. That&apos;s it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-28">
          <Link href="/dashboard" className="px-8 py-3.5 rounded-full text-on-primary font-bold ambient-shadow hover:opacity-90 transition"  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}>
            Start Sending
          </Link>
          <a href="#how-it-works" className="px-8 py-3.5 rounded-full text-white font-bold border border-white/10 hover:bg-surface-container transition">
            See How It Works
          </a>
        </div>

        {/* How it works grid */}
        <section id="how-it-works" className="w-full text-left">
           <h2 className="text-sm font-bold text-on-surface-variant tracking-widest uppercase mb-8">Three steps. That&apos;s all.</h2>
           <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl ghost-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                 <div className="text-primary text-4xl font-light mb-8">01.</div>
                 <h3 className="text-lg font-bold text-white mb-3">Sign in with Google</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   We create a Solana wallet for you behind the scenes. No extensions, no seed phrases, no setup. One click and you&apos;re in.
                 </p>
              </div>
              <div className="glass-panel p-6 rounded-2xl ghost-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                 <div className="text-primary text-4xl font-light mb-8">02.</div>
                 <h3 className="text-lg font-bold text-white mb-3">Pick an amount, get a link</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   Choose how much SOL to send. We lock the funds and generate a unique claim link you can share anywhere — text, email, Twitter, wherever.
                 </p>
              </div>
              <div className="glass-panel p-6 rounded-2xl ghost-border overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                 <div className="text-primary text-4xl font-light mb-8">03.</div>
                 <h3 className="text-lg font-bold text-white mb-3">Recipient claims instantly</h3>
                 <p className="text-sm text-on-surface-variant leading-relaxed">
                   They open the link, sign in, and the SOL lands in their wallet. No app downloads. Works on any device with a browser.
                 </p>
              </div>
           </div>
        </section>

      </main>
    </>
  );
}
