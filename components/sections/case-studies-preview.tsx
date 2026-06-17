import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/content/site";

export function CaseStudiesPreview() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="site-shell">
        <SectionHeading eyebrow="Case studies" title="Prototype proof without fake client claims">
          No fake client logos are shown. Until real client approvals are available, examples are
          labeled as internal product demos, prototypes or available demos.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" key={study.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                {study.label}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{study.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{study.summary}</p>
              <p className="mt-5 border-t border-slate-200 pt-5 text-sm font-medium text-slate-800">
                {study.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
