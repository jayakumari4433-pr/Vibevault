import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct, shopProducts } from "@/lib/products";
import { reviews, honestPromise } from "@/lib/content";
import { inr } from "@/lib/format";
import { Icon } from "@/components/icons";
import { ConfigureBox } from "@/components/ConfigureBox";
import { ReviewCard } from "@/components/ReviewCard";
import { ProductMedia } from "@/components/art/ProductMedia";

export function generateStaticParams() {
  return products.filter((p) => p.type !== "customize").map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Not found" };
  return { title: `${product.name} · ${inr(product.price)}`, description: product.tagline };
}

const VIBE_SLUGS = ["girls", "boys", "women", "men", "gamer", "car"] as const;

export default async function BoxDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ vibe?: string }>;
}) {
  const { id } = await params;
  const { vibe: vibeParam } = await searchParams;
  const initialVibe = VIBE_SLUGS.find((v) => v === vibeParam) ?? null;
  const product = getProduct(id);
  if (!product || product.type === "customize") notFound();

  const others = shopProducts.filter((p) => p.id !== product.id);
  const someReviews = reviews.slice(0, 3);

  return (
    <div className="vv-container py-10">
      <nav className="flex items-center gap-2 text-sm text-mute">
        <Link href="/boxes" className="hover:text-ink">Boxes</Link>
        <span>/</span>
        <span className="text-stone">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Visual + feeling */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div data-vibe={initialVibe ?? undefined} className="mystery card tint relative aspect-square overflow-hidden">
            <div className="mystery-media h-full w-full">
              <ProductMedia type={product.type} image={product.image} alt={product.name} />
            </div>
            <div className="mystery-veil">
              <span className="q">?</span>
              <span className="hint">hover to reveal</span>
            </div>
            <span className="absolute left-4 top-4 z-10 chip chip-accent">{product.kicker}</span>
            <span className="absolute bottom-4 right-4 z-10 rounded-full bg-paper/90 px-4 py-2 font-bold text-ink shadow-sm">{inr(product.price)}</span>
          </div>

          <div className="mt-6 card p-5">
            <h3 className="text-sm font-bold text-ink">{honestPromise.title}</h3>
            <ul className="mt-2 space-y-1.5">
              {honestPromise.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-stone">
                  <Icon.check width={15} height={15} className="mt-0.5 shrink-0 text-sage-deep" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details + configure */}
        <div>
          <span className="chip">{product.name}</span>
          <h1 className="mt-3 text-4xl font-bold text-ink">{product.tagline}</h1>
          <p className="mt-3 text-lg text-stone">{product.description}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-5xl font-bold text-ink">{inr(product.price)}</span>
            <span className="mb-2 text-sm text-mute">one happy little box</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.feelings.map((f) => (
              <span key={f} className="rounded-full bg-cream px-3 py-1 text-sm text-stone">
                {f}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ConfigureBox product={product} initialVibe={initialVibe} />
          </div>

          <Link
            href="/customize"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
          >
            Want something specific instead? Customise it →
          </Link>
        </div>
      </div>

      {/* Other boxes */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-ink">More little surprises</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.id}
              href={p.type === "customize" ? "/customize" : `/box/${p.id}`}
              className="card flex items-center justify-between p-5 transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="font-bold text-ink">{p.name}</div>
                <div className="text-sm text-stone">{p.kicker}</div>
              </div>
              <span className="text-xl font-bold text-ink">{inr(p.price)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-ink">Loved across India</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {someReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>
    </div>
  );
}
