import type { Metadata } from "next";
import Link from "next/link";
import { unboxings, reviews } from "@/lib/content";
import { vibeMap } from "@/lib/vibes";
import { ReviewCard } from "@/components/ReviewCard";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Unboxings",
  description: "Real customer unboxing moments from across India.",
};

export default function UnboxingsPage() {
  return (
    <div className="vv-container py-14">
      <div className="max-w-2xl">
        <span className="eyebrow">unboxings</span>
        <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
          Real surprises, real grins
        </h1>
        <p className="mt-3 text-stone">
          Every one of these was a surprise someone actually opened. Tag{" "}
          <span className="font-semibold text-ink">@vibevault</span> to feature here.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {unboxings.map((u, i) => {
          const vibe = vibeMap[u.vibe];
          const tall = i % 3 === 0;
          return (
            <div
              key={u.id}
              data-vibe={u.vibe}
              className={`card tint relative overflow-hidden p-4 ${
                tall ? "row-span-2 aspect-[3/5]" : "aspect-[3/4]"
              }`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{vibe.emoji}</span>
                  <span className="chip">{vibe.name}</span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{u.caption}</p>
                  <p className="mt-1 text-xs text-stone">{u.name}, {u.city}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-bold text-ink">What they said after</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link href="/boxes" className="btn btn-accent h-12 px-8 text-base">
          Make your own moment <Icon.arrow width={18} height={18} />
        </Link>
      </div>
    </div>
  );
}
