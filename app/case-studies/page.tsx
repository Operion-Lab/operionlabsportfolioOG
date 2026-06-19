import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/page-header";
import { caseStudies } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Kriovya Labs case study style demos and prototypes, labeled without fake client claims.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader eyebrow="Case studies" title="Proof blocks that avoid fake claims">
        These examples show the type of product and workflow thinking Kriovya Labs can deliver while
        staying honest about demo and prototype status.
      </PageHeader>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-shell grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <article className="h-full rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm" key={study.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                {study.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">{study.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{study.summary}</p>
              <p className="mt-6 border-t border-slate-200 pt-5 text-sm font-medium text-slate-800">
                {study.result}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
