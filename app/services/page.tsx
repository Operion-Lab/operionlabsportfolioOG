import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TrustSection } from "@/components/sections/trust-section";
import { serviceAreas } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Website development, mobile apps, custom software, admin panels, backend APIs, cloud databases, AI chatbots and maintenance from Operion Labs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Software services for real business workflows">
        Operion Labs builds practical systems with clear scope, secure forms, maintainable code and
        deployment support.
      </PageHeader>
      <ServicesGrid heading={false} items={serviceAreas} />
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="site-shell">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Discovery and written scope before build",
              "Secure APIs, validation and server-only keys",
              "Testing, deployment and maintenance support",
            ].map((item) => (
              <article className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm" key={item}>
                <h2 className="text-lg font-semibold text-slate-950">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This keeps the work measurable, reduces launch risk and gives the client a clear
                  handover path.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <TrustSection />
    </>
  );
}
