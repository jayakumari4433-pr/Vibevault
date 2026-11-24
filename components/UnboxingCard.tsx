import { ProductMedia } from "./art/ProductMedia";
import { products } from "@/lib/products";
import { vibeMap } from "@/lib/vibes";
import { Icon } from "./icons";
import type { Unboxing } from "@/lib/types";

// Cycle through the real product photos so the gallery feels like genuine posts.
const shots = products.filter((p) => p.image);

export function UnboxingCard({ u, i = 0 }: { u: Unboxing; i?: number }) {
  const v = vibeMap[u.vibe];
  const shot = shots[i % shots.length] ?? products[0];
  return (
    <figure data-vibe={u.vibe} className="card overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative aspect-square border-b border-line">
        <ProductMedia type={shot.type} image={shot.image} alt={u.caption} />
        <span className="absolute left-3 top-3 chip backdrop-blur">{v.emoji} {v.name}</span>
      </div>
      <figcaption className="p-3.5">
        <p className="font-display text-sm font-bold text-ink">{u.caption}</p>
        <div className="mt-1.5 flex items-center justify-between text-xs text-stone">
          <span>@{u.name.toLowerCase()} · {u.city}</span>
          <Icon.heart width={13} height={13} className="text-clay" />
        </div>
      </figcaption>
    </figure>
  );
}
