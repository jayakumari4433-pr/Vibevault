import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line surface-cream">
      <div className="vv-container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-stone">
            A feeling, boxed. India&apos;s feel-good mystery boxes — jewellery,
            rings, pendants, or make your own from ₹70.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-line bg-paper p-2.5 text-ink hover:bg-cream"
            >
              <Icon.instagram />
            </a>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-line bg-paper p-2.5 text-ink hover:bg-cream"
            >
              <Icon.whatsapp />
            </a>
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { href: "/boxes", label: "All boxes" },
            { href: "/customize", label: "Customise your surprise" },
            { href: "/quiz", label: "Find your vibe" },
            { href: "/unboxings", label: "Unboxings" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "About & trust" },
            { href: "/policies", label: "Policies" },
            { href: "/policies#shipping", label: "Shipping" },
            { href: "/policies#returns", label: "No-returns, honestly" },
          ]}
        />
        <FooterCol
          title="Help"
          links={[
            { href: "https://wa.me/910000000000", label: "WhatsApp us" },
            { href: "/login", label: "Log in / Sign up" },
            { href: "/policies#privacy", label: "Privacy" },
            { href: "/admin", label: "Admin" },
          ]}
        />
      </div>

      <div className="border-t border-line">
        <div className="vv-container flex flex-col items-center justify-between gap-2 py-6 text-xs text-mute sm:flex-row">
          <p>© {new Date().getFullYear()} VibeVault · Made with care in India 🇮🇳</p>
          <p>Secure payments by Razorpay · UPI · Cards · COD</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-stone transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
