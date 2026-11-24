import type { Metadata } from "next";
import Link from "next/link";
import { unboxings, reviews } from "@/lib/content";
import { ReviewCard } from "@/components/ReviewCard";
import { UnboxingCard } from "@/components/UnboxingCard";
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
          <span className="font-semibold text-ink">@clueandcharm</span> to feature here.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {unboxings.map((u, i) => (
          <UnboxingCard key={u.id} u={u} i={i} />
        ))}
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
