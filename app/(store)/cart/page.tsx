"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { vibeMap } from "@/lib/vibes";
import { inr } from "@/lib/format";
import { Icon } from "@/components/icons";
import { ProductMedia } from "@/components/art/ProductMedia";
import { getProduct } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, setQty, remove, count, ready } = useCart();

  if (!ready) {
    return <div className="vv-container py-20 text-center text-mute">Loading your cart…</div>;
  }

  if (count === 0) {
    return (
      <div className="vv-container py-20">
        <div className="card mx-auto max-w-md p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-clay">
            <Icon.cart width={28} height={28} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-ink">Your cart&apos;s empty</h1>
          <p className="mt-2 text-stone">
            Nothing to unbox yet. Let&apos;s fix that.
          </p>
          <Link href="/boxes" className="btn btn-accent mt-6">Shop the boxes</Link>
          <Link href="/quiz" className="mt-3 block text-sm text-mute hover:text-ink">
            or find your vibe
          </Link>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= 249 ? 0 : 39;
  const total = subtotal + shipping;

  return (
    <div className="vv-container py-14">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Your cart</h1>
      <p className="mt-2 text-stone">
        {count} little {count === 1 ? "surprise" : "surprises"} on the way.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.lineId} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div data-vibe={item.vibe} className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-line">
                <ProductMedia type={item.type} image={getProduct(item.productId)?.image} alt={item.name} className="h-full w-full" />
              </div>

              <div className="flex-1">
                <div className="font-bold text-ink">{item.name}</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {item.vibe && (
                    <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-stone">
                      {vibeMap[item.vibe].emoji} {vibeMap[item.vibe].name}
                    </span>
                  )}
                  {item.colour && (
                    <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-stone">
                      🎨 {item.colour}
                    </span>
                  )}
                  {item.category && (
                    <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-stone">
                      {item.category}
                    </span>
                  )}
                </div>
                {item.note && (
                  <div className="mt-1.5 text-xs italic text-mute">“{item.note}”</div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-line">
                  <button
                    onClick={() => setQty(item.lineId, item.qty - 1)}
                    className="grid h-9 w-9 place-items-center text-stone hover:text-ink"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-ink">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.lineId, item.qty + 1)}
                    className="grid h-9 w-9 place-items-center text-stone hover:text-ink"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <div className="w-20 text-right font-bold text-ink">
                  {inr(item.price * item.qty)}
                </div>
                <button
                  onClick={() => remove(item.lineId)}
                  className="text-mute hover:text-clay"
                  aria-label="Remove"
                >
                  <Icon.trash width={18} height={18} />
                </button>
              </div>
            </div>
          ))}

          <Link href="/boxes" className="inline-flex items-center gap-1 text-sm text-stone hover:text-ink">
            ← Add another surprise
          </Link>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-ink">Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Subtotal" value={inr(subtotal)} />
              <Row
                label="Shipping"
                value={shipping === 0 ? "Free" : inr(shipping)}
                hint={shipping === 0 ? undefined : "Free over ₹249"}
              />
              <div className="border-t border-line pt-3">
                <Row label="Total" value={inr(total)} strong />
              </div>
            </dl>
            <Link href="/checkout" className="btn btn-accent mt-6 h-12 w-full text-base">
              Checkout <Icon.arrow width={18} height={18} />
            </Link>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mute">
              <Icon.lock width={13} height={13} /> Secure · UPI · Card · COD
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
  strong,
}: {
  label: string;
  value: string;
  hint?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "font-bold text-ink" : "text-stone"}>
        {label}
        {hint && <span className="ml-2 text-xs text-mute">{hint}</span>}
      </dt>
      <dd className={strong ? "text-lg font-bold text-ink" : "text-ink"}>{value}</dd>
    </div>
  );
}
