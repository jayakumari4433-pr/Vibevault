"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/icons";

export default function AccountPage() {
  const { user, ready, signOut } = useAuth();

  if (!ready) {
    return <div className="vv-container py-20 text-center text-mute">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="vv-container py-20 text-center">
        <p className="text-stone">You&apos;re not logged in.</p>
        <Link href="/login" className="btn btn-accent mt-4">Log in / Sign up</Link>
      </div>
    );
  }

  return (
    <div className="vv-container py-16">
      <div className="mx-auto max-w-md">
        <div className="card p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-cream text-xl font-bold text-clay">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink">Hi, {user.name.split(" ")[0]} 👋</h1>
              <p className="text-sm text-stone">Welcome back to your vault.</p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
            <div className="flex justify-between"><dt className="text-stone">Name</dt><dd className="font-medium text-ink">{user.name}</dd></div>
            <div className="flex justify-between"><dt className="text-stone">Phone</dt><dd className="font-medium text-ink">{user.phone}</dd></div>
            <div className="flex justify-between"><dt className="text-stone">Email</dt><dd className="font-medium text-ink">{user.email}</dd></div>
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/boxes" className="btn btn-accent">Shop a surprise</Link>
            <button onClick={signOut} className="btn btn-ghost">
              <Icon.lock width={16} height={16} /> Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
