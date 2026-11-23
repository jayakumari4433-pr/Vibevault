import Link from "next/link";
import type { Vibe } from "@/lib/types";

export function VibeTile({ vibe }: { vibe: Vibe }) {
  return (
    <Link
      href={`/vibe/${vibe.slug}`}
      data-vibe={vibe.slug}
      className="group card tint relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl" aria-hidden>
          {vibe.emoji}
        </span>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink">{vibe.name}</h3>
      <p className="mt-1 text-sm text-stone">{vibe.tagline}</p>
      <p className="mt-3 text-sm font-medium" style={{ color: "var(--accent)" }}>
        {vibe.quote}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ink">
        Shop this vibe
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
