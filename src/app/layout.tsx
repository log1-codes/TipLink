import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIPLINK ",
  description: "Secure Digital Asset Protocol",
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
        {children}
      </body>
    </html>
  );
}
