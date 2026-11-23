import type { Vibe, VibeSlug } from "./types";

export const vibes: Vibe[] = [
  {
    slug: "girls",
    name: "Girls",
    tagline: "Soft · pastel · cute",
    quote: "it's giving soft-girl era 🎀",
    emoji: "🎀",
    blurb: "Soft pinks and the cutest little surprises — a box that feels like a hug.",
  },
  {
    slug: "boys",
    name: "Boys",
    tagline: "Cool · bold · street",
    quote: "lowkey iconic ⛓️",
    emoji: "🛹",
    blurb: "Street-ready and cool, with a little bit of attitude.",
  },
  {
    slug: "women",
    name: "Women",
    tagline: "Elegant · warm · refined",
    quote: "quiet luxury, loud confidence ✨",
    emoji: "🌹",
    blurb: "Elegant, warm-toned pieces that go from desk to dinner.",
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Minimal · sharp · clean",
    quote: "effortless, never trying 🖤",
    emoji: "⚡",
    blurb: "Minimal and clean. Sharp, simple, never too much.",
  },
  {
    slug: "gamer",
    name: "Gamer",
    tagline: "Playful · night · fun",
    quote: "pov: your setup has drip now 🎮",
    emoji: "🎮",
    blurb: "Playful, fun accessories for the night-owl crowd.",
  },
  {
    slug: "car",
    name: "Car Lover",
    tagline: "Bold · warm · fast",
    quote: "full send, always 🏎️",
    emoji: "🏎️",
    blurb: "Bold, warm-metal pieces for the ones who love the drive.",
  },
];

export const vibeMap: Record<VibeSlug, Vibe> = vibes.reduce(
  (acc, v) => {
    acc[v.slug] = v;
    return acc;
  },
  {} as Record<VibeSlug, Vibe>,
);

export function getVibe(slug: string): Vibe | undefined {
  return vibeMap[slug as VibeSlug];
}
