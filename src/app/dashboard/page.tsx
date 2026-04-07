"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface TransactionItem {
  signature: string;
  type: 'send' | 'receive' | 'other';
  amount: number;
  time: string;
  status: string;
  description: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [hasMounted, setHasMounted] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(145.22);
  const [priceChange, setPriceChange] = useState<number>(12.4);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const isFetchingRef = useRef(false);
  const address = (session?.user as any)?.publicKey;

  // Hydration safety check
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // 1. Fetch live SOL price and 24h change
  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true");
        const data = await res.json();
        if (data.solana) {
          setSolPrice(data.solana.usd);
          setPriceChange(data.solana.usd_24h_change);
        }
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 300000); 
    return () => clearInterval(interval);
  }, []);

  const fetchData = useCallback(async () => {
    if (!address || isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const pubkey = new PublicKey(address);

    try {
      const lamports = await connection.getBalance(pubkey);
      setBalance(lamports / LAMPORTS_PER_SOL);

      setIsLoadingHistory(true);
      const heliusKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
      
      if (!heliusKey) {
        throw new Error("Missing HELIUS_API_KEY in environment variables.");
      }

      const response = await fetch(
        `https://api-devnet.helius-rpc.com/v0/addresses/${address}/transactions/?api-key=${heliusKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Helius API error: ${response.status}`);
      }

      const heliusData = await response.json();
      
      const parsed = heliusData.map((tx: any) => {
        const time = tx.timestamp 
          ? new Date(tx.timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          : "Recently";

        let type: 'send' | 'receive' | 'other' = 'other';
        let amount = 0;

        const nativeTransfer = tx.nativeTransfers?.[0];
        if (nativeTransfer) {
          amount = nativeTransfer.amount / LAMPORTS_PER_SOL;
          if (nativeTransfer.fromUserAccount === address) {
            type = 'send';
          } else if (nativeTransfer.toUserAccount === address) {
            type = 'receive';
          }
        }

        let description = tx.description || "Transaction";
        if (tx.type === 'SWAP') description = "Token Swap";
        if (tx.type === 'COMPRESSED_NFT_MINT') description = "NFT Mint";

        return {
          signature: tx.signature,
          type,
          amount: Number(amount.toFixed(4)),
          time,
          status: "Confirmed",
          description
        } as TransactionItem;
      });

      setTransactions(parsed);
    } catch (err: any) {
      if (!err.message?.includes("429")) {
        console.error("Data fetch error:", err);
      }
    } finally {
      setIsLoadingHistory(false);
      isFetchingRef.current = false;
    }
  }, [address]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); 
    return () => clearInterval(interval);
  }, [fetchData]);

  // Calculate Value Change
  const currentTotalValue = balance * solPrice;
  const yesterdayPrice = solPrice / (1 + priceChange / 100);
  const usdChangeValue = currentTotalValue - (balance * yesterdayPrice);

  if (!hasMounted) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex justify-center py-10 px-4">
          <div className="w-full max-w-5xl animate-pulse">
            <div className="h-64 bg-surface-container-low rounded-2xl mb-10"></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex justify-center py-10 px-4">
        <div className="w-full max-w-5xl">
          
          {/* Balance + Portfolio Growth Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 mt-4">
            <div className="md:col-span-2 glass-panel rounded-2xl p-8 ambient-shadow border border-white/5">
              <div className="text-xs font-bold tracking-widest text-on-surface-variant uppercase mb-2">Total Balance</div>
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-3">
                ${currentTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-on-surface-variant mb-6">
                {balance.toFixed(4)} SOL &middot; ${solPrice.toFixed(2)}/SOL
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 ambient-shadow border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Portfolio Growth</div>
                  <div className={`text-sm font-bold ${priceChange >= 0 ? "text-primary" : "text-red-400"}`}>
                    {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{balance.toFixed(4)} SOL</div>
                <div className={`text-xs font-medium mt-1 ${usdChangeValue >= 0 ? "text-primary/70" : "text-red-400/70"}`}>
                  {usdChangeValue >= 0 ? "+" : "-"}${Math.abs(usdChangeValue).toFixed(2)} (24h Change)
                </div>
              </div>
              <div className="h-20 flex items-end gap-2 mt-6">
                {[40, 50, 45, 65, 80, 75, 95].map((height, i) => (
                  <div key={i} className="flex-1 bg-surface-container-highest rounded-t-sm transition-all duration-500 hover:bg-primary/80" style={{ height: `${height}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link
                href="/send"
                className="glass-panel rounded-2xl p-5 border border-white/5 hover:bg-surface-container-highest transition group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white mb-1">Send via Link</div>
                <div className="text-[10px] text-on-surface-variant">Create a shareable CoinLink</div>
              </Link>

              <Link
                href="/claim"
                className="glass-panel rounded-2xl p-5 border border-white/5 hover:bg-surface-container-highest transition group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white mb-1">Claim Funds</div>
                <div className="text-[10px] text-on-surface-variant">Redeem a received CoinLink</div>
              </Link>

              <Link
                href="/swap"
                className="glass-panel rounded-2xl p-5 border border-white/5 hover:bg-surface-container-highest transition group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white mb-1">Swap Assets</div>
                <div className="text-[10px] text-on-surface-variant">Exchange tokens instantly</div>
              </Link>

            </div>
          </div>

          {/* Holdings + Activity */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-white mb-6">Active Holdings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-panel rounded-2xl p-5 border border-white/5 hover:bg-surface-container-highest transition">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                      <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(192,193,255,0.8)]"></div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white uppercase">Solana</div>
                      <div className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">SOL Native</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-xl text-white mb-1">{balance.toFixed(4)} SOL</div>
                    <div className="text-sm text-on-surface-variant">${currentTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-white/5 h-full">
               <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Recent Activity</h3>
               
               {isLoadingHistory ? (
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-4 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-surface-container-highest rounded w-3/4"></div>
                          <div className="h-2 bg-surface-container-highest rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : transactions.length === 0 ? (
                 <div className="text-xs text-on-surface-variant italic">No recent transactions found.</div>
               ) : (
                 <div className="space-y-6">
                    {transactions.map((tx, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className={`w-8 h-8 rounded-full shrink-0 mt-1 flex items-center justify-center transition ${tx.type === 'receive' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                          {tx.type === 'receive' ? (
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                               <path d="M7 10l5 5 5-5M12 15V3" />
                             </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                               <path d="M17 14l-5-5-5 5M12 9v12" />
                             </svg>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-start mb-1">
                            <div className="text-sm font-semibold text-white truncate max-w-[150px]">{tx.description}</div>
                            <div className="text-[10px] text-on-surface-variant shrink-0 ml-2">{tx.time}</div>
                          </div>
                          <div className="text-[10px] text-on-surface-variant mb-1 font-mono truncate opacity-60 group-hover:opacity-100 transition">
                            {tx.signature.substring(0, 12)}...
                          </div>
                          <div className={`text-xs font-bold ${tx.type === 'receive' ? 'text-primary' : 'text-white'}`}>
                            {tx.type === 'receive' ? "+" : "-"}{tx.amount} SOL
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               )}

               <div className="mt-8 pt-6 border-t border-white/5">
                <a 
                  href={`https://explorer.solana.com/address/${address}?cluster=devnet`}
                  target="_blank"
                  className="block w-full text-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-white transition"
                >
                  View Full Explorer
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
