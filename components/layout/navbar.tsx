"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { KriovyaLogo } from "@/components/branding/kriovya-logo";
import { navItems } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/88 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="site-shell flex h-16 items-center justify-between"
      >
        <Link
          className="flex items-center"
          href="/"
          onClick={() => setOpen(false)}
        >
          <KriovyaLogo markClassName="h-9 w-9" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--brand-blue-soft)] text-[var(--brand-ink)]"
                    : "text-slate-600 hover:bg-[var(--brand-blue-soft)]"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="/get-quote" variant="secondary">
            Get Quote
          </ButtonLink>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] text-slate-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--border)] bg-white lg:hidden" id="mobile-navigation">
          <div className="site-shell grid gap-1 py-4">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  className={`rounded-md px-3 py-3 text-sm font-medium ${
                    active
                      ? "bg-[var(--brand-blue-soft)] text-[var(--brand-ink)]"
                      : "text-slate-700"
                  }`}
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink className="mt-3 w-full" href="/get-quote" variant="secondary">
              Get Quote
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
