import Navbar from "../components/Navbar";

export default function Send() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 md:py-24">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Form */}
          <div className="max-w-md w-full mx-auto lg:mx-0">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Precision Transfer</div>
            <h1 className="text-4xl font-bold text-white mb-4">Create Asset Link</h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-10">
              Send funds to anyone via a secure, encrypted claim link. They don't even need a wallet to accept them.
            </p>

            <div className="mb-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Amount to Transfer</div>
              <div className="glass-panel ghost-border rounded-xl p-4 flex justify-between items-center bg-surface-container-high transition-colors focus-within:bg-surface-container-lowest focus-within:border-primary/60">
                <input type="text" placeholder="0.00" className="bg-transparent text-3xl font-bold text-white w-full outline-none placeholder:text-on-surface-variant/50" />
                <button className="flex items-center gap-2 bg-surface-container-low border border-white/10 rounded-full px-3 py-1.5 hover:bg-surface-container-highest transition shrink-0 ml-4">
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                  </div>
                  <span className="text-sm font-bold text-white">ETH</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-surface-variant">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center mt-3 text-xs">
                 <span className="text-on-surface-variant">Balance: 12.45 ETH</span>
                 <button className="text-primary font-bold hover:text-primary-container transition">Use Max</button>
              </div>
            </div>

            <div className="mb-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Claim Requirements</div>
              <div className="grid grid-cols-2 gap-4">
                 
                 <label className="flex items-start gap-3 cursor-pointer group">
                   <div className="w-5 h-5 rounded border border-white/20 bg-surface-container flex items-center justify-center mt-0.5 group-hover:border-primary transition">
                      {/* Checkbox unselected state */}
                   </div>
                   <div>
                     <div className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-surface-variant">
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Password Protected
                     </div>
                     <div className="text-[10px] text-on-surface-variant leading-relaxed">Recipient needs a secret key to unlock</div>
                   </div>
                 </label>

                 <label className="flex items-start gap-3 cursor-pointer group">
                   <div className="w-5 h-5 rounded border border-primary bg-primary flex items-center justify-center mt-0.5 shadow-[0_0_8px_rgba(192,193,255,0.4)] transition">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-primary">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                   <div>
                     <div className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-surface-variant">
                           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                           <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        24h Expiry
                     </div>
                     <div className="text-[10px] text-on-surface-variant leading-relaxed">Link expires and refunds if unclaimed</div>
                   </div>
                 </label>

              </div>
            </div>

            <button
               className="w-full flex items-center justify-center gap-2 text-on-primary text-base font-bold rounded-xl py-4 transition hover:opacity-90 ambient-shadow"
               style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
            >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
               Generate Secure Link
            </button>

          </div>

          {/* Right Side: Card Preview */}
          <div className="flex flex-col gap-6 max-w-md w-full mx-auto lg:mr-0 pl-0 lg:pl-12">
            
            <div className="glass-panel p-8 rounded-[2rem] border border-white/5 relative overflow-hidden h-[300px] flex flex-col shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
               {/* Card Gradient Background */}
               <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest/80 to-surface-container-low opacity-90 z-0"></div>
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] z-0"></div>
               
               {/* Header */}
               <div className="flex justify-between items-start relative z-10 w-full mb-auto mt-2">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-white/10 shrink-0">
                        <div className="w-4 h-4 rounded-full bg-primary shadow-(0_0_8px_rgba(192,193,255,0.6))"></div>
                     </div>
                     <div>
                        <div className="text-sm font-bold text-white tracking-widest uppercase">CoinLink Voucher</div>
                        <div className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Digital Asset Voucher</div>
                     </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></div>
                  </div>
               </div>

               {/* Contents */}
               <div className="relative z-10 w-full flex justify-between items-end mb-2">
                  <div>
                     <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Estimated Value</div>
                     <div className="text-3xl font-bold text-white tracking-tight leading-none mb-2">
                        0.00 <span className="text-on-surface-variant">ETH</span>
                     </div>
                     <div className="text-sm text-on-surface-variant font-medium">≈ $0.00 USD</div>
                  </div>
                  
                  {/* QR Placeholder */}
                  <div className="w-12 h-12 rounded-lg bg-white p-1">
                     <div className="w-full h-full bg-surface-container rounded-sm border border-surface mix-blend-multiply opacity-50 relative overflow-hidden">
                        {/* Simulation of QR code grid */}
                        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-2 border-surface-container-highest"></div>
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-2 border-surface-container-highest"></div>
                        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-2 border-surface-container-highest"></div>
                     </div>
                  </div>
               </div>

               <div className="relative z-10 mt-6 flex items-center gap-2 pt-4 border-t border-white/5 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-on-surface-variant"></div>
                  <div className="w-2 h-2 rounded-full bg-on-surface-variant"></div>
                  <div className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant ml-auto">Security Protocol</div>
               </div>
            </div>

            <div className="glass-panel ghost-border rounded-xl p-5 flex items-start gap-4">
               <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
               <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">Escrowed Security</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                     Funds are securely locked in the CoinLink Escrow contract. Only the link holder with the correct credentials can withdraw them.
                  </p>
               </div>
            </div>

          </div>

        </div>

      </main>
    </>
  );
}
