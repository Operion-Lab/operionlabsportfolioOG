import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceAreas } from "@/content/site";

export function ServicesGrid({
  heading = true,
  items = serviceAreas,
}: {
  heading?: boolean;
  items?: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-shell">
        {heading ? (
          <SectionHeading eyebrow="Services" title="Common build scopes for operational teams">
            From company websites to workflow platforms, each engagement is scoped around an actual
            business process and a maintainable production setup.
          </SectionHeading>
        ) : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service, index) => (
            <Reveal delay={index * 0.03} key={service.title}>
              <article className="h-full rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm transition hover:border-[var(--brand-blue)] hover:shadow-md">
                <service.icon aria-hidden className="h-6 w-6 text-[var(--brand-blue)]" />
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
