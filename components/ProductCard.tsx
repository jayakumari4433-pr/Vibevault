import Link from "next/link";
import type { Product, VibeSlug } from "@/lib/types";
import { inr } from "@/lib/format";
import { Icon } from "./icons";
import { ProductMedia } from "./art/ProductMedia";

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
      data-vibe={vibe}
      className="card group relative flex flex-col overflow-hidden lift"
    >
      {/* Image banner, hidden behind a mystery veil until hover */}
      <Link href={href} className="mystery relative block aspect-[5/4] border-b border-line">
        <div className="mystery-media h-full w-full">
          <ProductMedia type={product.type} image={product.image} alt={product.name} />
        </div>

        {/* the surprise veil */}
        <div className="mystery-veil" data-vibe={vibe}>
          <span className="q">?</span>
          <span className="hint">tap to reveal</span>
        </div>

        <span className="absolute left-3 top-3 z-10 chip chip-accent backdrop-blur">{product.kicker}</span>
        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-paper/90 px-3 py-1 text-sm font-bold text-ink shadow-sm backdrop-blur">
          {isCustom ? `from ${inr(product.price)}` : inr(product.price)}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-ink">{product.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-stone">{product.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.feelings.map((f) => (
            <span key={f} className="rounded-full bg-cream px-2.5 py-1 text-xs text-stone">{f}</span>
          ))}
        </div>

        <Link href={href} className="btn btn-primary mt-5 h-11 w-full text-sm">
          {isCustom ? "Make it yours" : "Open it"}
          <Icon.arrow width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
