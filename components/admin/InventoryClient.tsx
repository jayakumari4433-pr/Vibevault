"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { VibeBadge } from "@/components/admin/ui";
import { inventoryAction } from "@/app/admin/actions";
import type { DbInventory } from "@/lib/db";
import type { VibeSlug } from "@/lib/types";

export function InventoryClient({ items }: { items: DbInventory[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function adjust(i: DbInventory, stockDelta: number, usedDelta: number) {
    const stock = Math.max(0, i.stock + stockDelta);
    const used = i.used + usedDelta;
    startTransition(async () => {
      await inventoryAction(i.id, stock, used);
      router.refresh();
    });
  }

  if (items.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-stone">No inventory yet. Add your real stock items to track them here.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-wide text-mute">
            <tr>
              <th className="px-5 py-3 font-medium">Item</th>
              <th className="px-5 py-3 font-medium">Vibe</th>
              <th className="px-5 py-3 font-medium">In stock</th>
              <th className="px-5 py-3 font-medium">Used</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => {
              const low = i.stock <= i.threshold;
              return (
                <tr key={i.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{i.name}</td>
                  <td className="px-5 py-3">{i.vibe && <VibeBadge vibe={i.vibe as VibeSlug} />}</td>
                  <td className="px-5 py-3"><span className={`font-bold ${low ? "text-clay" : "text-ink"}`}>{i.stock}</span></td>
                  <td className="px-5 py-3 text-stone">{i.used}</td>
                  <td className="px-5 py-3">
                    {low ? (
                      <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-semibold text-clay">Low stock</span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Healthy</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => adjust(i, -1, 1)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-stone hover:text-ink" title="Mark one used">−</button>
                      <button onClick={() => adjust(i, 10, 0)} className="rounded-lg border border-line px-2.5 py-1.5 text-xs text-stone hover:text-ink" title="Restock +10">+10</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
