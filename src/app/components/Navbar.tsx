"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-[90%] max-w-5xl flex items-center justify-between border border-gray-300 rounded-xl px-4 py-2 shadow-sm bg-white/60 backdrop-blur">

        <Link
          href="/"
          className="text-gray-800 font-semibold tracking-tight hover:opacity-80 transition"
        >
          TipLink
        </Link>

        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">

          <a
            href="https://github.com/log1-codes/TipLink.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-white transition"
          >
            <Image 
              src="/github-svgrepo-com.svg"   
              alt="GitHub"
              width={16}
              height={16}
            />
            <span>Star</span>
          </a>

          <div className="w-px h-4 bg-gray-300" />

          <button
            onClick={() => console.log("Login with Google")}
            className="flex items-center cursor-pointer gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-white transition"
          >
            <Image
              src="/google-icon.svg"
              alt="Google"
              width={16}
              height={16}
            />
            <span>Login</span>
          </button>

        </div>
      </div>
    </div>
  );
}