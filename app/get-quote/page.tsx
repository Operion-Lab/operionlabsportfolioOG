import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { PageHeader } from "@/components/sections/page-header";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Get Quote",
  description:
    "Request a website, app, SaaS, AI chatbot or custom software quote from Operion Labs.",
  path: "/get-quote",
});

export default function GetQuotePage() {
  return (
    <>
      <PageHeader eyebrow="Get quote" title="Share your project requirements">
        Include your business name, project type, timeline, rough budget and required features.
        Operion Labs reviews the scope before sharing a final quotation.
      </PageHeader>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-shell">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm sm:p-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
