export function LogoMark({ className = "h-10 w-14" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-mark.png"
      alt="Clue & Charm"
      className={`${className} object-contain`}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-10 w-14" />
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Clue &amp; <span className="text-gradient">Charm</span>
      </span>
    </span>
  );
}
