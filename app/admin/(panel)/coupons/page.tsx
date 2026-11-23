import { getCoupons, type DbCoupon } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { PageHeader } from "@/components/admin/ui";
import { SetupBanner } from "@/components/admin/SetupBanner";
import { CouponsClient } from "@/components/admin/CouponsClient";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const configured = supabaseConfigured();
  let coupons: DbCoupon[] = [];
  let errored = false;
  if (configured) {
    try {
      coupons = await getCoupons();
    } catch {
      errored = true;
    }
  }

  return (
    <div>
      <PageHeader title="Coupons & Offers" sub="Discount codes, first-order offers and festival sales." />
      {(!configured || errored) && <SetupBanner errored={errored} />}
      <CouponsClient coupons={coupons} />
    </div>
  );
}
