import type { OrderStatus, VibeSlug } from "@/lib/types";
import { vibeMap } from "@/lib/vibes";

export function PageHeader({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-ink md:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-stone">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}) {
  return (
    <div className="card p-5">
      <div className="text-sm text-stone">{label}</div>
      <div className="mt-1.5 text-2xl font-bold md:text-3xl" style={accent ? { color: accent } : { color: "var(--color-ink)" }}>
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-mute">{hint}</div>}
    </div>
  );
}

export function VibeBadge({ vibe }: { vibe: VibeSlug }) {
  const v = vibeMap[vibe];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-stone">
      {v.emoji} {v.name}
    </span>
  );
}

const STATUS_STYLE: Record<OrderStatus, { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-[var(--accent-soft)] text-clay" },
  packed: { label: "Packed", cls: "bg-amber-100 text-amber-700" },
  shipped: { label: "Shipped", cls: "bg-sky-100 text-sky-700" },
  delivered: { label: "Delivered", cls: "bg-emerald-100 text-emerald-700" },
};

export function StatusPill({ status }: { status: OrderStatus }) {
  const s = STATUS_STYLE[status];
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}>{s.label}</span>;
}
