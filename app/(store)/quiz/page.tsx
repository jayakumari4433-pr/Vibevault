"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { vibes, vibeMap } from "@/lib/vibes";
import { quizQuestions } from "@/lib/quiz";
import { getProduct } from "@/lib/products";
import { inr } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { Icon } from "@/components/icons";
import { ColourSwatches, NoteField } from "@/components/pickers";
import type { VibeSlug } from "@/lib/types";

// mood option id -> product id
const MOOD_TO_PRODUCT: Record<string, string> = {
  ring: "ring",
  pendant: "pendant",
  mix: "jewellery",
  spoil: "jewellery-plus",
  custom: "customize",
};

const TOTAL = 4; // vibe, mood, colour, note

export default function QuizPage() {
  const router = useRouter();
  const { add } = useCart();

  const [step, setStep] = useState(0);
  const [vibe, setVibe] = useState<VibeSlug | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [colour, setColour] = useState<{ id: string; label: string } | null>(null);
  const [note, setNote] = useState("");

  const product = useMemo(
    () => (mood ? getProduct(MOOD_TO_PRODUCT[mood]) : null),
    [mood],
  );
  const atResult = step >= TOTAL;
  const progress = Math.round((Math.min(step, TOTAL) / TOTAL) * 100);

  function reset() {
    setStep(0);
    setVibe(null);
    setMood(null);
    setColour(null);
    setNote("");
  }

  function addToCart() {
    if (!product) return;
    if (product.type === "customize") {
      router.push("/customize");
      return;
    }
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
    router.push("/cart");
  }

  return (
    <div data-vibe={vibe ?? undefined} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-8rem] h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--vibe-tint)] blur-[120px]" />
      </div>

      <div className="vv-container py-12 md:py-16">
        <div className="mx-auto max-w-xl">
          <div className="flex items-center justify-between text-xs text-mute">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-full px-2 py-1 disabled:opacity-0 hover:text-ink"
            >
              ← Back
            </button>
            <span>{atResult ? "Your match" : `Step ${step + 1} of ${TOTAL}`}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
              style={{ width: `${atResult ? 100 : progress}%` }}
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          {/* STEP 0 — vibe */}
          {step === 0 && (
            <div className="animate-in">
              <h1 className="text-center text-3xl font-bold text-ink sm:text-4xl">
                Pick your vibe
              </h1>
              <p className="mt-2 text-center text-stone">
                One tap sets the whole feeling.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {vibes.map((v) => (
                  <button
                    key={v.slug}
                    data-vibe={v.slug}
                    onClick={() => {
                      setVibe(v.slug);
                      setStep(1);
                    }}
                    className="card tint p-5 text-left transition-all hover:-translate-y-1"
                  >
                    <span className="text-3xl">{v.emoji}</span>
                    <div className="mt-3 font-bold text-ink">{v.name}</div>
                    <div className="text-xs text-stone">{v.tagline}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — mood -> box */}
          {step === 1 && (
            <div className="animate-in">
              <h1 className="text-center text-2xl font-bold text-ink sm:text-3xl">
                {quizQuestions[0].question}
              </h1>
              <p className="mt-2 text-center text-sm text-stone">
                {quizQuestions[0].helper}
              </p>
              <div className="mt-8 grid gap-3">
                {quizQuestions[0].options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setMood(o.id);
                      setStep(2);
                    }}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                      mood === o.id
                        ? "border-clay bg-[var(--accent-soft)]"
                        : "border-line bg-paper hover:border-stone/40"
                    }`}
                  >
                    <span className="text-2xl">{o.emoji}</span>
                    <span>
                      <span className="block font-semibold text-ink">{o.label}</span>
                      {o.sub && <span className="block text-xs text-stone">{o.sub}</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — colour */}
          {step === 2 && (
            <div className="animate-in">
              <h1 className="text-center text-2xl font-bold text-ink sm:text-3xl">
                A colour you love?
              </h1>
              <p className="mt-2 text-center text-sm text-stone">
                Helps us match the finish. Pick one or skip.
              </p>
              <div className="mt-8 flex justify-center">
                <ColourSwatches
                  value={colour?.id ?? null}
                  onChange={(id, label) => setColour({ id, label })}
                />
              </div>
              <div className="mt-8 flex justify-center gap-3">
                <button onClick={() => setStep(3)} className="btn btn-primary px-8">
                  Next
                </button>
                <button
                  onClick={() => {
                    setColour(null);
                    setStep(3);
                  }}
                  className="btn btn-ghost px-6"
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — note */}
          {step === 3 && (
            <div className="animate-in">
              <h1 className="text-center text-2xl font-bold text-ink sm:text-3xl">
                Anything we should know?
              </h1>
              <p className="mt-2 text-center text-sm text-stone">
                A mood, an occasion, a &quot;please no X&quot;. Totally optional.
              </p>
              <div className="mt-6">
                <NoteField value={note} onChange={setNote} />
              </div>
              <div className="mt-6 flex justify-center">
                <button onClick={() => setStep(4)} className="btn btn-accent px-8 h-12 text-base">
                  See my box <Icon.arrow width={18} height={18} />
                </button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {atResult && product && (
            <div className="animate-in text-center">
              <span className="chip chip-accent mx-auto">
                <Icon.sparkle width={14} height={14} /> matched to you
              </span>
              <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
                {vibe ? `${vibeMap[vibe].name} · ` : ""}
                {product.name}
              </h1>
              <p className="mt-2 text-stone">{product.tagline}</p>

              <div className="card mt-8 p-6 text-left">
                <div className="flex items-center justify-between">
                  <span className="chip">{product.kicker}</span>
                  <span className="text-2xl font-bold text-ink">{inr(product.price)}</span>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  {vibe && (
                    <div className="flex justify-between">
                      <dt className="text-stone">Vibe</dt>
                      <dd className="font-medium text-ink">{vibeMap[vibe].name}</dd>
                    </div>
                  )}
                  {colour && (
                    <div className="flex justify-between">
                      <dt className="text-stone">Colour</dt>
                      <dd className="font-medium text-ink">{colour.label}</dd>
                    </div>
                  )}
                  {note.trim() && (
                    <div className="flex justify-between">
                      <dt className="text-stone">Your note</dt>
                      <dd className="font-medium text-ink">added 🤍</dd>
                    </div>
                  )}
                </dl>

                <button onClick={addToCart} className="btn btn-accent mt-5 h-12 w-full text-base">
                  {product.type === "customize"
                    ? "Build my custom surprise"
                    : `Add to cart · ${inr(product.price)}`}
                </button>
              </div>

              <button
                onClick={reset}
                className="mt-6 text-sm text-mute underline-offset-4 hover:text-ink hover:underline"
              >
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
