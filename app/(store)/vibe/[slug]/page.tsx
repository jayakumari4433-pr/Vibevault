import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { vibes, getVibe } from "@/lib/vibes";
import { products } from "@/lib/products";
import { reviews, unboxings } from "@/lib/content";
import { VibeLanding } from "@/components/VibeLanding";

export function generateStaticParams() {
  return vibes.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vibe = getVibe(slug);
  if (!vibe) return { title: "Vibe not found" };
  return { title: `${vibe.name} — ${vibe.tagline}`, description: vibe.blurb };
}

export default async function VibePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vibe = getVibe(slug);
  if (!vibe) notFound();

  return (
    <VibeLanding
      vibe={vibe}
      products={products}
      reviews={reviews.filter((r) => r.vibe === vibe.slug)}
      unboxings={unboxings.filter((u) => u.vibe === vibe.slug)}
    />
  );
}
