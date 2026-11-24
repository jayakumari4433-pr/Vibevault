import { unboxings } from "@/lib/content";
import { vibeMap } from "@/lib/vibes";

const RARITY = ["Common", "Rare", "Epic", "Legendary", "Rare", "Common", "Epic", "Legendary"];
const RC: Record<string, string> = {
  Common: "var(--color-common)", Rare: "var(--color-rare)", Epic: "var(--color-epic)", Legendary: "var(--color-legend)",
};

/** Scrolling "someone just opened…" social-proof ticker. */
export function RecentPulls() {
  const row = [...unboxings, ...unboxings];
  return (
    <div className="relative overflow-hidden border-y border-line bg-cream py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />
      <div className="flex w-max animate-[marquee_34s_linear_infinite] gap-4 whitespace-nowrap">
        {row.map((u, i) => {
          const r = RARITY[i % RARITY.length];
          const v = vibeMap[u.vibe];
          return (
            <span key={i} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full" style={{ background: RC[r], boxShadow: `0 0 8px ${RC[r]}` }} />
              <span className="font-semibold text-ink">{u.name}, {u.city}</span>
              <span className="text-mute">just pulled a</span>
              <span className="font-display text-xs font-bold uppercase tracking-wider" style={{ color: RC[r] }}>{r}</span>
              <span>{v.emoji}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
