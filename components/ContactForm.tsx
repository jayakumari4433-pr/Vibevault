"use client";

import { useState } from "react";
import { Icon } from "./icons";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const valid = form.name.trim().length > 1 && emailOk && form.message.trim().length > 3;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* ignore — demo */
    }
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cream text-clay">
          <Icon.check width={26} height={26} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Message sent 🤍</h3>
        <p className="mt-2 text-stone">
          Thanks, {form.name.split(" ")[0] || "friend"} — we&apos;ll get back to
          you on WhatsApp or email within a day.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", phone: "", message: "" });
          }}
          className="btn btn-ghost mt-5"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-6 md:p-7">
      <h2 className="text-lg font-bold text-ink">Send us a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-stone">Your name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="field mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-stone">Phone (optional)</span>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="WhatsApp number"
            className="field mt-1.5"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-stone">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@email.com"
          className="field mt-1.5"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-stone">How can we help?</span>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          placeholder="Tell us anything — an order question, a custom request, a hello 🤍"
          className="field mt-1.5 resize-none"
        />
      </label>
      <button type="submit" disabled={!valid || sending} className="btn btn-accent h-12 w-full text-base">
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className="text-center text-xs text-mute">We usually reply within a day.</p>
    </form>
  );
}
