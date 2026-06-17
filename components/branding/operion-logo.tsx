type OperionLogoProps = {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
  theme?: "light" | "dark";
};

export function OperionMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="operion-ring" x1="18" x2="102" y1="18" y2="102">
          <stop offset="0%" stopColor="#1EA0FF" />
          <stop offset="55%" stopColor="#0A5BFF" />
          <stop offset="100%" stopColor="#06298F" />
        </linearGradient>
      </defs>
      <path
        d="M93 24.9C84.9 17.4 73.9 13 61.8 13C36.5 13 16 33.5 16 58.8C16 84.1 36.5 104.6 61.8 104.6C74.1 104.6 85.2 100.1 93.4 92.4"
        stroke="url(#operion-ring)"
        strokeLinecap="round"
        strokeWidth="15"
      />
      <path d="M41 58.8L70.5 39.5L71.8 80.7L41 58.8Z" stroke="#243767" strokeWidth="4.5" />
      <circle cx="41" cy="58.8" fill="#61D64B" r="10.5" />
      <circle cx="70.5" cy="39.5" fill="#0A5BFF" r="10.5" />
      <circle cx="71.8" cy="80.7" fill="#0A5BFF" r="10.5" />
    </svg>
  );
}

export function OperionLogo({
  className = "",
  markClassName = "h-10 w-10",
  showTagline = false,
  theme = "light",
}: OperionLogoProps) {
  const textClassName = theme === "dark" ? "text-white" : "text-[var(--brand-ink)]";
  const subtextClassName = theme === "dark" ? "text-white/70" : "text-slate-500";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <OperionMark className={markClassName} />
      <div className="min-w-0">
        <div className="flex items-baseline gap-1 text-xl font-semibold lowercase leading-none">
          <span className={textClassName}>operion</span>
          <span className="text-[var(--brand-blue)]">labs</span>
        </div>
        {showTagline ? (
          <p className={`mt-1 text-[11px] leading-none ${subtextClassName}`}>
            Software that runs <span className="text-[var(--brand-green)]">real-world</span> work.
          </p>
        ) : null}
      </div>
    </div>
  );
}
