import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { DemoForm } from "@/components/forms/demo-form";
import { ButtonLink } from "@/components/ui/button";
import { fieldOpsFeatures, fieldOpsIndustries } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FieldOps SaaS",
  description:
    "FieldOps SaaS helps teams manage field tasks, expenses, purchase orders, service calls, documents, mobile screens and reports.",
  path: "/fieldops-saas",
});

export default function FieldOpsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[var(--border)]">
        <Image
          alt="FieldOps SaaS dashboard and mobile screens"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/mockups/fieldops-dashboard.png"
        />
        <div className="absolute inset-0 bg-white/82" />
        <div className="site-shell relative grid min-h-[68svh] items-center gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
              FieldOps SaaS
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
              Run field teams, tasks, expenses, purchase orders and service calls from one cloud
              platform.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Replace scattered WhatsApp and Excel tracking with role-based visibility, approval
              flows, documents, notifications, reports and mobile field screens.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#demo" variant="secondary">
                Request FieldOps Demo
              </ButtonLink>
              <ButtonLink href="/get-quote" variant="outline">
                Get Quote
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="site-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
              Problem
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Manual tracking slows approvals and hides field status
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Field teams need a single operating view for work allocation, expenses, purchase
              orders, documents and service calls. FieldOps is designed around that daily pressure.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Manual WhatsApp and Excel tracking",
              "Delayed approvals and scattered documents",
              "No role-based visibility for managers",
              "Slow reporting across teams and sites",
            ].map((item) => (
              <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-4" key={item}>
                <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 text-[var(--brand-green)]" />
                <span className="text-sm leading-6 text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="site-shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">Features</h2>
            <div className="mt-8 grid gap-3">
              {fieldOpsFeatures.map((feature) => (
                <div className="rounded-lg border border-slate-200 bg-white p-4" key={feature}>
                  <p className="text-sm font-medium text-slate-800">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">Industries</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {fieldOpsIndustries.map((industry) => (
                <div className="rounded-lg border border-slate-200 bg-white p-4" key={industry}>
                  <p className="text-sm font-medium text-slate-800">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" id="demo">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
              Demo CTA
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Request a FieldOps demo</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Share your company details and current field workflow. The request is designed to be
              saved in Supabase and emailed to Operion Labs after production credentials are added.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
            <DemoForm />
          </div>
        </div>
      </section>
    </>
  );
}
