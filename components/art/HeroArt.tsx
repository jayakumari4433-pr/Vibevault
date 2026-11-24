const GOLD = "#C6A24B";
const GOLD_D = "#A9833A";
const INK = "#2A2521";

/** A composed hero scene: an open surprise box with jewellery lifting out. */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 420"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="An open Clue & Charm box with jewellery and sparkles"
    >
      <defs>
        <linearGradient id="h-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9CE86" />
          <stop offset="0.5" stopColor={GOLD} />
          <stop offset="1" stopColor={GOLD_D} />
        </linearGradient>
        <radialGradient id="h-gem" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="var(--accent, #c17a54)" />
          <stop offset="1" stopColor="var(--accent, #c17a54)" />
        </radialGradient>
        <linearGradient id="h-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#f3ece0" />
        </linearGradient>
        <radialGradient id="h-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--accent, #c17a54)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--accent, #c17a54)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* glow */}
      <circle cx="220" cy="200" r="170" fill="url(#h-glow)" />

      {/* floating ring */}
      <g transform="rotate(-12 150 120)">
        <ellipse cx="150" cy="120" rx="40" ry="48" fill="none" stroke="url(#h-metal)" strokeWidth="10" />
        <g transform="translate(150 66)">
          <path d="M0 -15 L14 -4 L9 14 L-9 14 L-14 -4 Z" fill="url(#h-gem)" stroke={GOLD} strokeWidth="2" strokeLinejoin="round" />
        </g>
      </g>

      {/* floating pendant */}
      <g transform="translate(300 96)">
        <path d="M-40 -18 Q0 36 40 -18" fill="none" stroke="url(#h-metal)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="0" cy="24" r="7" fill="none" stroke="url(#h-metal)" strokeWidth="4" />
        <path d="M0 34 C18 52 18 74 0 92 C-18 74 -18 52 0 34 Z" fill="url(#h-gem)" stroke={GOLD} strokeWidth="2" />
      </g>

      {/* sparkles */}
      {[
        [90, 70, 9],
        [360, 170, 11],
        [250, 40, 7],
        [120, 230, 7],
        [380, 300, 8],
        [70, 300, 6],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x} ${y - s} C${x + s * 0.2} ${y - s * 0.2}, ${x + s * 0.2} ${y - s * 0.2}, ${x + s} ${y} C${x + s * 0.2} ${y + s * 0.2}, ${x + s * 0.2} ${y + s * 0.2}, ${x} ${y + s} C${x - s * 0.2} ${y + s * 0.2}, ${x - s * 0.2} ${y + s * 0.2}, ${x - s} ${y} C${x - s * 0.2} ${y - s * 0.2}, ${x - s * 0.2} ${y - s * 0.2}, ${x} ${y - s} Z`}
          fill={i % 2 ? "var(--accent, #c17a54)" : GOLD}
          opacity="0.9"
        />
      ))}

      {/* box base */}
      <g>
        <ellipse cx="220" cy="366" rx="130" ry="18" fill={INK} opacity="0.07" />
        <path d="M110 250 L330 250 L312 360 Q312 368 304 368 L136 368 Q128 368 128 360 Z" fill="url(#h-box)" stroke="url(#h-metal)" strokeWidth="5" strokeLinejoin="round" />
        {/* inner shadow */}
        <path d="M110 250 L330 250 L322 278 L118 278 Z" fill="var(--accent, #c17a54)" opacity="0.14" />
        {/* lid, tilted open */}
        <g transform="rotate(-16 120 250)">
          <rect x="96" y="218" width="248" height="42" rx="12" fill="#fff" stroke="url(#h-metal)" strokeWidth="5" />
          <rect x="208" y="218" width="24" height="42" fill="var(--accent, #c17a54)" opacity="0.2" />
        </g>
        {/* ribbon down the box */}
        <rect x="208" y="250" width="24" height="118" fill="var(--accent, #c17a54)" opacity="0.2" />
      </g>
    </svg>
  );
}
