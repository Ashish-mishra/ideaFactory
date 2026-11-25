import React, { useEffect, useState } from 'react';
import type { Idea } from '@/data/ideas';
import IdeaArt from '@/components/IdeaArt';

const API = 'https://ngd3e14290.execute-api.ap-south-1.amazonaws.com';
// Set NEXT_PUBLIC_INTEREST_API at build time to the InterestApiUrl stack output to enable the notify-me form.
const INTEREST_API = process.env.NEXT_PUBLIC_INTEREST_API ?? '';

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
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [formError, setFormError] = useState('');

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
        if (direction === 1 && INTEREST_API && formState !== 'done') setShowForm(true);
        if (direction === 0) setShowForm(false);
        try { localStorage.setItem(`ui_voted_${key}`, direction === 1 ? '1' : '0'); } catch {}
        if (typeof d.up === 'number') setCount(d.up);
      }
    } catch {}
    setBusy(false);
  }

  async function submitInterest(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) { setFormError('Please tick the box to agree.'); setFormState('error'); return; }
    setFormState('sending'); setFormError('');
    try {
      const res = await fetch(`${INTEREST_API}/interest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: key, name: idea.name, phone, consent: true }),
      });
      if (res.ok) { setFormState('done'); return; }
      const d = await res.json().catch(() => ({}));
      setFormError(d.error ?? 'Something went wrong. Please try again.');
      setFormState('error');
    } catch {
      setFormError('Could not send. Please check your connection and try again.');
      setFormState('error');
    }
  }

  return (
    <article
      className="rounded-2xl bg-white border border-[#e8e2d6] p-8 flex flex-col"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)' }}
    >
      <IdeaArt slug={idea.slug} name={idea.name} />
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
      {showForm && (
        <div className="mt-5 rounded-xl bg-[#f2efe8] p-4 text-sm">
          {formState === 'done' ? (
            <p className="text-[#1a1710] font-semibold">Thanks! We'll message you on WhatsApp when this is ready.</p>
          ) : (
            <form onSubmit={submitInterest} className="space-y-3">
              <label className="block font-semibold text-[#1a1710]" htmlFor={`wa-${idea.slug}`}>
                Want a WhatsApp message when this is ready?
              </label>
              <input
                id={`wa-${idea.slug}`}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-lg border border-[#e8e2d6] bg-white px-3 py-2"
              />
              <label className="flex items-start gap-2 text-xs text-[#5a5648]">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
                <span>I agree to be contacted on WhatsApp about this product. We use your number only for that, and you can reply STOP any time.</span>
              </label>
              {formState === 'error' && <p className="text-xs text-[#c44d1c]">{formError}</p>}
              <div className="flex items-center gap-3">
                <button type="submit" disabled={formState === 'sending'} className="px-4 py-2 rounded-full bg-[#1a1710] text-white font-bold">
                  {formState === 'sending' ? 'Sending…' : 'Notify me'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="text-xs text-[#a09880] underline">No thanks</button>
              </div>
            </form>
          )}
        </div>
      )}
    </article>
  );
}
