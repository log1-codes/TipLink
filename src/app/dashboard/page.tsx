import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex justify-center py-10 px-4">
        <div className="w-full max-w-5xl">
          
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 mt-4">
            <div className="md:col-span-2 glass-panel rounded-2xl p-8 ambient-shadow border border-white/5">
              <div className="text-xs font-bold tracking-widest text-on-surface-variant uppercase mb-2">Total Value Locked</div>
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
                $142,850.<span className="text-on-surface-variant text-4xl md:text-5xl">62</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-on-surface text-surface font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition shadow-[0px_4px_12px_rgba(255,255,255,0.1)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send via Link
                </button>
                <button className="flex items-center gap-2 ghost-border bg-surface-container-low/50 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-surface-container-high transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Claim Funds
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 ambient-shadow border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">24h Performance</div>
                  <div className="text-primary text-sm"> {/* Graph icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7l-7 7-4-4-6 6M21 7v6M21 7h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">+12.4%</div>
              </div>
              <div className="h-20 flex items-end gap-2 mt-6">
                {[40, 50, 45, 65, 80, 75, 95].map((height, i) => (
                  <div key={i} className="flex-1 bg-surface-container-highest rounded-t-sm transition-all duration-500 hover:bg-primary/80" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Holdings */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Active Holdings</h2>
                <button className="text-sm font-semibold text-primary hover:text-primary-container transition">Manage All</button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'ETH', fullName: 'ETHEREUM', balance: '12.450 ETH', fiat: '$28,124.30', isPrimary: true },
                  { name: 'USDC', fullName: 'CIRCLE USD', balance: '84,200.00', fiat: '$84,200.00', isPrimary: false },
                  { name: 'COIN', fullName: 'COINLINK', balance: '3,400.00', fiat: '$12,410.22', isPrimary: false }
                ].map((token, i) => (
                  <div key={i} className="glass-panel rounded-2xl p-5 border border-white/5 hover:bg-surface-container-highest transition cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-white/10">
                        {token.isPrimary ? (
                           <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_12px_rgba(192,193,255,0.5)]"></div>
                        ) : (
                           <div className="w-5 h-5 rounded-full bg-on-surface-variant opacity-80"></div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">{token.name}</div>
                        <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">{token.fullName}</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-xl text-white mb-1">{token.balance}</div>
                      <div className="text-sm text-on-surface-variant">{token.fiat}</div>
                    </div>
                  </div>
                ))}

                <button className="glass-panel ghost-border rounded-2xl p-5 flex flex-col items-center justify-center min-h-[160px] text-on-surface-variant hover:text-white hover:border-primary/40 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold">Import Assets</span>
                </button>
              </div>
            </div>

            {/* Sidebar Data */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 h-full">
               <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Activity</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-on-surface-variant">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="space-y-6">
                {[
                  { action: 'Swap ETH to TIP', status: 'Status: Confirmed on Mainnet', value: '-0.50 ETH → +140.2 TIP', time: '12m ago', type: 'swap' },
                  { action: 'Received From Link', status: 'Sender: 0x8a...4b2d', value: '+1,200.00 USDC', time: '2h ago', type: 'receive' },
                  { action: 'Staked in Pool A', status: 'APY: 18.2% Compound', value: '1,500.00 TIP', time: '5h ago', type: 'stake' },
                  { action: 'Sent via Link', status: 'Unclaimed link expires in 4d', value: '250.00 USDC', time: 'Yesterday', type: 'send' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest shrink-0 mt-1 flex items-center justify-center">
                       <div className="w-3 h-3 rounded-sm bg-on-surface-variant opacity-60"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-sm font-semibold text-white">{item.action}</div>
                        <div className="text-xs text-on-surface-variant shrink-0">{item.time}</div>
                      </div>
                      <div className="text-xs text-on-surface-variant mb-2">{item.status}</div>
                      <div className={`text-xs font-semibold ${item.value.startsWith('+') ? 'text-primary' : 'text-white'}`}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button className="w-full text-center text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition">View Full Explorer</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
