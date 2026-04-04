import Navbar from "../components/Navbar";

export default function Swap() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        
        <div className="texy-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Swap Assets</h1>
          <p className="text-sm text-on-surface-variant max-w-[400px] text-center leading-relaxed">
            Precision execution with deep liquidity and institutional-grade security.
          </p>
        </div>

        <div className="w-full max-w-[480px]">
          <div className="glass-panel rounded-2xl p-6 md:p-8 ambient-shadow border border-white/5 mb-6 relative">
            
            {/* Pay Section */}
            <div className="bg-surface-container-high rounded-xl p-5 mb-2 relative ghost-border">
              <div className="flex justify-between items-center mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                <span>You Pay</span>
                <span>Balance: 14.50 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                 <input type="text" defaultValue="1.00" className="bg-transparent text-4xl font-bold text-white w-full outline-none" />
                 <button className="flex items-center gap-2 bg-surface-container-low border border-white/10 rounded-full px-3 py-1.5 hover:bg-surface-container-lowest transition shrink-0">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    </div>
                    <span className="text-sm font-bold text-white">ETH</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-surface-variant">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                 </button>
              </div>
            </div>

            {/* Swap Divider Button */}
            <button className="absolute left-1/2 top-[124px] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/20 border-4 border-surface flex items-center justify-center text-primary hover:bg-primary/30 transition z-10 backdrop-blur-md">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </button>

            {/* Receive Section */}
            <div className="bg-surface-container-highest rounded-xl p-5 mb-8 ghost-border relative overflow-hidden">
               {/* Shine effect simulation */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
              <div className="flex justify-between items-center mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant relative z-10">
                <span>You Receive</span>
                <span>Est. 2,450.12</span>
              </div>
              <div className="flex justify-between items-center relative z-10">
                 <input type="text" readOnly defaultValue="2,450.12" className="bg-transparent text-4xl font-bold text-white w-full outline-none" />
                 <button className="flex items-center gap-2 bg-surface-container-low border border-white/10 rounded-full px-3 py-1.5 hover:bg-surface-container-highest transition shrink-0">
                    <div className="w-4 h-4 rounded-full bg-on-surface flex items-center justify-center">
                       <div className="w-2 h-2 rounded-full bg-surface opacity-80"></div>
                    </div>
                    <span className="text-sm font-bold text-white">USDC</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-surface-variant">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                 </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Exchange Rate</span>
                <span className="text-white font-semibold flex items-center gap-2">
                  1 ETH = 2,450.12 USDC
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant flex items-center gap-1">Network Fee <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
                <span className="text-white font-semibold">◈ $4.12</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Slippage Tolerance</span>
                <span className="text-primary font-semibold">0.5%</span>
              </div>
            </div>

            {/* Action */}
            <button
              className="w-full text-on-primary text-base font-bold rounded-xl py-4 transition hover:opacity-90 ambient-shadow"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
            >
              Review Swap
            </button>
          </div>

          {/* Info Features Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Instant Execution', desc: 'Transactions are processed through our high-speed validator cluster.' },
              { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Non-Custodial', desc: 'You maintain full control of your private keys.' },
              { icon: 'M9 20l-5.447-2.724A2 2 0 013 15.489V8.511a2 2 0 01.553-1.787L9 4m6 16l5.447-2.724A2 2 0 0021 15.489V8.511a2 2 0 00-.553-1.787L15 4M9 4v16m6-16v16', title: 'Best Routes', desc: 'Smart routing ensures minimal slippage and optimal returns.' },
            ].map((feature, i) => (
              <div key={i} className="glass-panel ghost-border rounded-xl p-4 md:p-5 flex flex-col items-start text-left">
                <div className="w-8 h-8 md:w-6 md:h-6 text-primary mb-3">
                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d={feature.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
                <h4 className="text-xs font-bold text-white mb-1.5">{feature.title}</h4>
                <p className="text-[10px] md:text-xs text-on-surface-variant leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
