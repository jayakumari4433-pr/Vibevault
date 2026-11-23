import { getInventory, type DbInventory } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { PageHeader, StatCard } from "@/components/admin/ui";
import { SetupBanner } from "@/components/admin/SetupBanner";
import { InventoryClient } from "@/components/admin/InventoryClient";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const configured = supabaseConfigured();
  let items: DbInventory[] = [];
  let errored = false;
  if (configured) {
    try {
      items = await getInventory();
    } catch {
      errored = true;
    }
  }

  const low = items.filter((i) => i.stock <= i.threshold).length;
  const totalStock = items.reduce((s, i) => s + i.stock, 0);

  return (
    <div>
      <PageHeader title="Inventory" sub="Track real stock, mark pieces used, catch low-stock early." />
      {(!configured || errored) && <SetupBanner errored={errored} />}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="SKUs tracked" value={String(items.length)} />
        <StatCard label="Pieces in stock" value={String(totalStock)} />
        <StatCard label="Low-stock items" value={String(low)} accent="#C17A54" />
      </div>

      <InventoryClient items={items} />
    </div>
  );
}
