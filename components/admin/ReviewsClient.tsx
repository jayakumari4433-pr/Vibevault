"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { VibeBadge } from "@/components/admin/ui";
import { Icon } from "@/components/icons";
import { reviewStatusAction } from "@/app/admin/actions";
import type { DbReview } from "@/lib/db";
import type { VibeSlug } from "@/lib/types";

export function ReviewsClient({ reviews }: { reviews: DbReview[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function set(id: string, status: "pending" | "approved" | "hidden") {
    startTransition(async () => {
      await reviewStatusAction(id, status);
      router.refresh();
    });
  }

  if (reviews.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-stone">No reviews yet. Customer reviews will show up here to approve. 🤍</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reviews.map((r) => (
        <div key={r.id} className="card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {r.vibe && <VibeBadge vibe={r.vibe as VibeSlug} />}
              <div className="flex text-gold">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Icon.star key={i} width={13} height={13} />
                ))}
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              r.status === "approved" ? "bg-emerald-100 text-emerald-700" : r.status === "hidden" ? "bg-cream text-mute" : "bg-amber-100 text-amber-700"
            }`}>
              {r.status === "approved" ? "Live" : r.status === "hidden" ? "Hidden" : "Pending"}
            </span>
          </div>
          <p className="mt-3 text-sm text-ink">“{r.text}”</p>
          <div className="mt-2 text-xs text-mute">{r.name}{r.city ? ` · ${r.city}` : ""}</div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => set(r.id, "approved")} className="btn btn-accent h-8 flex-1 text-xs">
              <Icon.check width={14} height={14} /> Approve
            </button>
            <button onClick={() => set(r.id, "hidden")} className="btn btn-ghost h-8 flex-1 text-xs">Hide</button>
          </div>
        </div>
      ))}
    </div>
  );
}
