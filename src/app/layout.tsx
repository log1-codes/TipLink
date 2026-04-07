import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoinLink — Send Crypto to Anyone with a Link",
  description: "Send SOL to anyone using a simple link. No wallet needed to receive. Built on Solana for fast, low-cost transfers.",
  keywords: ["crypto transfer", "send SOL", "Solana payments", "crypto link", "send crypto without wallet"],
  openGraph: {
    title: "CoinLink — Send Crypto to Anyone with a Link",
    description: "Send SOL to anyone using a simple link. No wallet needed to receive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased bg-surface text-on-surface`}
    >
      <body className="min-h-full flex flex-col font-sans relative overflow-x-hidden">
       <Providers>
           {children}
       </Providers>
      </body>
    </html>
  );
}
