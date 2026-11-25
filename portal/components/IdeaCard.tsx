import React, { useEffect, useState } from 'react';
import type { Idea } from '@/data/ideas';

const API = 'https://ngd3e14290.execute-api.ap-south-1.amazonaws.com';

function fingerprint(): string {
  try {
    let id = localStorage.getItem('ui_fp');
    if (!id) {
      id = (crypto.randomUUID?.() ?? String(Math.random()).slice(2) + Date.now()).replace(/-/g, '');
      localStorage.setItem('ui_fp', id);
    }
    return id;
  } catch {
    return 'anonymous-' + Math.random().toString(36).slice(2, 12);
  }
}

export default function IdeaCard({ idea }: { idea: Idea }) {
  const key = `gift-${idea.slug}`;
  const [count, setCount] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try { setVoted(localStorage.getItem(`ui_voted_${key}`) === '1'); } catch {}
    fetch(`${API}/counts`)
      .then((r) => r.json())
      .then((d) => {
        const c = (d.counts ?? []).find((x: { slug: string }) => x.slug === key);
        setCount(c ? Number(c.up) : 0);
      })
      .catch(() => {});
  }, [key]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const direction = voted ? 0 : 1;
    try {
      const res = await fetch(`${API}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: key, direction, fingerprint: fingerprint() }),
      });
      if (res.ok) {
        const d = await res.json();
        setVoted(direction === 1);
        try { localStorage.setItem(`ui_voted_${key}`, direction === 1 ? '1' : '0'); } catch {}
        if (typeof d.up === 'number') setCount(d.up);
      }
    } catch {}
    setBusy(false);
  }

  return (
    <article
      className="rounded-2xl bg-white border border-[#e8e2d6] p-8 flex flex-col"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)' }}
    >
      <span className="self-start mb-3 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-[#fff5f0] text-[#7a2e0e]">
        Concept · not on sale yet
      </span>
      <h3 className="text-2xl font-extrabold text-[#1a1710] leading-tight mb-1">{idea.name}</h3>
      <p className="text-[#e8622a] font-semibold text-sm mb-4">{idea.tagline}</p>
      <p className="text-[#5a5648] leading-relaxed text-sm mb-4">{idea.description}</p>
      <dl className="text-sm text-[#5a5648] space-y-2 mb-6">
        <div><dt className="inline font-bold text-[#1a1710]">Best for: </dt><dd className="inline">{idea.forWho}</dd></div>
        <div><dt className="inline font-bold text-[#1a1710]">How it works: </dt><dd className="inline">{idea.howItWorks}</dd></div>
        <div><dt className="inline font-bold text-[#1a1710]">Our angle: </dt><dd className="inline">{idea.whyDifferent}</dd></div>
      </dl>
      <div className="mt-auto flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          disabled={busy}
          aria-pressed={voted}
          className={[
            'px-5 py-2.5 rounded-full text-sm font-bold border transition-all',
            voted ? 'bg-[#e8622a] text-white border-[#e8622a]' : 'bg-white text-[#1a1710] border-[#1a1710] hover:bg-[#1a1710] hover:text-white',
          ].join(' ')}
        >
          {voted ? '✓ You\'d buy this' : 'I\'d buy this'}
        </button>
        {count !== null && count > 0 && (
          <span className="text-xs text-[#a09880]">{count} {count === 1 ? 'person wants' : 'people want'} this</span>
        )}
      </div>
    </article>
  );
}
