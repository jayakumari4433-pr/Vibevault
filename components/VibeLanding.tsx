import Link from "next/link";
import type { Product, Review, Unboxing, Vibe } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ReviewCard } from "./ReviewCard";
import { Icon } from "./icons";

export function VibeLanding({
  vibe,
  products,
  reviews,
  unboxings,
}: {
  vibe: Vibe;
  products: Product[];
  reviews: Review[];
  unboxings: Unboxing[];
}) {
  const isGirls = vibe.slug === "girls";

  return (
    <div data-vibe={vibe.slug} className={isGirls ? "soft-girl" : ""}>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[var(--vibe-tint)] blur-[120px]" />
        </div>
        <div className="vv-container py-20 text-center md:py-24">
          <span className="text-6xl">{vibe.emoji}</span>
          <span className="chip chip-accent mx-auto mt-5 block w-fit">
            the {vibe.name} vibe
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-bold leading-[1.05] text-ink sm:text-6xl">
            {vibe.quote}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-stone">{vibe.blurb}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#boxes" className="btn btn-accent h-12 px-7 text-base">
              Shop {vibe.name} boxes <Icon.arrow width={18} height={18} />
            </Link>
            <Link href="/quiz" className="btn btn-ghost h-12 px-7 text-base">
              Find your vibe
            </Link>
          </div>
        </div>
      </section>

      {/* BOXES */}
      <section id="boxes" className="vv-container scroll-mt-20 py-14">
        <div className="text-center">
          <span className="eyebrow">the boxes</span>
          <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
            Made to feel {vibe.name.toLowerCase()}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-stone">
            Any box, packed to this vibe. Add a colour and a note to make it
            yours.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} vibe={vibe.slug} />
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <section className="border-y border-line surface-cream">
          <div className="vv-container py-14">
            <h2 className="text-center text-3xl font-bold text-ink">
              {vibe.name} customers love it
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* UNBOXINGS */}
      {unboxings.length > 0 && (
        <section className="vv-container py-14">
          <h2 className="text-center text-3xl font-bold text-ink">
            {vibe.name} unboxings
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {unboxings.map((u) => (
              <div key={u.id} className="card tint relative aspect-[3/4] overflow-hidden p-4">
                <div className="flex h-full flex-col justify-between">
                  <span className="text-2xl">{vibe.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{u.caption}</p>
                    <p className="mt-1 text-xs text-stone">{u.name}, {u.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="vv-container pb-20">
        <div className="card tint p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            Ready for your {vibe.name} surprise?
          </h2>
          <Link href="#boxes" className="btn btn-accent mt-6 h-12 px-8 text-base">
            Shop now <Icon.arrow width={18} height={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
