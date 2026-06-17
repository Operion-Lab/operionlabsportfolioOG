import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { contactMethods } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Operion Labs by phone, WhatsApp, email or contact form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact Operion Labs">
        Use the form for a general message, or call, WhatsApp and email directly for project
        discussions.
      </PageHeader>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid content-start gap-4">
            {contactMethods.map((method) => (
              <div
                className="rounded-lg border border-[var(--border)] p-5 transition hover:border-[var(--brand-blue)]"
                key={method.label}
              >
                <method.icon aria-hidden className="h-5 w-5 text-[var(--brand-blue)]" />
                <p className="mt-4 text-sm font-semibold text-slate-950">{method.label}</p>
                <div className="mt-1 grid gap-1 text-sm text-slate-600">
                  {Array.isArray(method.values) ? (
                    method.values.map((item) => (
                      <a className="hover:text-[var(--brand-blue)]" href={item.href} key={item.href}>
                        {item.value}
                      </a>
                    ))
                  ) : (
                    <a className="hover:text-[var(--brand-blue)]" href={method.href}>
                      {method.value}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
