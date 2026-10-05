import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e2d6] bg-[#f2efe8]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="text-sm font-bold text-[#1a1710] mb-1">
            unique<span className="text-[#e8622a]">ideas</span>.in
          </div>
          <p className="text-xs text-[#a09880]">
            Curating the best gifting ideas on the web.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-[#a09880]">
          <a
            href="https://createmygift.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1a1710] transition-colors"
          >
            createmygift.in
          </a>
          <a
            href="https://boxtales.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1a1710] transition-colors"
          >
            boxtales.in
          </a>
        </div>
      </div>
    </footer>
  );
}
