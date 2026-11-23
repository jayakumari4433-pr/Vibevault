"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { Icon } from "@/components/icons";
import { adminLogin } from "@/app/admin/actions";

export function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(false);
    startTransition(async () => {
      const res = await adminLogin(pw);
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setErr(true);
      }
    });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-sand px-4">
      <div className="w-full max-w-sm">
        <div className="card p-8">
          <div className="flex flex-col items-center text-center">
            <LogoMark className="h-14 w-14" />
            <h1 className="mt-4 text-2xl font-bold text-ink">Admin login</h1>
            <p className="mt-1 text-sm text-stone">Only you get in. Enter your password.</p>
          </div>
          <form onSubmit={submit} className="mt-6">
            <label className="block">
              <span className="text-sm font-medium text-stone">Password</span>
              <input
                type="password"
                value={pw}
                autoFocus
                onChange={(e) => {
                  setPw(e.target.value);
                  setErr(false);
                }}
                placeholder="••••••••"
                className="field mt-1.5"
              />
            </label>
            {err && <p className="mt-2 text-sm text-clay">Incorrect password. Try again.</p>}
            <button type="submit" disabled={pending} className="btn btn-accent mt-5 w-full">
              <Icon.lock width={16} height={16} /> {pending ? "Checking…" : "Unlock dashboard"}
            </button>
          </form>
          <p className="mt-5 rounded-lg bg-cream px-3 py-2 text-center text-xs text-mute">
            Default password: <span className="font-semibold text-stone">vault123</span>
            <br />
            Set ADMIN_PASSWORD &amp; ADMIN_SESSION_SECRET in .env.local to change it.
          </p>
        </div>
      </div>
    </div>
  );
}
