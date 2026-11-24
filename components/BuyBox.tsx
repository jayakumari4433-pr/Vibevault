"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";
import { MYSTERY_BOX, PRICE_OPTIONS } from "@/lib/box";
import { Icon } from "./icons";

export function BuyBox() {
  const { add } = useCart();
  const router = useRouter();

  const [optionId, setOptionId] = useState("classic");
  const [custom, setCustom] = useState(false);
  const [customPrice, setCustomPrice] = useState(999);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const opt = PRICE_OPTIONS.find((o) => o.id === optionId)!;
  const price = custom
    ? Math.min(MYSTERY_BOX.maxPrice, Math.max(MYSTERY_BOX.minPrice, Math.round(customPrice) || MYSTERY_BOX.minPrice))
    : opt.price;
  const label = custom ? "Your price" : opt.label;

  function addToCart(goToCart: boolean) {
    add({
      productId: custom ? `box-custom-${price}` : `box-${optionId}`,
      type: "jewellery",
      name: `${MYSTERY_BOX.name} · ${label}`,
      price,
      qty: 1,
      note: note.trim() || undefined,
    });
    if (goToCart) {
      router.push("/cart");
      return;
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="card p-6 md:p-7">
      <h2 className="text-lg font-bold text-ink">Pick your price</h2>
      <p className="mt-1 text-sm text-stone">Same lovely box — the more you spend, the more lavish the surprise.</p>

      {/* 5 price tiers */}
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {PRICE_OPTIONS.map((o) => {
          const active = !custom && optionId === o.id;
          return (
            <button
              key={o.id}
              onClick={() => { setCustom(false); setOptionId(o.id); }}
              className={`relative rounded-2xl border p-4 text-left transition-all ${
                active ? "border-clay bg-[var(--accent-soft)]" : "border-line bg-paper hover:border-stone/40"
              }`}
            >
              {(o.popular || o.tag) && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-clay px-2 py-0.5 text-[10px] font-bold text-white">
                  {o.tag ?? "Most loved"}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-ink">{inr(o.price)}</span>
                <span className="text-xs font-semibold text-ink">{o.label}</span>
              </div>
              <div className="mt-0.5 text-xs text-stone">{o.blurb}</div>
            </button>
          );
        })}
      </div>

      {/* name your own price */}
      <button
        onClick={() => setCustom(true)}
        className={`mt-2.5 flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
          custom ? "border-clay bg-[var(--accent-soft)]" : "border-line bg-paper hover:border-stone/40"
        }`}
      >
        <span>
          <span className="block text-sm font-semibold text-ink">Name your own price</span>
          <span className="block text-xs text-stone">
            From {inr(MYSTERY_BOX.minPrice)} up to {inr(MYSTERY_BOX.maxPrice)} — you decide.
          </span>
        </span>
        <span className="text-xl font-bold text-ink">{custom ? inr(price) : `${inr(MYSTERY_BOX.minPrice)}+`}</span>
      </button>
      {custom && (
        <div className="mt-3">
          <input
            type="range"
            min={MYSTERY_BOX.minPrice}
            max={MYSTERY_BOX.maxPrice}
            step={100}
            value={price}
            onChange={(e) => setCustomPrice(Number(e.target.value))}
            className="w-full accent-[var(--color-clay)]"
          />
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-stone">₹</span>
            <input
              type="number"
              min={MYSTERY_BOX.minPrice}
              value={customPrice}
              onChange={(e) => setCustomPrice(Number(e.target.value))}
              className="field w-28"
            />
          </div>
        </div>
      )}

      {/* note */}
      <div className="mt-5">
        <label className="text-sm font-semibold text-ink">A little note <span className="font-normal text-mute">(optional)</span></label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 240))}
          rows={3}
          placeholder="Tell us what you're hoping for — a mood, who it's for, a 'please no X'. We read every one 🤍"
          className="field mt-2 resize-none"
        />
      </div>

      {/* actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => addToCart(true)} className="btn btn-accent h-12 flex-1 text-base">
          Buy now · {inr(price)}
        </button>
        <button onClick={() => addToCart(false)} className="btn btn-ghost h-12 flex-1 text-base">
          {added ? (<><Icon.check width={18} height={18} /> Added</>) : "Add to cart"}
        </button>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mute">
        <Icon.lock width={13} height={13} /> Secure checkout · UPI · Card · COD
      </p>
    </div>
  );
}
