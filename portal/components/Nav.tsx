import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#fafaf8]/80 border-b border-[#e8e2d6]">
      <Link href="/" className="text-base font-bold tracking-tight text-[#1a1710]">
        unique<span className="text-[#e8622a]">ideas</span>.in
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium text-[#5a5648]">
        <a
          href="https://createmygift.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-[#c9960a] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#f2b90d] inline-block" />
          CreateMyGift
        </a>
        <a
          href="https://boxtales.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-[#c44d1c] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#e8622a] inline-block" />
          BoxTales
        </a>
      </div>
    </nav>
  );
}
