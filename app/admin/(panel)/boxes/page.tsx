"use client";

import { products } from "@/lib/products";
import { inr } from "@/lib/format";
import { PageHeader } from "@/components/admin/ui";
import { Icon } from "@/components/icons";

const TYPE_EMOJI: Record<string, string> = {
  ring: "💫",
  pendant: "🫧",
  jewellery: "🎀",
  customize: "🎁",
};

export default function AdminBoxesPage() {
  return (
    <div>
      <PageHeader
        title="Boxes"
        sub="Your box menu — names, prices and the feeling words shown on the shop."
        action={
          <button className="btn btn-accent h-10 px-4 text-sm">
            <Icon.box width={16} height={16} /> New box
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{TYPE_EMOJI[p.type]}</span>
              <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-stone capitalize">{p.type}</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-ink">{p.name}</h3>
            <div className="mt-1 text-2xl font-bold text-gold">
              {p.type === "customize" ? `from ${inr(p.price)}` : inr(p.price)}
            </div>
            <p className="mt-2 text-sm text-stone">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.feelings.map((f) => (
                <span key={f} className="rounded-full bg-cream px-2 py-0.5 text-xs text-stone">{f}</span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn btn-ghost h-9 flex-1 text-sm">Edit</button>
              <button className="btn btn-ghost h-9 px-3 text-sm text-stone">
                <Icon.image width={15} height={15} /> Images
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-mute">
        Note: we never show quantity or value on the storefront — only the price and the feeling. Keep it that way 🤍
      </p>
    </div>
  );
}
