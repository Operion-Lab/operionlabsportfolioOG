import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--brand-ink)] text-white hover:bg-[#10234f] focus-visible:ring-[#ccd9ff]",
  secondary:
    "bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-strong)] focus-visible:ring-[#ccd9ff]",
  outline:
    "border border-[var(--border)] bg-white text-[var(--brand-ink)] hover:border-[var(--brand-blue)] hover:bg-[var(--brand-blue-soft)] focus-visible:ring-[#dfe9ff]",
  ghost:
    "text-slate-700 hover:bg-[var(--brand-blue-soft)] hover:text-[var(--brand-ink)] focus-visible:ring-[#dfe9ff]",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link className={`${baseClasses} ${variantClasses[variant]} ${className}`} href={href}>
      {children}
    </Link>
  );
}

export function ExternalButtonLink({
  href,
  children,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      className={`${baseClasses} disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
