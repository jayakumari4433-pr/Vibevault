import Link from "next/link";
import { vibes } from "@/lib/vibes";
import { products } from "@/lib/products";
import { reviews, unboxings, trustPoints, honestPromise } from "@/lib/content";
import { VibeTile } from "@/components/VibeTile";
import { ProductCard } from "@/components/ProductCard";
import { ReviewCard } from "@/components/ReviewCard";
import { QuoteMarquee } from "@/components/QuoteMarquee";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { inr } from "@/lib/format";

const steps = [
  { n: "01", title: "Pick your vibe", text: "Girls, Gamer, Minimal… one tap tells us the feeling." },
  { n: "02", title: "Add a colour & a note", text: "Optional, but it makes the surprise feel picked for you." },
  { n: "03", title: "We hand-pack it", text: "A real person reads your note and matches your box." },
  { n: "04", title: "Open the feeling", text: "WhatsApp updates from packed to unbox. Then: that grin." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--color-clay)_30%,transparent)] blur-[130px]" />
          <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--color-sage)_30%,transparent)] blur-[120px]" />
        </div>

        <div className="vv-container grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-in">
            <span className="chip chip-accent">
              <Icon.heart width={14} height={14} /> made with care in India
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.03] text-ink sm:text-6xl">
              A feeling,
              <br />
              <span className="text-gradient">boxed.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-stone">
              Pick your vibe, tell us a little, and open a surprise made to feel
              like you. Jewellery, rings, pendants — or make your own, from{" "}
              <span className="font-semibold text-ink">just ₹70</span>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/boxes" className="btn btn-accent h-12 px-7 text-base">
                Shop the boxes <Icon.arrow width={18} height={18} />
              </Link>
              <Link href="/customize" className="btn btn-ghost h-12 px-7 text-base">
                Customise yours
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone">
              <span className="inline-flex items-center gap-2">
                <Icon.star width={16} height={16} className="text-gold" /> loved
                by real customers across India
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon.lock width={15} height={15} className="text-sage-deep" /> safe
                UPI · Card · COD
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm animate-in">
            <div className="card tint relative aspect-square overflow-hidden">
              <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
                <LogoMark className="h-24 w-24 animate-float" />
                <div>
                  <p className="eyebrow">today&apos;s little surprise</p>
                  <p className="mt-2 font-display text-2xl font-bold text-ink">
                    your sign to spoil yourself
                  </p>
                </div>
                <div className="flex gap-2">
                  {vibes.map((v) => (
                    <span
                      key={v.slug}
                      data-vibe={v.slug}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                      title={v.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 card flex items-center gap-2 px-4 py-3 text-sm">
              <Icon.sparkle width={18} height={18} className="text-clay" />
              <span className="font-semibold text-ink">it&apos;s giving main character</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST FIRST ---------------- */}
      <section className="border-y border-line surface-cream">
        <div className="vv-container py-16">
          <div className="max-w-2xl">
            <span className="eyebrow">why you can trust us</span>
            <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Real people, real care — before anything else
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t) => {
              const I = Icon[t.icon as keyof typeof Icon];
              return (
                <div key={t.title} className="card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cream text-clay">
                    <I width={22} height={22} />
                  </span>
                  <h3 className="mt-4 font-bold text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-stone">{t.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="vv-container py-20">
        <SectionHead
          eyebrow="how it works"
          title="Four taps to that grin"
          sub="Short on purpose. The surprise does the heavy lifting."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card p-6">
              <span className="text-sm font-bold text-gradient">{s.n}</span>
              <h3 className="mt-3 text-base font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm text-stone">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- THE MENU ---------------- */}
      <section className="border-y border-line surface-cream">
        <div className="vv-container py-20">
          <SectionHead
            eyebrow="the boxes"
            title="Little surprises, honest prices"
            sub="Pick one — we keep what's inside a secret on purpose. That's the fun."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GENZ QUOTES ---------------- */}
      <QuoteMarquee />

      {/* ---------------- SHOP BY VIBE ---------------- */}
      <section className="vv-container py-20">
        <SectionHead
          eyebrow="shop by vibe"
          title="Which one's you today?"
          sub="Your vibe shapes the whole surprise."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vibes.map((v) => (
            <VibeTile key={v.slug} vibe={v} />
          ))}
        </div>
      </section>

      {/* ---------------- HONEST PROMISE ---------------- */}
      <section className="vv-container pb-4">
        <div className="card tint p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <span className="text-5xl">🤍</span>
            <div>
              <h2 className="text-2xl font-bold text-ink">{honestPromise.title}</h2>
              <ul className="mt-4 grid gap-2.5">
                {honestPromise.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-stone">
                    <Icon.check width={18} height={18} className="mt-0.5 shrink-0 text-sage-deep" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section className="vv-container py-20">
        <SectionHead
          eyebrow="real customers"
          title="They came for the surprise, stayed for the feeling"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      {/* ---------------- UNBOXINGS ---------------- */}
      <section className="border-y border-line surface-cream">
        <div className="vv-container py-20">
          <SectionHead eyebrow="unboxings" title="Fresh little moments" sub="Tag @vibevault to be featured." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {unboxings.slice(0, 8).map((u) => {
              const v = vibes.find((x) => x.slug === u.vibe)!;
              return (
                <div
                  key={u.id}
                  data-vibe={u.vibe}
                  className="card tint relative aspect-[3/4] overflow-hidden p-4"
                >
                  <div className="flex h-full flex-col justify-between">
                    <span className="text-2xl">{v.emoji}</span>
                    <div>
                      <p className="font-display text-base font-bold text-ink">{u.caption}</p>
                      <p className="mt-1 text-xs text-stone">{u.name}, {u.city}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="vv-container py-20">
        <div className="card tint relative overflow-hidden p-10 text-center md:p-16">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold text-ink md:text-5xl">
            Your little treat is one tap away
          </h2>
          <p className="mx-auto mt-4 max-w-md text-stone">
            From {inr(70)}. No price anxiety, just good feelings.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/boxes" className="btn btn-accent h-12 px-8 text-base">
              Shop now <Icon.arrow width={18} height={18} />
            </Link>
            <Link href="/quiz" className="btn btn-ghost h-12 px-8 text-base">
              Find your vibe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-stone">{sub}</p>}
    </div>
  );
}
