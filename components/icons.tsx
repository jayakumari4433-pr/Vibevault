import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icon = {
  cart: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.2l2 12.3a1.6 1.6 0 0 0 1.6 1.4h8.9a1.6 1.6 0 0 0 1.6-1.3L21 7H5.1" />
    </svg>
  ),
  arrow: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  refresh: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M21 12a9 9 0 1 1-2.6-6.4" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
  truck: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
  wallet: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" />
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6H6a2 2 0 0 1 0-4" />
      <circle cx="17" cy="14" r="1" />
    </svg>
  ),
  star: (p: IconProps) => (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="m12 2 2.9 6 6.6.6-5 4.3 1.5 6.5L12 16l-5.9 3.4L7.6 13l-5-4.3 6.6-.6L12 2Z" />
    </svg>
  ),
  heart: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 21s-7.5-4.6-10-9.2C.3 8.3 2 4.8 5.5 4.8c2 0 3.3 1.1 4.5 2.6 1.2-1.5 2.5-2.6 4.5-2.6 3.5 0 5.2 3.5 3.5 7C19.5 16.4 12 21 12 21Z" />
    </svg>
  ),
  sparkle: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M5 12H3M21 12h-2M6.3 6.3 7.7 7.7M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
    </svg>
  ),
  box: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </svg>
  ),
  whatsapp: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 21l1.6-4.3A8 8 0 1 1 12 20a8 8 0 0 1-4.1-1.1L3 21Z" />
      <path d="M9 9.5c0 2.5 3 5.5 5.5 5.5.8 0 1.5-.8 1.5-1.2 0-.2-1.2-1-1.6-1s-.8.7-1.1.7c-.6 0-2.5-1.9-2.5-2.5 0-.3.7-.7.7-1.1s-.8-1.6-1-1.6S9 8.7 9 9.5Z" />
    </svg>
  ),
  instagram: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  trash: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M10 7V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    </svg>
  ),
  lock: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  chart: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
  tag: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 3h8l10 10-8 8L3 11V3Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" />
    </svg>
  ),
  users: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.2 3.2 0 0 1 0 7M21 20a6 6 0 0 0-4-5.6" />
    </svg>
  ),
  settings: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
    </svg>
  ),
  clipboard: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 10h6M9 14h6" />
    </svg>
  ),
  layers: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 18l9 5 9-5" />
    </svg>
  ),
  dashboard: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  image: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m21 16-5-5L5 20" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
