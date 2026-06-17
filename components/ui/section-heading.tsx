import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  theme = "light",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  const titleClassName = theme === "dark" ? "text-white" : "text-slate-950";
  const bodyClassName = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-3xl font-semibold tracking-normal sm:text-4xl ${titleClassName}`}>
        {title}
      </h2>
      {children ? <p className={`mt-4 text-base leading-7 ${bodyClassName}`}>{children}</p> : null}
    </div>
  );
}
