import Link from "next/link";
import type { Product, VibeSlug } from "@/lib/types";
import { inr } from "@/lib/format";
import { Icon } from "./icons";

const TYPE_EMOJI: Record<string, string> = {
  ring: "💫",
  pendant: "🫧",
  jewellery: "🎀",
  customize: "🎁",
};

export function ProductCard({
  product,
  vibe,
}: {
  product: Product;
  vibe?: VibeSlug;
}) {
  const isCustom = product.type === "customize";
  const href = isCustom
    ? "/customize"
    : `/box/${product.id}${vibe ? `?vibe=${vibe}` : ""}`;

  return (
    <div
      className={`card group relative flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
        isCustom ? "tint" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl" aria-hidden>
          {TYPE_EMOJI[product.type]}
        </span>
        <span className="chip">{product.kicker}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-ink">{product.name}</h3>
      <p className="mt-1.5 flex-1 text-sm text-stone">{product.tagline}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {product.feelings.map((f) => (
          <span
            key={f}
            className="rounded-full bg-cream px-2.5 py-1 text-xs text-stone"
          >
            {f}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="text-xs text-mute">
            {isCustom ? "from" : ""}
          </span>
          <div className="text-2xl font-bold text-ink">{inr(product.price)}</div>
        </div>
        <Link
          href={href}
          className="btn btn-primary h-10 px-4 text-sm"
          aria-label={`Open ${product.name}`}
        >
          {isCustom ? "Make it yours" : "Open it"}
          <Icon.arrow width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}
