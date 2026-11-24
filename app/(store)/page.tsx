import Link from "next/link";
import { reviews, trustPoints, honestPromise } from "@/lib/content";
import { MYSTERY_BOX } from "@/lib/box";
import { BuyBox } from "@/components/BuyBox";
import { JewelleryBoxes } from "@/components/JewelleryBoxes";
import { ReviewCard } from "@/components/ReviewCard";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons";
import { inr } from "@/lib/format";

const steps = [
  { n: "1", title: "Pick your price", text: "₹149, ₹249, ₹399 — or name your own from ₹70." },
  { n: "2", title: "Add a colour & note", text: "Optional, but it makes the surprise feel picked for you." },
  { n: "3", title: "We hand-pack it", text: "A real person reads your note and matches your box." },
  { n: "4", title: "Open the surprise", text: "WhatsApp updates from packed to delivered." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO + BUY ---------------- */}
      <section id="top" className="relative overflow-hidden scroll-mt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[var(--accent-soft)] blur-[120px]" />
        </div>

        <div className="vv-container py-14 text-center md:py-20">
          <span className="chip chip-accent mx-auto animate-in">
            <Icon.sparkle width={14} height={14} /> mystery jewellery, made in India
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.04] text-ink sm:text-6xl animate-in">
            Follow the clue.
            <span className="block text-gradient">Find the charm.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone animate-in">
            {MYSTERY_BOX.blurb}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone">
            <span className="inline-flex items-center gap-2">
              <Icon.star width={16} height={16} className="text-gold" /> loved by customers across India
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon.lock width={15} height={15} className="text-clay" /> UPI · Card · COD
            </span>
          </div>

          {/* buy box */}
          <div className="animate-in mx-auto mt-10 max-w-2xl text-left">
            <BuyBox />
          </div>
        </div>
      </section>

      {/* ---------------- JEWELLERY BOXES (2nd product line) ---------------- */}
      <section className="border-y border-line surface-cream">
        <div className="vv-container py-16">
          <div className="max-w-2xl">
            <span className="eyebrow">our jewellery boxes</span>
            <h2 className="mt-2 text-3xl font-bold text-ink">Pick a jewellery box</h2>
            <p className="mt-3 text-stone">
              Different boxes for different moments — everyday, gifting, weddings
              and more. Each one its own surprise.
            </p>
          </div>
          <Reveal stagger className="mt-10">
            <JewelleryBoxes />
          </Reveal>
        </div>
      </section>

      {/* ---------------- TRUST ---------------- */}
      <section className="border-y border-line surface-cream">
        <div className="vv-container py-14">
          <div className="max-w-2xl">
            <span className="eyebrow">why you can trust us</span>
            <h2 className="mt-2 text-3xl font-bold text-ink">Real people, real care</h2>
          </div>
          <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((t) => {
              const I = Icon[t.icon as keyof typeof Icon];
              return (
                <div key={t.title} className="card p-6 lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cream text-clay">
                    <I width={22} height={22} />
                  </span>
                  <h3 className="mt-4 font-bold text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-stone">{t.text}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="vv-container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">how it works</span>
          <h2 className="mt-2 text-3xl font-bold text-ink">Four little steps</h2>
        </div>
        <Reveal as="ol" stagger className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card p-6 lift">
              <span className="font-display text-4xl font-bold text-gradient">{s.n}</span>
              <h3 className="mt-3 text-base font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm text-stone">{s.text}</p>
            </li>
          ))}
        </Reveal>
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
                    <Icon.check width={18} height={18} className="mt-0.5 shrink-0 text-clay" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section className="vv-container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">real customers</span>
          <h2 className="mt-2 text-3xl font-bold text-ink">They loved opening theirs</h2>
        </div>
        <Reveal stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </Reveal>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="vv-container py-16">
        <div className="card tint p-10 text-center md:p-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-ink md:text-4xl">
            Your little surprise is one tap away
          </h2>
          <p className="mx-auto mt-3 max-w-md text-stone">From {inr(70)}. Pick your price, we do the rest.</p>
          <Link href="/#top" className="btn btn-accent mt-7 h-12 px-8 text-base">
            Pick your box
          </Link>
        </div>
      </section>
    </>
  );
}
