import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { fieldOpsFeatures } from "@/content/site";

export function FieldOpsHighlight() {
  return (
    <section className="bg-[var(--surface-muted)] py-16 sm:py-20">
      <div className="site-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-sm">
          <Image
            alt="FieldOps SaaS dashboard with mobile screens"
            className="h-auto w-full"
            height={1080}
            priority
            src="/mockups/fieldops-dashboard.png"
            width={1920}
          />
        </div>

        <div>
          <SectionHeading eyebrow="FieldOps SaaS" title="Run field teams from one cloud platform">
            FieldOps brings tasks, expenses, purchase orders, service calls, documents, mobile
            screens and reports into a structured operating system.
          </SectionHeading>
          <div className="mt-8 grid gap-3">
            {fieldOpsFeatures.map((feature) => (
              <div className="flex items-start gap-3" key={feature}>
                <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 flex-none text-[var(--brand-green)]" />
                <span className="text-sm leading-6 text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/fieldops-saas" variant="primary">
              View FieldOps <ArrowRight aria-hidden size={18} />
            </ButtonLink>
            <ButtonLink href="/fieldops-saas#demo" variant="outline">
              Request Demo
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
