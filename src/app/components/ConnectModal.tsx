"use client";

export default function ConnectModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[420px] glass-panel rounded-2xl p-6 md:p-8 ambient-shadow border border-white/5 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold tracking-tight text-white">Connect Identity</h1>
          <button onClick={onClose} className="text-on-surface-variant hover:text-white transition cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
          Select your gateway to the CoinLink ecosystem.<br/>
          Secured by institutional-grade encryption.
        </p>

        <div className="space-y-3">
          {[
            { id: 'metamask', name: 'MetaMask', desc: 'ETHEREUM & L2S' },
            { id: 'walletconnect', name: 'WalletConnect', desc: 'UNIVERSAL PROTOCOL' },
            { id: 'ledger', name: 'Ledger', desc: 'COLD STORAGE' },
          ].map((wallet) => (
            <button 
              key={wallet.id}
              onClick={() => {
                 onClose();
                 window.location.href = '/dashboard';
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition border border-white/5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition">
                 <div className="w-5 h-5 bg-on-surface-variant rounded-sm opacity-50"></div>
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm text-white">{wallet.name}</div>
                <div className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase mt-0.5">{wallet.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-surface-container-low/50 border border-white/5 text-xs text-on-surface-variant flex items-start gap-3">
          <div className="mt-0.5 text-primary shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="leading-relaxed">
            <strong className="text-white font-semibold block mb-0.5">New to CoinLink?</strong>
            Connecting establishes a secure session. We never store your private keys or phrase. <a href="#" className="text-primary hover:text-primary-container transition">Learn about CoinLink Security</a>
          </p>
        </div>
      </div>
    </div>
  );
}
