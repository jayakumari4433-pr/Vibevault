import type { Review } from "@/lib/types";
import { vibeMap } from "@/lib/vibes";
import { Icon } from "./icons";

export function ReviewCard({ review }: { review: Review }) {
  const vibe = vibeMap[review.vibe];
  return (
    <figure className="card flex h-full flex-col p-6">
      <div className="flex items-center gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon.star
            key={i}
            width={16}
            height={16}
            className={i < review.rating ? "text-gold" : "text-line"}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-ink">{review.name}</div>
          <div className="text-xs text-mute">
            {review.city} · {vibe.emoji} {vibe.name}
          </div>
        </div>
        {review.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-sage-deep">
            <Icon.check width={12} height={12} /> Verified
          </span>
        )}
      </figcaption>
    </figure>
  );
}
