"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { customCategories, MIN_CUSTOM_PRICE } from "@/lib/products";
import { inr } from "@/lib/format";
import type { VibeSlug } from "@/lib/types";
import { Icon } from "./icons";
import { VibeChips, ColourSwatches, NoteField } from "./pickers";

const PRESETS = [70, 120, 199, 299, 499];

export function CustomizeBuilder() {
  const { add } = useCart();
  const router = useRouter();

  const [amount, setAmount] = useState(120);
  const [category, setCategory] = useState("jewellery");
  const [itemText, setItemText] = useState("");
  const [vibe, setVibe] = useState<VibeSlug | null>(null);
  const [colour, setColour] = useState<{ id: string; label: string } | null>(null);
  const [note, setNote] = useState("");

  const safeAmount = Math.max(MIN_CUSTOM_PRICE, Math.round(amount) || MIN_CUSTOM_PRICE);
  const selectedCat = customCategories.find((c) => c.id === category)!;
  const needsItem = category === "else";
  const valid = !needsItem || itemText.trim().length > 1;

  function describeCategory() {
    if (category === "else") return `Something else: ${itemText.trim()}`;
    return selectedCat.label + (itemText.trim() ? ` · ${itemText.trim()}` : "");
  }

  function addToCart(goToCart: boolean) {
    if (!valid) return;
    add({
      productId: "customize",
      type: "customize",
      name: "Customise Your Surprise",
      price: safeAmount,
      qty: 1,
      vibe: vibe ?? undefined,
      colour: colour?.label,
      note: note.trim() || undefined,
      category: describeCategory(),
    });
    if (goToCart) router.push("/cart");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-6">
        {/* Budget */}
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Your budget</h2>
            <span className="text-2xl font-bold text-ink">{inr(safeAmount)}</span>
          </div>
          <p className="mt-1 text-sm text-stone">
            You decide. Minimum {inr(MIN_CUSTOM_PRICE)} — we&apos;ll make it feel
            like more.
          </p>
          <input
            type="range"
            min={MIN_CUSTOM_PRICE}
            max={999}
            step={10}
            value={safeAmount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-4 w-full accent-[var(--color-clay)]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(p)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  safeAmount === p
                    ? "border-transparent bg-ink text-cream"
                    : "border-line bg-paper text-stone hover:text-ink"
                }`}
              >
                {inr(p)}
              </button>
            ))}
            <label className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-stone">
              ₹
              <input
                type="number"
                min={MIN_CUSTOM_PRICE}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-16 bg-transparent outline-none"
              />
            </label>
          </div>
        </section>

        {/* What */}
        <section className="card p-6">
          <h2 className="text-lg font-bold text-ink">What should it be?</h2>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {customCategories.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? "border-clay bg-[var(--accent-soft)]"
                      : "border-line bg-paper hover:border-stone/40"
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span>
                    <span className="block font-semibold text-ink">{c.label}</span>
                    {c.hint && (
                      <span className="block text-xs text-stone">{c.hint}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="mt-4 block text-sm font-semibold text-ink">
            {needsItem ? "Tell us exactly what you'd love" : "Any specifics? (optional)"}
          </label>
          <input
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
            placeholder={
              needsItem
                ? "e.g. a cute coffee mug, a notebook, a pen for him…"
                : "e.g. hoops, something dainty, nothing too big…"
            }
            className="field mt-2"
          />
        </section>

        {/* Vibe + colour + note */}
        <section className="card p-6">
          <h2 className="text-lg font-bold text-ink">Make it personal</h2>
          <div className="mt-4 space-y-5">
            <div>
              <label className="text-sm font-semibold text-ink">Who&apos;s it for / vibe</label>
              <div className="mt-2">
                <VibeChips value={vibe} onChange={setVibe} />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">Colour you love</label>
              <div className="mt-2">
                <ColourSwatches
                  value={colour?.id ?? null}
                  onChange={(id, label) => setColour({ id, label })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">
                Your note to us
              </label>
              <div className="mt-2">
                <NoteField
                  value={note}
                  onChange={setNote}
                  placeholder="What are you hoping to feel when you open it? Tell us anything 🤍"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-ink">Your surprise</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <SummaryRow label="Budget" value={inr(safeAmount)} />
            <SummaryRow label="What" value={describeCategory()} />
            {vibe && <SummaryRow label="Vibe" value={vibe} cap />}
            {colour && <SummaryRow label="Colour" value={colour.label} />}
            {note.trim() && <SummaryRow label="Note" value="added 🤍" />}
          </dl>
          <button
            onClick={() => addToCart(true)}
            disabled={!valid}
            className="btn btn-accent mt-5 h-12 w-full text-base"
          >
            Add &amp; checkout · {inr(safeAmount)}
          </button>
          <button
            onClick={() => addToCart(false)}
            disabled={!valid}
            className="btn btn-ghost mt-2 h-11 w-full text-sm"
          >
            Add to cart
          </button>
          {!valid && (
            <p className="mt-2 text-center text-xs text-mute">
              Tell us what you&apos;d love first 🙂
            </p>
          )}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mute">
            <Icon.lock width={13} height={13} /> No returns on surprises — but we
            pour love in.
          </p>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  cap,
}: {
  label: string;
  value: string;
  cap?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-stone">{label}</dt>
      <dd className={`text-right font-medium text-ink ${cap ? "capitalize" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
