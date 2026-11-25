import React from 'react';

const INK = '#1a1710';
const CREAM = '#f2efe8';
const ORANGE = '#e8622a';
const GOLD = '#f2b90d';
const WOOD = '#b98b5e';

function Arcs({ x, y, color = ORANGE }: { x: number; y: number; color?: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round">
      <path d={`M${x} ${y - 16} q14 16 0 32`} />
      <path d={`M${x + 18} ${y - 28} q24 28 0 56`} opacity=".7" />
      <path d={`M${x + 36} ${y - 40} q34 40 0 80`} opacity=".4" />
    </g>
  );
}

const art: Record<string, React.ReactNode> = {
  'voice-bouquet-frame': (
    <g>
      <rect x="230" y="90" width="340" height="260" rx="14" fill={WOOD} />
      <rect x="254" y="114" width="292" height="212" rx="6" fill="#fff" />
      <circle cx="400" cy="195" r="32" fill="#e8e2d6" />
      <rect x="360" y="235" width="80" height="60" rx="30" fill="#e8e2d6" />
      {[290, 345, 400, 455, 510].map((x, i) => (
        <circle key={x} cx={x} cy="372" r="14" fill={[ORANGE, GOLD, ORANGE, GOLD, ORANGE][i]} />
      ))}
      <Arcs x={585} y={372} />
    </g>
  ),
  'one-tap-bhajan-box': (
    <g>
      <rect x="230" y="210" width="340" height="150" rx="16" fill={WOOD} />
      <rect x="230" y="210" width="340" height="30" rx="16" fill="#9a6f46" />
      <g transform="rotate(-8 400 170)">
        <rect x="340" y="95" width="120" height="150" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M400 130 q22 28 0 56 q-22 -28 0 -56z" fill={ORANGE} />
        <rect x="360" y="195" width="80" height="8" rx="4" fill="#e8e2d6" />
      </g>
      <circle cx="400" cy="300" r="22" fill="#9a6f46" />
      <Arcs x={600} y={290} />
    </g>
  ),
  'family-voice-story-cards': (
    <g>
      {[[-14, 270, ORANGE], [0, 345, GOLD], [14, 420, '#fff']].map(([r, x, c], i) => (
        <g key={i} transform={`rotate(${r} ${Number(x) + 55} 230)`}>
          <rect x={x as number} y="110" width="110" height="160" rx="10" fill={c as string} stroke={INK} strokeWidth="3" />
          <circle cx={Number(x) + 55} cy="165" r="18" fill={INK} opacity=".85" />
          <rect x={Number(x) + 30} y="190" width="50" height="40" rx="20" fill={INK} opacity=".85" />
        </g>
      ))}
      <path d="M250 340 h40 l10 -24 l16 48 l16 -40 l10 16 h200" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  'birthday-time-capsule': (
    <g>
      <rect x="240" y="230" width="320" height="130" rx="14" fill={ORANGE} />
      <rect x="388" y="230" width="24" height="130" fill={GOLD} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`rotate(${-12 + i * 8} ${310 + i * 60} 230)`}>
          <rect x={285 + i * 60} y="130" width="64" height="110" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
          <text x={317 + i * 60} y="195" textAnchor="middle" fontSize="38" fontWeight="800" fill={INK}>{i + 1}</text>
        </g>
      ))}
    </g>
  ),
  'open-when-voice-letters': (
    <g>
      <rect x="250" y="150" width="300" height="190" rx="12" fill="#fff" stroke={INK} strokeWidth="3" transform="rotate(-6 400 245)" />
      <rect x="250" y="150" width="300" height="190" rx="12" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M250 160 L400 270 L550 160" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="400" cy="270" r="26" fill={ORANGE} />
      <path d="M400 281 l-11 -11 a7 7 0 0 1 11 -9 a7 7 0 0 1 11 9 z" fill="#fff" />
      <path d="M280 380 h40 l8 -20 l14 40 l14 -34 l8 14 h180" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  'tap-to-play-rakhi': (
    <g>
      <path d="M300 150 q100 -70 200 0" fill="none" stroke={GOLD} strokeWidth="8" strokeLinecap="round" />
      <path d="M300 150 q-40 130 100 190" fill="none" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />
      <path d="M500 150 q40 130 -100 190" fill="none" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />
      <circle cx="400" cy="265" r="50" fill={GOLD} stroke={INK} strokeWidth="3" />
      <circle cx="400" cy="265" r="26" fill={ORANGE} />
      <rect x="520" y="90" width="90" height="170" rx="16" fill="#fff" stroke={INK} strokeWidth="3" transform="rotate(14 565 175)" />
      <Arcs x={470} y={300} />
    </g>
  ),
  'heartbeat-keepsake-plaque': (
    <g>
      <rect x="220" y="110" width="360" height="240" rx="16" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M250 240 h70 l16 -60 l24 120 l22 -90 l14 30 h50 l16 -50 l24 100 l16 -50 h70" fill="none" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="320" y="305" width="160" height="10" rx="5" fill="#e8e2d6" />
      <rect x="350" y="325" width="100" height="8" rx="4" fill="#e8e2d6" />
    </g>
  ),
  'vinyl-photo-magnet-speaker': (
    <g>
      <rect x="260" y="100" width="280" height="280" rx="24" fill={INK} />
      <circle cx="400" cy="240" r="108" fill="#2c281f" />
      {[100, 84, 68, 52].map((r) => (
        <circle key={r} cx="400" cy="240" r={r} fill="none" stroke="#4a4436" strokeWidth="2" />
      ))}
      <circle cx="400" cy="240" r="34" fill={ORANGE} />
      <circle cx="400" cy="240" r="6" fill={CREAM} />
      <rect x="300" y="72" width="60" height="26" rx="8" fill={GOLD} />
    </g>
  ),
  'anime-style-light-frame': (
    <g>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="100%" stopColor="#ff9a3c" />
        </radialGradient>
      </defs>
      <rect x="210" y="80" width="380" height="290" rx="12" fill="#3a2f22" />
      <rect x="232" y="102" width="336" height="246" rx="4" fill="url(#glow)" />
      <path d="M232 300 L330 190 L400 260 L470 170 L568 300 V348 H232 Z" fill="#3a2f22" opacity=".8" />
      <circle cx="470" cy="150" r="24" fill="#fff" opacity=".9" />
    </g>
  ),
  'dual-name-illusion-plate': (
    <g>
      <rect x="230" y="280" width="340" height="60" rx="10" fill={INK} />
      <g transform="skewX(-14)">
        <text x="360" y="270" fontSize="130" fontWeight="900" fill={ORANGE}>A</text>
      </g>
      <g transform="skewX(14)">
        <text x="160" y="270" fontSize="130" fontWeight="900" fill={GOLD}>R</text>
      </g>
      <path d="M400 130 v-24 M360 140 l-14 -16 M440 140 l14 -16" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  'levitating-display-piece': (
    <g>
      <ellipse cx="400" cy="330" rx="130" ry="26" fill={INK} />
      <ellipse cx="400" cy="318" rx="90" ry="12" fill="#2c281f" />
      <path d="M340 250 q10 -42 60 -44 q50 2 66 44 z" fill={ORANGE} />
      <rect x="320" y="250" width="160" height="26" rx="12" fill={ORANGE} />
      <circle cx="355" cy="278" r="14" fill={INK} />
      <circle cx="445" cy="278" r="14" fill={INK} />
      <path d="M350 300 v12 M400 296 v16 M450 300 v12" stroke={GOLD} strokeWidth="4" strokeDasharray="4 6" strokeLinecap="round" />
    </g>
  ),
  'lithophane-photo-lamp': (
    <g>
      <defs>
        <radialGradient id="lith" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#fffbe6" />
          <stop offset="100%" stopColor="#ffd98a" />
        </radialGradient>
      </defs>
      <rect x="250" y="90" width="300" height="270" rx="12" fill={WOOD} />
      <rect x="272" y="112" width="256" height="226" rx="4" fill="url(#lith)" />
      <circle cx="365" cy="205" r="26" fill="#c7a15f" opacity=".7" />
      <rect x="338" y="236" width="54" height="60" rx="26" fill="#c7a15f" opacity=".7" />
      <circle cx="440" cy="215" r="22" fill="#c7a15f" opacity=".55" />
      <rect x="418" y="242" width="44" height="54" rx="22" fill="#c7a15f" opacity=".55" />
    </g>
  ),
};

export default function IdeaArt({ slug, name }: { slug: string; name: string }) {
  return (
    <figure className="m-0 mb-5">
      <svg
        viewBox="0 0 800 460"
        role="img"
        aria-label={`Concept illustration: ${name}`}
        className="w-full h-auto rounded-xl"
        style={{ background: CREAM }}
      >
        {art[slug] ?? null}
      </svg>
      <figcaption className="mt-2 text-[11px] text-[#a09880]">Concept illustration, not a photo of the finished product</figcaption>
    </figure>
  );
}
