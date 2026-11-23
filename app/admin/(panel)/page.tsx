import Link from "next/link";
import { getDashboardStats } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { inr } from "@/lib/format";
import { PageHeader, StatCard, VibeBadge, StatusPill } from "@/components/admin/ui";
import { SetupBanner } from "@/components/admin/SetupBanner";
import type { VibeSlug } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const configured = supabaseConfigured();
  let stats: Awaited<ReturnType<typeof getDashboardStats>> | null = null;
  let errored = false;
  if (configured) {
    try {
      stats = await getDashboardStats();
    } catch {
      errored = true;
    }
  }

  return (
    <div>
      <PageHeader title="Good morning, Jaya 👋" sub="Here's what's happening today." />
      {(!configured || errored) && <SetupBanner errored={errored} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Orders (all time)" value={String(stats?.ordersCount ?? 0)} />
        <StatCard label="Revenue" value={inr(stats?.revenue ?? 0)} accent="#C6A24B" />
        <StatCard label="Pending shipments" value={String(stats?.pending ?? 0)} accent="#C17A54" hint="New + packed" />
        <StatCard label="COD orders" value={String(stats?.codCount ?? 0)} hint={`${stats?.prepaidCount ?? 0} prepaid`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-ink">Revenue</h2>
          <p className="mt-1 text-sm text-stone">
            Total from {stats?.ordersCount ?? 0} order{(stats?.ordersCount ?? 0) === 1 ? "" : "s"}:{" "}
            <span className="font-semibold text-ink">{inr(stats?.revenue ?? 0)}</span>
          </p>
          <div className="mt-6 grid h-32 place-items-center rounded-xl border border-dashed border-line text-sm text-mute">
            {stats && stats.ordersCount > 0
              ? "Revenue charts appear as orders roll in 📈"
              : "No orders yet — your first sale will show here."}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">Low-stock alerts</h2>
            <Link href="/admin/inventory" className="text-xs text-clay hover:underline">Manage</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {(stats?.lowStock.length ?? 0) === 0 && <li className="text-sm text-mute">Nothing low right now ✨</li>}
            {stats?.lowStock.map((i) => (
              <li key={i.id} className="flex items-center justify-between">
                <span className="text-sm text-stone">{i.name}</span>
                <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-semibold text-clay">{i.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 card overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-bold text-ink">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm text-clay hover:underline">View all →</Link>
        </div>
        {(stats?.recentOrders.length ?? 0) === 0 ? (
          <div className="px-6 pb-6 text-sm text-mute">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-y border-line text-xs uppercase tracking-wide text-mute">
                <tr>
                  <th className="px-6 py-3 font-medium">Order</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Vibe</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Pay</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-line last:border-0">
                    <td className="px-6 py-3 font-medium text-ink">{o.id}</td>
                    <td className="px-6 py-3 text-stone">
                      {o.customer_name}
                      <div className="text-xs text-mute">{o.city}</div>
                    </td>
                    <td className="px-6 py-3">{o.vibe && <VibeBadge vibe={o.vibe as VibeSlug} />}</td>
                    <td className="px-6 py-3 font-semibold text-ink">{inr(o.amount)}</td>
                    <td className="px-6 py-3 uppercase text-xs text-stone">{o.payment}</td>
                    <td className="px-6 py-3"><StatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
