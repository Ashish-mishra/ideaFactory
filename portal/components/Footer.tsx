import React from 'react';
import { occasionPages } from '@/lib/occasionPages';

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e2d6] bg-[#f2efe8]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="text-sm font-bold text-[#1a1710] mb-1">
            unique<span className="text-[#e8622a]">ideas</span>.in
          </div>
          <p className="text-xs text-[#a09880]">
            Unique gifts you can order today, and the ones we're building next.
          </p>
        </div>

        <p className="text-xs text-[#a09880] max-w-xs">
          Run by the team behind{' '}
          <a href="https://createmygift.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1710]">createmygift.in</a>
          {' '}and{' '}
          <a href="https://boxtales.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1710]">boxtales.in</a>.
        </p>
      </div>
      <nav aria-label="All gift ideas" className="max-w-5xl mx-auto px-6 pb-10 border-t border-[#e8e2d6] pt-6">
        <div className="text-xs font-bold text-[#1a1710] mb-3">Gift ideas by occasion</div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#a09880]">
          {occasionPages.map((p) => (
            <li key={p.slug}>
              <a href={`/${p.slug}/`} className="hover:text-[#1a1710] transition-colors">{p.h1}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
