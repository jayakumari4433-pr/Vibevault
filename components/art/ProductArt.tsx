import type { BoxType } from "@/lib/types";

/**
 * On-brand SVG jewellery illustrations used as product imagery.
 * Metal tones are warm gold/clay; the gem picks up the vibe accent
 * (var(--accent)), so the same art recolours per vibe. Self-contained,
 * crisp at any size, theme-aware.
 */

const GOLD = "#C6A24B";
const GOLD_D = "#A9833A";
const INK = "#2A2521";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#E9CE86" />
        <stop offset="0.5" stopColor={GOLD} />
        <stop offset="1" stopColor={GOLD_D} />
      </linearGradient>
      <radialGradient id={`${id}-gem`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="0.35" stopColor="var(--accent)" />
        <stop offset="1" stopColor="var(--accent)" />
      </radialGradient>
      <radialGradient id={`${id}-bg`} cx="0.5" cy="0.4" r="0.75">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="color-mix(in srgb, var(--accent) 16%, #fbf7ef)" />
      </radialGradient>
    </defs>
  );
}

function Sparkle({ x, y, s = 6, c = GOLD }: { x: number; y: number; s?: number; c?: string }) {
  return (
    <path
      d={`M${x} ${y - s} C${x + s * 0.2} ${y - s * 0.2}, ${x + s * 0.2} ${y - s * 0.2}, ${x + s} ${y} C${x + s * 0.2} ${y + s * 0.2}, ${x + s * 0.2} ${y + s * 0.2}, ${x} ${y + s} C${x - s * 0.2} ${y + s * 0.2}, ${x - s * 0.2} ${y + s * 0.2}, ${x - s} ${y} C${x - s * 0.2} ${y - s * 0.2}, ${x - s * 0.2} ${y - s * 0.2}, ${x} ${y - s} Z`}
      fill={c}
      opacity="0.9"
    />
  );
}

function Ring({ id }: { id: string }) {
  return (
    <g>
      <ellipse cx="160" cy="150" rx="62" ry="72" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="13" />
      <ellipse cx="160" cy="150" rx="62" ry="72" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
      {/* gem */}
      <g transform="translate(160 66)">
        <path d="M0 -22 L20 -6 L13 20 L-13 20 L-20 -6 Z" fill={`url(#${id}-gem)`} stroke={GOLD} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M-20 -6 L20 -6 M0 -22 L0 20 M-20 -6 L0 20 L20 -6 M0 -22 L-20 -6 M0 -22 L20 -6" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
      </g>
      <Sparkle x={236} y={92} s={7} />
      <Sparkle x={92} y={120} s={5} />
      <Sparkle x={210} y={214} s={5} />
    </g>
  );
}

function Pendant({ id }: { id: string }) {
  return (
    <g>
      <path d="M44 56 Q160 150 276 56" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="5" strokeLinecap="round" />
      <path d="M44 56 Q160 150 276 56" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.6" />
      {/* bail */}
      <circle cx="160" cy="138" r="9" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="5" />
      {/* teardrop gem */}
      <g transform="translate(160 196)">
        <path d="M0 -34 C22 -14 22 10 0 34 C-22 10 -22 -14 0 -34 Z" fill={`url(#${id}-gem)`} stroke={GOLD} strokeWidth="2.5" />
        <path d="M0 -34 L0 34 M-16 2 L16 2" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
        <circle cx="-7" cy="-10" r="4" fill="#fff" opacity="0.6" />
      </g>
      <Sparkle x={236} y={150} s={6} />
      <Sparkle x={86} y={150} s={5} />
    </g>
  );
}

function JewelleryMix({ id }: { id: string }) {
  return (
    <g>
      {/* hoop earring left */}
      <circle cx="96" cy="140" r="34" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="9" />
      <circle cx="96" cy="106" r="4" fill={GOLD} />
      {/* small ring right */}
      <ellipse cx="236" cy="168" rx="34" ry="40" fill="none" stroke={`url(#${id}-metal)`} strokeWidth="9" />
      <g transform="translate(236 128)">
        <path d="M0 -13 L11 -3 L7 12 L-7 12 L-11 -3 Z" fill={`url(#${id}-gem)`} stroke={GOLD} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      {/* center stud gem */}
      <g transform="translate(166 92)">
        <path d="M0 -16 L15 -4 L10 15 L-10 15 L-15 -4 Z" fill={`url(#${id}-gem)`} stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
        <path d="M-15 -4 L15 -4 M0 -16 L0 15" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" />
      </g>
      <Sparkle x={200} y={210} s={6} />
      <Sparkle x={60} y={200} s={5} />
      <Sparkle x={262} y={76} s={5} />
    </g>
  );
}

function Gift({ id }: { id: string }) {
  return (
    <g>
      {/* box */}
      <rect x="96" y="128" width="128" height="94" rx="10" fill={`url(#${id}-bg)`} stroke={`url(#${id}-metal)`} strokeWidth="5" />
      <rect x="86" y="108" width="148" height="34" rx="9" fill="#fff" stroke={`url(#${id}-metal)`} strokeWidth="5" />
      <rect x="150" y="108" width="20" height="114" fill="var(--accent)" opacity="0.25" />
      {/* bow */}
      <g transform="translate(160 104)">
        <circle r="8" fill={`url(#${id}-metal)`} />
        <path d="M0 0 C-30 -22 -52 -8 -40 8 C-30 20 -8 14 0 0 Z" fill="var(--accent)" opacity="0.85" />
        <path d="M0 0 C30 -22 52 -8 40 8 C30 20 8 14 0 0 Z" fill="var(--accent)" opacity="0.85" />
      </g>
      <Sparkle x={236} y={92} s={7} />
      <Sparkle x={80} y={120} s={5} />
      <Sparkle x={210} y={210} s={5} />
    </g>
  );
}

export function ProductArt({
  type,
  className = "",
}: {
  type: BoxType;
  className?: string;
}) {
  const id = `pa-${type}`;
  return (
    <svg
      viewBox="0 0 320 260"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`${type} illustration`}
    >
      <Defs id={id} />
      <rect x="0" y="0" width="320" height="260" fill={`url(#${id}-bg)`} />
      {type === "ring" && <Ring id={id} />}
      {type === "pendant" && <Pendant id={id} />}
      {type === "jewellery" && <JewelleryMix id={id} />}
      {type === "customize" && <Gift id={id} />}
      <ellipse cx="160" cy="238" rx="80" ry="10" fill={INK} opacity="0.06" />
    </svg>
  );
}
