import type { Metadata } from "next";
import Link from "next/link";
import { trustPoints, honestPromise } from "@/lib/content";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About & Trust",
  description: "Who we are and why you can trust us — a real, tiny team in India.",
};

const stats = [
  { value: "100%", label: "Hand-packed" },
  { value: "Pan-India", label: "Tracked shipping" },
  { value: "₹70+", label: "Start small" },
  { value: "Real", label: "Humans on WhatsApp" },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <div className="vv-container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <LogoMark className="mx-auto h-16 w-16 animate-float" />
          <span className="eyebrow mt-6 block">our promise</span>
          <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
            We sell a <span className="text-gradient">feeling</span>, not a price tag
          </h1>
          <p className="mt-5 text-lg text-stone">
            Clue & Charm is a small, independent team in India obsessed with that
            first-open grin. We don&apos;t shout about how much you get — we care
            that it <em>feels</em> like you. You tell us your vibe, your colour,
            a little note; a real person packs it by hand.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <div className="text-2xl font-bold text-gradient sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-stone">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-ink">Why you can trust us</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {trustPoints.map((t) => {
              const I = Icon[t.icon as keyof typeof Icon];
              return (
                <div key={t.title} className="card flex items-start gap-4 p-6">
                  <span className="rounded-xl bg-cream p-3 text-clay">
                    <I width={22} height={22} />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{t.title}</h3>
                    <p className="mt-1 text-sm text-stone">{t.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl card tint p-8 md:p-10">
          <h2 className="text-2xl font-bold text-ink">{honestPromise.title}</h2>
          <ul className="mt-4 grid gap-2.5">
            {honestPromise.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-stone">
                <Icon.check width={18} height={18} className="mt-0.5 shrink-0 text-sage-deep" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/boxes" className="btn btn-accent">Shop a surprise</Link>
            <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon.whatsapp width={18} height={18} /> Chat with us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
