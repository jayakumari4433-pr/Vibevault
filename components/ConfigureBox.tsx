"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, VibeSlug } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";
import { Icon } from "./icons";
import { VibeChips, ColourSwatches, NoteField } from "./pickers";

export function ConfigureBox({
  product,
  initialVibe = null,
}: {
  product: Product;
  initialVibe?: VibeSlug | null;
}) {
  const { add } = useCart();
  const router = useRouter();
  const [vibe, setVibe] = useState<VibeSlug | null>(initialVibe);
  const [colour, setColour] = useState<{ id: string; label: string } | null>(null);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  function addToCart(goToCart: boolean) {
    add({
      productId: product.id,
      type: product.type,
      name: product.name,
      price: product.price,
      qty: 1,
      vibe: vibe ?? undefined,
      colour: colour?.label,
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
    <div className="card p-6">
      <h2 className="text-lg font-bold text-ink">Make it feel like you</h2>
      <p className="mt-1 text-sm text-stone">
        All optional — but the more you tell us, the better the surprise.
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <label className="text-sm font-semibold text-ink">
            Who&apos;s it for / your vibe
          </label>
          <div className="mt-2">
            <VibeChips value={vibe} onChange={setVibe} />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-ink">
            Colour you love
          </label>
          <div className="mt-2">
            <ColourSwatches
              value={colour?.id ?? null}
              onChange={(id, label) => setColour({ id, label })}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-ink">
            A little note <span className="font-normal text-mute">(optional)</span>
          </label>
          <div className="mt-2">
            <NoteField value={note} onChange={setNote} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button onClick={() => addToCart(true)} className="btn btn-accent flex-1 h-12 text-base">
          Add &amp; checkout · {inr(product.price)}
        </button>
        <button onClick={() => addToCart(false)} className="btn btn-ghost flex-1 h-12 text-base">
          {added ? (
            <>
              <Icon.check width={18} height={18} /> Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </div>
  );
}
