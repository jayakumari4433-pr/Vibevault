import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies",
  description: "Shipping, our no-returns honesty, privacy and terms for Clue & Charm.",
};

const sections = [
  {
    id: "shipping",
    title: "Shipping",
    body: [
      "We ship pan-India with tracked courier delivery. Orders are usually hand-packed within 1–2 business days and delivered in 3–7 business days depending on your location.",
      "Shipping is free on orders of ₹249 and above. Below that, a small flat ₹39 applies.",
      "You'll get friendly WhatsApp updates — packed, shipped (with a tracking link), delivered.",
      "Cash on Delivery is available across most serviceable pincodes. We may confirm COD orders on WhatsApp before dispatch.",
    ],
  },
  {
    id: "returns",
    title: "No returns — honestly",
    body: [
      "Clue & Charm boxes are mystery boxes. The surprise is the whole point, so orders are non-returnable and non-exchangeable. Please order only if you're happy with the surprise idea. 🤍",
      "We don't disclose quantity or exact contents on purpose — you're buying a feeling matched to your vibe, not a checklist.",
      "We pour genuine care into every box, packed by hand to what you told us (your vibe, colour and note).",
      "Parcel damaged in transit? That's on us — send one photo on WhatsApp within 48 hours of delivery and we'll make it right. This is goodwill for transit damage, not a returns policy.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "We collect only what we need to fulfil your order and reach you: your name, phone number, email and delivery address.",
      "Your phone and email are used for order updates (mostly WhatsApp) and delivery. We never sell your personal data.",
      "Payments are handled securely by Razorpay. We don't store your card or UPI details on our servers.",
      "Want your data deleted? Message us on WhatsApp any time and we'll take care of it.",
    ],
  },
  {
    id: "terms",
    title: "Terms",
    body: [
      "Clue & Charm sells personalised mystery boxes (and customised surprises from ₹70). Exact contents vary by design — that's the surprise — and are matched to the vibe, colour and note you share.",
      "Customised orders are made to your request; because they're personalised surprises, they are also non-returnable (except for transit damage, as above).",
      "Prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise. Coupons can't be combined unless we say so.",
      "By ordering you confirm your details are accurate. We're not responsible for delays from incorrect addresses or courier disruptions beyond our control.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <div className="vv-container py-14">
      <div className="max-w-2xl">
        <span className="eyebrow">policies</span>
        <h1 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
          Clear, kind, no surprises (except the good one)
        </h1>
        <p className="mt-3 text-stone">
          Everything you need to buy with confidence. Still unsure?
          We&apos;re one WhatsApp away.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-stone hover:text-ink"
          >
            {s.title}
          </a>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="card scroll-mt-24 p-7 md:p-8">
            <h2 className="text-2xl font-bold text-ink">{s.title}</h2>
            <ul className="mt-4 space-y-3">
              {s.body.map((p, i) => (
                <li key={i} className="flex gap-3 text-stone">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-mute">
        Last updated {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })} · Clue & Charm, India
      </p>
    </div>
  );
}
