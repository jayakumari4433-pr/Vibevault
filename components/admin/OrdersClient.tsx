"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { inr } from "@/lib/format";
import { vibeMap } from "@/lib/vibes";
import { VibeBadge, StatusPill } from "@/components/admin/ui";
import { Icon } from "@/components/icons";
import { orderStatusAction } from "@/app/admin/actions";
import type { DbOrder } from "@/lib/db";
import type { OrderStatus, VibeSlug } from "@/lib/types";

const STATUSES: OrderStatus[] = ["new", "packed", "shipped", "delivered"];

export function OrdersClient({ orders }: { orders: DbOrder[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  function setStatus(id: string, status: OrderStatus) {
    startTransition(async () => {
      await orderStatusAction(id, status);
      router.refresh();
    });
  }
  function advance(o: DbOrder) {
    const idx = STATUSES.indexOf(o.status);
    setStatus(o.id, STATUSES[Math.min(idx + 1, STATUSES.length - 1)]);
  }

  const boxSummary = (o: DbOrder) =>
    o.order_items.map((i) => (i.qty > 1 ? `${i.name} ×${i.qty}` : i.name)).join(", ") || "—";

  if (orders.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-stone">No orders yet. Real orders will appear here the moment someone checks out. 🤍</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === s ? "border-transparent bg-ink text-cream" : "border-line bg-paper text-stone hover:text-ink"
            }`}
          >
            {s} {s !== "all" && `(${orders.filter((o) => o.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map((o) => (
          <div key={o.id} className="card overflow-hidden">
            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-ink">{o.id}</span>
                  <StatusPill status={o.status} />
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${o.payment === "cod" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {o.payment === "cod" ? "COD" : "Prepaid"}
                  </span>
                </div>
                <div className="mt-1.5 text-sm text-stone">
                  {o.customer_name} · {o.city} · {o.phone}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {o.vibe && <VibeBadge vibe={o.vibe as VibeSlug} />}
                  <span className="text-sm text-stone">{boxSummary(o)}</span>
                  {o.colour && <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-stone">🎨 {o.colour}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3 md:flex-col md:items-end">
                <span className="text-xl font-bold text-ink">{inr(o.amount)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:w-56 md:justify-end">
                <select
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)}
                  className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-clay"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
                {o.status !== "delivered" && (
                  <button onClick={() => advance(o)} className="btn btn-accent h-9 px-3 text-xs">→ Next</button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-line surface-cream px-5 py-3 text-sm">
              <button
                onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                className="inline-flex items-center gap-1.5 font-medium text-clay hover:underline"
              >
                <Icon.clipboard width={15} height={15} />
                {expanded === o.id ? "Hide" : "See"} what to pack
              </button>
              {o.phone && (
                <a
                  href={`https://wa.me/91${o.phone.replace(/\D/g, "").slice(-10)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-stone hover:text-ink"
                >
                  <Icon.whatsapp width={15} height={15} /> WhatsApp buyer
                </a>
              )}
            </div>

            {expanded === o.id && (
              <div className="border-t border-line bg-cream p-5">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <PackCell label="Email" value={o.email ?? "—"} />
                  <PackCell label="Pincode" value={o.pincode ?? "—"} />
                  <PackCell label="Address" value={o.address ?? "—"} />
                  <PackCell label="Vibe" value={o.vibe ? vibeMap[o.vibe as VibeSlug]?.name ?? o.vibe : "—"} />
                </div>
                <div className="mt-3 space-y-2">
                  {o.order_items.map((it) => (
                    <div key={it.id} className="rounded-xl border border-line bg-paper p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-ink">{it.name} {it.qty > 1 && `×${it.qty}`}</span>
                        <span className="text-stone">{inr(it.price * it.qty)}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-stone">
                        {it.vibe && <span className="rounded-full bg-cream px-2 py-0.5">Vibe: {it.vibe}</span>}
                        {it.colour && <span className="rounded-full bg-cream px-2 py-0.5">🎨 {it.colour}</span>}
                        {it.category && <span className="rounded-full bg-cream px-2 py-0.5">{it.category}</span>}
                      </div>
                      {it.note && <div className="mt-1 italic text-mute">“{it.note}”</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function PackCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-3">
      <div className="text-xs text-mute">{label}</div>
      <div className="mt-0.5 font-semibold text-ink">{value}</div>
    </div>
  );
}
