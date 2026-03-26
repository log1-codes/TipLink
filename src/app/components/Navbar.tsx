import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-[90%] max-w-5xl flex items-center justify-between border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 shadow-sm">
        <Link
          href="/"
          className="text-gray-800 font-medium cursor-pointer hover:opacity-80 transition"
        >
          TipLink
        </Link>
        <a
          href="https://github.com/log1-codes/TipLink.git"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-gray-400 rounded-lg px-4 py-1 text-sm hover:bg-gray-200 transition cursor-pointer"
        >
          <Image 
            src="/github-svgrepo-com.svg"   
            alt="GitHub"
            width={16}
            height={16}
            className="opacity-80"
          />
          <span>star on github</span>
        </a>

      </div>
    </div>
  );
}