import type { Metadata } from "next";
import Link from "next/link";
import { readCatalog } from "@/lib/catalog";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All products",
  description: "Everything Clue & Charm makes — mystery boxes and jewellery boxes across every category.",
};

export default function ProductsPage() {
  const catalog = readCatalog();

  return (
    <div className="vv-container py-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">our products</span>
        <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">Everything we make</h1>
        <p className="mt-4 text-lg text-stone">
          Browse every box by category — each one its own little surprise.
        </p>
      </div>

      {catalog.categories.map((cat) => {
        const products = catalog.products.filter((p) => p.categoryId === cat.id && p.active);
        if (products.length === 0) return null;
        return (
          <section key={cat.id} id={cat.slug} className="mt-14 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-ink">{cat.name}</h2>
                {cat.blurb && <p className="mt-1 text-stone">{cat.blurb}</p>}
              </div>
              <Link href={`/category/${cat.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-clay hover:underline">
                View {cat.name} <Icon.arrow width={16} height={16} />
              </Link>
            </div>
            <Reveal className="mt-8">
              <CatalogGrid products={products} />
            </Reveal>
          </section>
        );
      })}

      {catalog.products.length === 0 && (
        <p className="mt-12 text-center text-mute">No products yet — add some from the admin catalog.</p>
      )}
    </div>
  );
}
