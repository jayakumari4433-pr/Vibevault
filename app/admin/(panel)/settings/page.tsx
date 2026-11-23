"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/ui";
import { Icon } from "@/components/icons";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  function save(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" sub="Payment keys, shipping rates, pickup address and WhatsApp config." />

      <form onSubmit={save} className="space-y-6">
        <Section title="Payments" desc="Razorpay keys power UPI, cards, netbanking & COD. Kept server-side.">
          <Field label="Razorpay Key ID" placeholder="rzp_live_xxxxxxxx" />
          <Field label="Razorpay Key Secret" placeholder="••••••••••••" type="password" />
          <Toggle label="Enable Cash on Delivery" defaultOn />
        </Section>

        <Section title="Shipping" desc="Free-shipping threshold and flat rate below it.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Free shipping above (₹)" placeholder="249" type="number" />
            <Field label="Flat rate below (₹)" placeholder="39" type="number" />
          </div>
        </Section>

        <Section title="Pickup address" desc="Where couriers collect your parcels.">
          <Field label="Business name" placeholder="VibeVault" />
          <Field label="Address" placeholder="Street, area, city, pincode" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" placeholder="City" />
            <Field label="Pincode" placeholder="6-digit" />
          </div>
        </Section>

        <Section title="WhatsApp" desc="Business number for order updates to buyers.">
          <Field label="WhatsApp business number" placeholder="+91  XXXXX XXXXX" />
          <Toggle label="Auto-send packed/shipped updates" defaultOn />
        </Section>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn btn-accent h-11 px-6">
            {saved ? (<><Icon.check width={16} height={16} /> Saved</>) : "Save settings"}
          </button>
          <p className="text-xs text-mute">Demo only — store real keys in environment variables, never in code.</p>
        </div>
      </form>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-mute">{desc}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone">{label}</span>
      <input type={type} placeholder={placeholder} className="field mt-1.5" />
    </label>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-stone">{label}</span>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={`relative h-7 w-12 rounded-full transition-colors ${on ? "bg-sage" : "bg-line"}`}
        aria-label={label}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
