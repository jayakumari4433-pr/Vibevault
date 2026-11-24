import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with Clue & Charm — WhatsApp, email or Instagram. We reply within a day.",
};

const methods = [
  {
    icon: "whatsapp" as const,
    label: "WhatsApp",
    value: "+91 00000 00000",
    href: "https://wa.me/910000000000",
    hint: "Fastest way to reach us",
  },
  {
    icon: "heart" as const,
    label: "Email",
    value: "hello@clueandcharm.in",
    href: "mailto:hello@clueandcharm.in",
    hint: "For orders & questions",
  },
  {
    icon: "instagram" as const,
    label: "Instagram",
    value: "@clueandcharm",
    href: "https://instagram.com/clueandcharm",
    hint: "DMs always open",
  },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-8rem] h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--accent-soft)] blur-[120px]" />
      </div>

      <div className="vv-container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">contact us</span>
          <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
            We&apos;d love to <span className="text-gradient">hear from you</span>
          </h1>
          <p className="mt-4 text-lg text-stone">
            A question about an order, a custom request, or just a hello — reach
            us whichever way is easiest. A real person always replies.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* methods */}
          <div className="space-y-4">
            {methods.map((m) => {
              const I = Icon[m.icon];
              return (
                <a
                  key={m.label}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card lift flex items-center gap-4 p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream text-clay">
                    <I width={24} height={24} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-mute">{m.hint}</span>
                    <span className="block font-bold text-ink">{m.label}</span>
                    <span className="block text-sm text-stone">{m.value}</span>
                  </span>
                </a>
              );
            })}

            <div className="card p-5">
              <h3 className="font-bold text-ink">Our hours</h3>
              <p className="mt-1 text-sm text-stone">
                Mon–Sat, 10am–7pm IST. Messages sent after hours get a reply the
                next working day.
              </p>
              <p className="mt-3 text-sm text-stone">
                📍 Shipped with care from India, pan-India delivery.
              </p>
            </div>
          </div>

          {/* form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
