"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { couponAction } from "@/app/admin/actions";
import type { DbCoupon } from "@/lib/db";

export function CouponsClient({ coupons }: { coupons: DbCoupon[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function toggle(c: DbCoupon) {
    startTransition(async () => {
      await couponAction(c.code, !c.active);
      router.refresh();
    });
  }

  if (coupons.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-stone">No coupons yet. Create real discount codes to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {coupons.map((c) => (
        <div key={c.code} className="card flex items-center justify-between p-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-line bg-cream px-3 py-1 font-mono text-sm font-bold text-ink">{c.code}</span>
              {c.type && <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-stone">{c.type}</span>}
            </div>
            {c.description && <p className="mt-2 text-sm text-stone">{c.description}</p>}
            <p className="mt-1 text-xs text-mute">{c.uses} redemptions</p>
          </div>
          <button
            onClick={() => toggle(c)}
            className={`relative h-7 w-12 rounded-full transition-colors ${c.active ? "bg-sage" : "bg-line"}`}
            aria-label={c.active ? "Deactivate" : "Activate"}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${c.active ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}
