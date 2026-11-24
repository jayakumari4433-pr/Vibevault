"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Icon } from "./icons";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { ThemeSwitcher } from "./ThemeSwitcher";

const links = [
  { href: "/", label: "The Box" },
  { href: "/products", label: "Shop" },
  { href: "/category/mystery", label: "Mystery" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const { count, ready } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-sand/85 backdrop-blur-xl">
      <nav className="vv-container flex h-16 items-center justify-between">
        <Link href="/" aria-label="Clue & Charm home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-ink" : "text-stone hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link
            href={user ? "/account" : "/login"}
            className="hidden rounded-full border border-line bg-paper px-3 py-2 text-sm font-medium text-ink hover:bg-cream sm:inline-flex"
          >
            {user ? `Hi, ${user.name.split(" ")[0]}` : "Log in"}
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full border border-line bg-paper p-2.5 text-ink transition-colors hover:bg-cream"
            aria-label={`Cart${ready && count ? `, ${count} items` : ""}`}
          >
            <Icon.cart />
            {ready && count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="rounded-full border border-line bg-paper p-2.5 text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <Icon.close /> : <Icon.menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-sand md:hidden">
          <div className="vv-container flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-stone hover:bg-cream hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="btn btn-ghost mt-2"
            >
              {user ? "My account" : "Log in / Sign up"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
