import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/site";

export function ProcessSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-shell">
        <SectionHeading eyebrow="Process" title="What happens after payment">
          A clear timeline reduces surprises and gives every stakeholder a simple way to check
          progress.
        </SectionHeading>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-5" key={step}>
              <span className="text-sm font-semibold text-[var(--brand-blue)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-950">{step}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
