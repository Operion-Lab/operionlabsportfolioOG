import Image from "next/image";

type KriovyaLogoProps = {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
  theme?: "light" | "dark";
};

export function KriovyaMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={`${className} object-contain`}
      height={512}
      src="/branding/kriovya-mark-compact.png"
      width={518}
    />
  );
}

export function KriovyaLogo({
  className = "",
  markClassName = "h-10 w-10",
  showTagline = false,
  theme = "light",
}: KriovyaLogoProps) {
  const textClassName = theme === "dark" ? "text-white" : "text-[var(--brand-ink)]";
  const subtextClassName = theme === "dark" ? "text-white/70" : "text-slate-500";

  return (
    <div aria-label="Kriovya Labs" className={`flex items-center gap-3 ${className}`}>
      <KriovyaMark className={markClassName} />
      <div className="min-w-0">
        <div className="flex items-baseline gap-1 text-xl font-semibold leading-none tracking-[-0.035em]">
          <span className={textClassName}>Kriovya</span>
          <span className="text-[var(--brand-blue)]">Labs</span>
        </div>
        {showTagline ? (
          <div className={`mt-1.5 flex items-center gap-2 ${subtextClassName}`}>
            <span aria-hidden className="h-px w-4 bg-[var(--brand-cyan)]" />
            <p className="whitespace-nowrap text-[10px] leading-none tracking-[0.01em]">
              Ideas into working systems.
            </p>
            <span aria-hidden className="h-px w-4 bg-[var(--brand-cyan)]" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
