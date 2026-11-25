import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#fafaf8]/80 border-b border-[#e8e2d6]">
      <Link href="/" className="text-base font-bold tracking-tight text-[#1a1710]">
        unique<span className="text-[#e8622a]">ideas</span>.in
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium text-[#5a5648]">
        <Link href="/#ideas" className="hover:text-[#1a1710] transition-colors">Ideas</Link>
      </div>
    </nav>
  );
}
