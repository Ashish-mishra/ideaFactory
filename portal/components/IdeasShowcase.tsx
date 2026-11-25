import React from 'react';
import { ideas } from '@/data/ideas';
import IdeaCard from '@/components/IdeaCard';

export default function IdeasShowcase() {
  return (
    <section id="coming-next" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-widest text-[#a09880] mb-3">Coming next</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a1710] leading-tight">Gifts we're building next</h2>
        <p className="mt-4 text-[#5a5648] max-w-xl mx-auto">
          Concepts we couldn't find sold anywhere in India. Tell us which ones you'd actually buy and we'll build those first.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.slug} idea={idea} />
        ))}
      </div>
    </section>
  );
}
