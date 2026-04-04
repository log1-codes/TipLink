"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ConnectModal from "./ConnectModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Assets", href: "/assets" },
    { name: "Swap", href: "/swap" },
    { name: "Staking", href: "/staking" },
    { name: "Governance", href: "/governance" }
  ];

  return (
    <>
      <nav className="w-full flex justify-center mt-6 z-40 relative">
        <div className="w-full max-w-5xl flex items-center justify-between px-6 py-4">
          
          {/* Brand */}
          <Link
            href="/"
            className="text-white font-bold text-lg tracking-tight hover:opacity-80 transition"
          >
            TipLink
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`pb-1 transition ${isActive ? 'text-white border-b-2 border-primary' : 'text-on-surface-variant hover:text-white border-b-2 border-transparent'}`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Action */}
          <button
            onClick={() => setIsConnectOpen(true)}
            className="text-on-primary text-sm font-semibold rounded-full px-5 py-2 transition hover:opacity-90 ambient-shadow cursor-pointer"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))' }}
          >
            Connect Wallet
          </button>

        </div>
      </nav>

      <ConnectModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
    </>
  );
}