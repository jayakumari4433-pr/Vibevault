export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="VibeVault logo"
    >
      <defs>
        <linearGradient id="vv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C17A54" />
          <stop offset="1" stopColor="#C6A24B" />
        </linearGradient>
      </defs>
      <rect
        x="5"
        y="6"
        width="38"
        height="36"
        rx="11"
        fill="none"
        stroke="url(#vv-grad)"
        strokeWidth="2.5"
      />
      <g transform="translate(24 23)">
        <path
          d="M0 -8 L7 -2 L4.5 7 L-4.5 7 L-7 -2 Z"
          fill="url(#vv-grad)"
          stroke="url(#vv-grad)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M-7 -2 L7 -2 M0 -8 L0 7 M-7 -2 L0 7 L7 -2"
          stroke="#fbf7ef"
          strokeWidth="0.9"
          fill="none"
          opacity="0.6"
        />
      </g>
      <rect x="22.5" y="29" width="3" height="7" rx="1.5" fill="url(#vv-grad)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Vibe<span className="text-gradient">Vault</span>
      </span>
    </span>
  );
}
