import Navbar from "./Navbar";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-[420px] glass-panel rounded-2xl p-8 ambient-shadow border border-white/5 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
           <div className="w-16 h-16 mx-auto bg-surface-container flex items-center justify-center rounded-full mb-6 border border-white/10 relative z-10">
             <div className="w-8 h-8 text-primary opacity-80">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
           </div>
           
           <h1 className="text-2xl font-bold text-white mb-3 relative z-10">{title}</h1>
           <p className="text-sm text-on-surface-variant leading-relaxed relative z-10">
             This module is currently under development. Stay tuned for advanced CoinLink capabilities.
           </p>
        </div>
      </main>
    </>
  );
}
