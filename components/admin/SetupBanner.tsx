export function SetupBanner({ errored = false }: { errored?: boolean }) {
  return (
    <div className="mb-6 rounded-xl border border-clay/40 bg-[var(--accent-soft)] p-4 text-sm">
      <p className="font-semibold text-ink">
        {errored ? "Couldn't reach Supabase." : "Supabase isn't connected yet."}
      </p>
      <p className="mt-1 text-stone">
        Add <code className="rounded bg-paper px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="rounded bg-paper px-1">SUPABASE_SERVICE_ROLE_KEY</code> to
        <code className="rounded bg-paper px-1">.env.local</code>, run the two migration files in{" "}
        <code className="rounded bg-paper px-1">supabase/migrations/</code>, then restart the dev server.
        Until then, this page shows no live data.
      </p>
    </div>
  );
}
