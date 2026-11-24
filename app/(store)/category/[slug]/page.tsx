import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readCatalog, getCategoryBySlug } from "@/lib/catalog";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Reveal } from "@/components/motion/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  return { title: cat ? cat.name : "Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const all = readCatalog().products.filter((p) => p.categoryId === cat.id && p.active);
  const uncategorised = all.filter((p) => !p.subcategoryId || !cat.subcategories.some((s) => s.id === p.subcategoryId));

  return (
    <div className="vv-container py-14">
      <nav className="text-sm text-mute">
        <Link href="/products" className="hover:text-ink">All products</Link>
        <span className="mx-2">/</span>
        <span className="text-stone">{cat.name}</span>
      </nav>

      <div className="mt-4 max-w-2xl">
        <span className="eyebrow">{cat.name}</span>
        <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">{cat.name}</h1>
        {cat.blurb && <p className="mt-3 text-lg text-stone">{cat.blurb}</p>}
      </div>

      {/* grouped by subcategory */}
      {cat.subcategories.map((sub) => {
        const products = all.filter((p) => p.subcategoryId === sub.id);
        if (products.length === 0) return null;
        return (
          <section key={sub.id} className="mt-12">
            <h2 className="text-2xl font-bold text-ink">{sub.name}</h2>
            <Reveal className="mt-6">
              <CatalogGrid products={products} />
            </Reveal>
          </section>
        );
      })}

      {uncategorised.length > 0 && (
        <section className="mt-12">
          {cat.subcategories.length > 0 && <h2 className="text-2xl font-bold text-ink">More</h2>}
          <Reveal className="mt-6">
            <CatalogGrid products={uncategorised} />
          </Reveal>
        </section>
      )}

      {all.length === 0 && <p className="mt-12 text-mute">No products in this category yet.</p>}
    </div>
  );
}
