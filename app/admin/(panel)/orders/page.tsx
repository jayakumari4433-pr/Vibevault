import { getOrders, type DbOrder } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { PageHeader } from "@/components/admin/ui";
import { SetupBanner } from "@/components/admin/SetupBanner";
import { OrdersClient } from "@/components/admin/OrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const configured = supabaseConfigured();
  let orders: DbOrder[] = [];
  let errored = false;
  if (configured) {
    try {
      orders = await getOrders();
    } catch {
      errored = true;
    }
  }

  return (
    <div>
      <PageHeader title="Orders" sub="Real orders from checkout — change status, read each buyer's note & colour." />
      {(!configured || errored) && <SetupBanner errored={errored} />}
      <OrdersClient orders={orders} />
    </div>
  );
}
