import { getReviews, type DbReview } from "@/lib/db";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { PageHeader } from "@/components/admin/ui";
import { SetupBanner } from "@/components/admin/SetupBanner";
import { ReviewsClient } from "@/components/admin/ReviewsClient";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const configured = supabaseConfigured();
  let reviews: DbReview[] = [];
  let errored = false;
  if (configured) {
    try {
      reviews = await getReviews();
    } catch {
      errored = true;
    }
  }

  const pending = reviews.filter((r) => r.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="Reviews / UGC"
        sub="Approve customer reviews to show them on the storefront."
        action={<span className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-semibold text-clay">{pending} pending</span>}
      />
      {(!configured || errored) && <SetupBanner errored={errored} />}
      <ReviewsClient reviews={reviews} />
    </div>
  );
}
