"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";
import { JEWELLERY_BOXES } from "@/lib/box";
import { Icon } from "./icons";

export function JewelleryBoxes() {
  const { add } = useCart();
  const router = useRouter();
  const [addedId, setAddedId] = useState<string | null>(null);

  function addToCart(id: string, name: string, price: number, goToCart: boolean) {
    add({ productId: id, type: "jewellery", name, price, qty: 1 });
    if (goToCart) {
      router.push("/cart");
      return;
    }
    setAddedId(id);
    setTimeout(() => setAddedId((v) => (v === id ? null : v)), 1600);
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {JEWELLERY_BOXES.map((b) => (
        <div key={b.id} className="card group flex flex-col overflow-hidden lift">
          <div className="relative aspect-[5/4] overflow-hidden border-b border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt={b.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {b.tag && (
              <span className="absolute left-3 top-3 rounded-full bg-clay px-2.5 py-1 text-[11px] font-bold text-white capitalize">
                {b.tag}
              </span>
            )}
            <span className="absolute bottom-3 right-3 rounded-full bg-paper/90 px-3 py-1 text-sm font-bold text-ink shadow-sm">
              {inr(b.price)}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-bold text-ink">{b.name}</h3>
            <p className="mt-1 flex-1 text-sm text-stone">{b.blurb}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => addToCart(b.id, b.name, b.price, true)} className="btn btn-accent h-10 flex-1 text-sm">
                Buy · {inr(b.price)}
              </button>
              <button onClick={() => addToCart(b.id, b.name, b.price, false)} className="btn btn-ghost h-10 px-3 text-sm" aria-label="Add to cart">
                {addedId === b.id ? <Icon.check width={16} height={16} /> : <Icon.cart width={16} height={16} />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
