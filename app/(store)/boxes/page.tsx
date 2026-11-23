import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Shop the boxes",
  description:
    "Ring, pendant and jewellery mystery boxes from ₹149 — or customise your own surprise from ₹70.",
};

export default function BoxesPage() {
  return (
    <div className="vv-container py-14">
      <div className="max-w-2xl">
        <span className="eyebrow">the boxes</span>
        <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
          Pick a feeling. We&apos;ll surprise you.
        </h1>
        <p className="mt-3 text-stone">
          Honest prices, no quantity talk, no catch. What&apos;s inside stays a
          secret — that&apos;s the whole point. 🤍
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-12 card tint flex flex-col items-center justify-between gap-4 p-8 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-xl font-bold text-ink">Want something exact?</h2>
          <p className="mt-1 text-sm text-stone">
            Set your own budget from ₹70, pick a colour, and write us a note —
            even ask for a cup, a book or a pen.
          </p>
        </div>
        <Link href="/customize" className="btn btn-accent shrink-0">
          Customise yours <Icon.arrow width={18} height={18} />
        </Link>
      </div>
    </div>
  );
}
