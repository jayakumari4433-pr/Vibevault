import { genzQuotes } from "@/lib/content";

export function QuoteMarquee() {
  const row = [...genzQuotes, ...genzQuotes];
  return (
    <div className="relative overflow-hidden border-y border-line surface-cream py-4">
      <div className="flex w-max animate-[marquee_26s_linear_infinite] gap-8 whitespace-nowrap">
        {row.map((q, i) => (
          <span
            key={i}
            className="font-display text-lg font-semibold text-ink/80"
          >
            {q}
            <span className="ml-8 text-clay">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
