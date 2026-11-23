"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Icon } from "./icons";

export function AuthForm({
  redirectTo,
  compact = false,
}: {
  redirectTo?: string;
  compact?: boolean;
}) {
  const { signIn } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const phoneOk = /^\d{10}$/.test(form.phone.replace(/\D/g, "").slice(-10));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const valid =
    (mode === "login" || form.name.trim().length > 1) &&
    phoneOk &&
    emailOk &&
    form.password.length >= 4;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setErr("Please fill every field correctly (10-digit phone, valid email, 4+ char password).");
      return;
    }
    signIn({
      name: form.name.trim() || form.email.split("@")[0],
      phone: form.phone.trim(),
      email: form.email.trim(),
    });
    router.push(redirectTo ?? "/account");
  }

  return (
    <div className={compact ? "" : "card p-7"}>
      {/* Tabs */}
      <div className="mb-5 grid grid-cols-2 rounded-full border border-line bg-cream p-1 text-sm font-medium">
        {(["signup", "login"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full py-2 transition-colors ${
              mode === m ? "bg-ink text-cream" : "text-stone hover:text-ink"
            }`}
          >
            {m === "signup" ? "Sign up" : "Log in"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
        )}
        <Field
          label="Phone (WhatsApp)"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
          placeholder="10-digit mobile"
          type="tel"
          hint="So we can send order updates."
        />
        <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" type="email" />
        <Field label="Password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="••••••" type="password" />

        {err && <p className="text-sm text-clay">{err}</p>}

        <button type="submit" className="btn btn-accent h-12 w-full text-base">
          <Icon.lock width={16} height={16} />
          {mode === "signup" ? "Create account & continue" : "Log in & continue"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-mute">
        Demo auth — no real account is created. Swap for OTP / NextAuth in production.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field mt-1.5"
      />
      {hint && <span className="mt-1 block text-xs text-mute">{hint}</span>}
    </label>
  );
}
