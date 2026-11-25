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
  'mini-retro-tv': (
    <g>
      <path d="M360 120 L330 70 M440 120 L470 70" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <rect x="220" y="120" width="360" height="250" rx="26" fill={WOOD} />
      <rect x="244" y="144" width="240" height="202" rx="16" fill={INK} />
      <rect x="258" y="158" width="212" height="174" rx="10" fill="#26323a" />
      {[ORANGE, GOLD, '#7cc6a4', '#6aa8e8', '#c987e0', '#fff'].map((c, i) => (
        <rect key={i} x={266 + i * 34} y="166" width="34" height="90" fill={c} opacity=".9" />
      ))}
      <rect x="266" y="266" width="196" height="12" rx="6" fill="#fff" opacity=".25" />
      <rect x="266" y="288" width="120" height="12" rx="6" fill="#fff" opacity=".18" />
      <circle cx="534" cy="196" r="26" fill={INK} />
      <path d="M534 196 L534 176" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
      <circle cx="534" cy="278" r="18" fill={INK} />
      <path d="M534 278 L546 270" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
      <rect x="260" y="370" width="30" height="16" rx="6" fill={INK} />
      <rect x="510" y="370" width="30" height="16" rx="6" fill={INK} />
    </g>
  ),
  'pixel-art-desk-clock': (
    <g>
      <rect x="190" y="130" width="420" height="220" rx="18" fill={INK} />
      <rect x="214" y="154" width="372" height="172" rx="8" fill="#0e0c08" />
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 20 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={230 + c * 17.6} cy={170 + r * 18} r="5" fill="#1d1a12" />
        ))
      )}
      {[[3,3],[3,4],[4,3],[4,4],[5,3],[5,4],[3,6],[4,6],[5,6],[3,7],[5,7],[3,9],[3,10],[4,9],[4,10],[5,9],[5,10],[3,12],[4,12],[5,12],[3,13],[5,13]].map(([r, c], i) => (
        <circle key={i} cx={230 + (c + 2) * 17.6} cy={170 + r * 18} r="6.5" fill={i % 3 === 0 ? ORANGE : GOLD} />
      ))}
      <rect x="360" y="352" width="80" height="12" rx="6" fill="#2c281f" />
    </g>
  ),
  'mini-desk-weather-station': (
    <g>
      <rect x="240" y="100" width="320" height="260" rx="22" fill={WOOD} />
      <rect x="262" y="122" width="276" height="150" rx="10" fill="#26323a" />
      <circle cx="320" cy="170" r="24" fill={GOLD} />
      <path d="M300 214 h60 a18 18 0 0 0 0 -36 a26 26 0 0 0 -50 8 a14 14 0 0 0 -10 28z" fill="#fff" opacity=".9" />
      <text x="470" y="190" textAnchor="middle" fontSize="50" fontWeight="800" fill="#fff">26°</text>
      <text x="470" y="238" textAnchor="middle" fontSize="22" fill="#9fb3bd">58% RH</text>
      <rect x="290" y="300" width="220" height="12" rx="6" fill={INK} opacity=".35" />
      <rect x="290" y="324" width="140" height="10" rx="5" fill={INK} opacity=".25" />
    </g>
  ),
  'led-pixel-sand-clock': (
    <g>
      <rect x="270" y="80" width="260" height="300" rx="22" fill={INK} />
      <rect x="292" y="102" width="216" height="256" rx="8" fill="#0e0c08" />
      {Array.from({ length: 14 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => {
          const lit = r >= 9 + Math.abs(c - 5.5) * 0.35 || (r < 3 && c >= 4 && c <= 7 && r + Math.abs(c - 5.5) * 0.4 < 3.2);
          const fall = c === 6 && r >= 4 && r <= 8;
          return (
            <circle
              key={`${r}-${c}`}
              cx={306 + c * 17.4}
              cy={116 + r * 17.4}
              r="5.6"
              fill={lit || fall ? (r < 6 ? GOLD : ORANGE) : '#1d1a12'}
              opacity={lit || fall ? 1 : 0.9}
            />
          );
        })
      )}
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
