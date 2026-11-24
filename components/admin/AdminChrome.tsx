"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icons";
import { adminLogout } from "@/app/admin/actions";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/orders", label: "Orders", icon: "clipboard" },
  { href: "/admin/catalog", label: "Catalog", icon: "layers" },
  { href: "/admin/boxes", label: "Boxes", icon: "box" },
  { href: "/admin/inventory", label: "Inventory", icon: "layers" },
  { href: "/admin/quiz", label: "Quiz Builder", icon: "sparkle" },
  { href: "/admin/customers", label: "Customers", icon: "users" },
  { href: "/admin/reviews", label: "Reviews / UGC", icon: "image" },
  { href: "/admin/coupons", label: "Coupons", icon: "tag" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  function logout() {
    startTransition(async () => {
      await adminLogout();
      router.replace("/admin/login");
      router.refresh();
    });
  }

  return (
    <div className="flex min-h-screen bg-sand">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-line bg-paper transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link href="/admin" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button className="text-stone md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <Icon.close />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((n) => {
            const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
            const I = Icon[n.icon];
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--accent-soft)] text-ink ring-1 ring-[color-mix(in_srgb,var(--color-clay)_30%,transparent)]"
                    : "text-stone hover:bg-cream hover:text-ink"
                }`}
              >
                <I width={18} height={18} className={active ? "text-clay" : ""} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-line p-3">
          <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-stone hover:bg-cream hover:text-ink">
            ← View storefront
          </Link>
          <button onClick={logout} className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-stone hover:bg-cream hover:text-ink">
            <Icon.lock width={16} height={16} /> Log out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-sand/85 px-5 backdrop-blur-xl md:px-8">
          <button className="text-ink md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Icon.menu />
          </button>
          <div className="flex-1">
            <span className="text-sm font-semibold text-ink">Admin panel</span>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-stone sm:flex">
            <span className="h-2 w-2 rounded-full bg-sage" /> Live · India
          </span>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-clay to-gold text-sm font-bold text-white">JK</div>
        </header>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
