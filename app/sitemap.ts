import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { vibes } from "@/lib/vibes";

const BASE = "https://clueandcharm.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/boxes",
    "/customize",
    "/quiz",
    "/unboxings",
    "/about",
    "/policies",
    "/login",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const vibeRoutes = vibes.map((v) => ({
    url: `${BASE}/vibe/${v.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const boxRoutes = products
    .filter((p) => p.type !== "customize")
    .map((p) => ({
      url: `${BASE}/box/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...vibeRoutes, ...boxRoutes];
}
