import React from 'react';
import { categories } from '@/data/products';

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function FilterBar({ active, onChange }: Props) {
  return (
    <div className="sticky top-[65px] z-40 bg-[#fafaf8]/90 backdrop-blur-sm border-b border-[#e8e2d6] px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={[
              'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              active === cat.id
                ? 'bg-[#1a1710] text-white'
                : 'bg-white border border-[#e8e2d6] text-[#5a5648] hover:border-[#1a1710] hover:text-[#1a1710]',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
