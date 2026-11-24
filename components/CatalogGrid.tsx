"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";
import { Icon } from "./icons";
import type { CatalogProduct } from "@/lib/catalog-types";

export function CatalogGrid({ products }: { products: CatalogProduct[] }) {
  const { add } = useCart();
  const router = useRouter();
  const [addedId, setAddedId] = useState<string | null>(null);

  function addToCart(p: CatalogProduct, goToCart: boolean) {
    add({ productId: p.id, type: "jewellery", name: p.name, price: p.price, qty: 1 });
    if (goToCart) {
      router.push("/cart");
      return;
    }
    setAddedId(p.id);
    setTimeout(() => setAddedId((v) => (v === p.id ? null : v)), 1500);
  }

  if (products.length === 0) {
    return <p className="text-sm text-mute">No products here yet.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p.id} className="card group flex flex-col overflow-hidden lift">
          <div className="relative aspect-[5/4] overflow-hidden border-b border-line bg-cream">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : null}
            <span className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-3 py-1 text-sm font-bold text-ink shadow-sm">
              {inr(p.price)}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-bold text-ink">{p.name}</h3>
            {p.blurb && <p className="mt-1 flex-1 text-sm text-stone">{p.blurb}</p>}
            <div className="mt-4 flex gap-2">
              <button onClick={() => addToCart(p, true)} className="btn btn-accent h-10 flex-1 text-sm">
                Buy · {inr(p.price)}
              </button>
              <button onClick={() => addToCart(p, false)} className="btn btn-ghost h-10 px-3 text-sm" aria-label="Add to cart">
                {addedId === p.id ? <Icon.check width={16} height={16} /> : <Icon.cart width={16} height={16} />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
