import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface-muted)] py-16 sm:py-20">
      <div className="site-shell">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{children}</p>
      </div>
    </section>
  );
}
