import { getCustomers, type CustomerRow } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { inr } from "@/lib/format";
import { PageHeader, VibeBadge, StatCard } from "@/components/admin/ui";
import { SetupBanner } from "@/components/admin/SetupBanner";
import type { VibeSlug } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const configured = supabaseConfigured();
  let customers: CustomerRow[] = [];
  let errored = false;
  if (configured) {
    try {
      customers = await getCustomers();
    } catch {
      errored = true;
    }
  }

  const repeat = customers.filter((c) => c.repeat).length;
  const revenue = customers.reduce((s, c) => s + c.spent, 0);

  return (
    <div>
      <PageHeader title="Customers" sub="Everyone who's ordered — their contact details and repeat buyers." />
      {(!configured || errored) && <SetupBanner errored={errored} />}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total customers" value={String(customers.length)} />
        <StatCard label="Repeat buyers" value={String(repeat)} accent="#C6A24B" />
        <StatCard label="Lifetime revenue" value={inr(revenue)} />
      </div>

      {customers.length === 0 ? (
        <div className="card p-10 text-center text-stone">No customers yet. They appear here after their first order.</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-line text-xs uppercase tracking-wide text-mute">
                <tr>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Vibe</th>
                  <th className="px-5 py-3 font-medium">Orders</th>
                  <th className="px-5 py-3 font-medium">Spent</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink">{c.name ?? "—"}</div>
                      <div className="text-xs text-mute">{c.city ?? ""}</div>
                    </td>
                    <td className="px-5 py-3 text-stone">
                      <div>{c.phone ?? "—"}</div>
                      <div className="text-xs text-mute">{c.email ?? ""}</div>
                    </td>
                    <td className="px-5 py-3">{c.vibe && <VibeBadge vibe={c.vibe as VibeSlug} />}</td>
                    <td className="px-5 py-3 text-stone">{c.orders}</td>
                    <td className="px-5 py-3 font-semibold text-ink">{inr(c.spent)}</td>
                    <td className="px-5 py-3">
                      {c.repeat ? (
                        <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-[#8a6d1f]">Repeat ♥</span>
                      ) : (
                        <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold text-stone">New</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
