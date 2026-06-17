import { Mail, MessageCircle, Phone } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/content/site";

export function ContactCta() {
  return (
    <section className="bg-[var(--surface-muted)] py-16 sm:py-20">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="Project brief" title="Start with a brief that is actually usable">
            Share the current workflow, required screens, timeline, rough budget and decision
            context. Operion Labs reviews the scope before giving a final quotation.
          </SectionHeading>
          <div className="mt-8 grid gap-3">
            <div className="flex items-start gap-3 text-slate-700">
              <Phone aria-hidden className="h-5 w-5 text-[var(--brand-blue)]" />
              <div className="grid gap-1">
                {siteConfig.phones.map((contact) => (
                  <a className="hover:text-slate-950" href={`tel:${contact.raw}`} key={contact.raw}>
                    {contact.display}
                  </a>
                ))}
              </div>
            </div>
            <a className="flex items-center gap-3 text-slate-700 hover:text-slate-950" href={siteConfig.whatsappUrl}>
              <MessageCircle aria-hidden className="h-5 w-5 text-[var(--brand-blue)]" />
              <span>WhatsApp {siteConfig.phoneDisplay}</span>
            </a>
            <a className="flex items-center gap-3 text-slate-700 hover:text-slate-950" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden className="h-5 w-5 text-[var(--brand-blue)]" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
