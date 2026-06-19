import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

import { KriovyaLogo } from "@/components/branding/kriovya-logo";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/button";
import { homeHeroSignals, homeHeroTags, siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--border)]">
      <Image
        alt="FieldOps dashboard and mobile app mockup"
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src="/mockups/fieldops-dashboard.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_26%,rgba(255,255,255,0.72)_58%,rgba(246,249,255,0.24)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[48%] bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.92),rgba(255,255,255,0))]" />

      <div className="site-shell relative grid min-h-[78svh] gap-12 py-20 xl:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] xl:items-center">
        <div className="max-w-3xl">
          <KriovyaLogo className="text-left" markClassName="h-12 w-12" showTagline />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
            {siteConfig.domain}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
            We build websites, mobile apps, SaaS platforms and AI-powered business software.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            This portfolio is designed to show how Kriovya Labs handles scope, secure lead capture,
            workflow software, deployment and post-launch support without inflated claims.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/get-quote" variant="secondary">
              Get Quote <ArrowRight aria-hidden size={18} />
            </ButtonLink>
            <ExternalButtonLink href={siteConfig.whatsappUrl} variant="outline">
              <MessageCircle aria-hidden size={18} /> WhatsApp
            </ExternalButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-sm font-medium text-slate-700">
            {homeHeroTags.map((item) => (
              <span
                className="rounded-md border border-[var(--border)] bg-white/88 px-3 py-2 shadow-[0_10px_30px_rgba(8,21,47,0.05)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:hidden">
            {homeHeroSignals.slice(0, 2).map((item) => (
              <div
                className="rounded-lg border border-[var(--border)] bg-white/84 p-4 shadow-[0_14px_40px_rgba(8,21,47,0.08)]"
                key={item.title}
              >
                <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="rounded-lg border border-white/80 bg-white/76 p-7 shadow-[0_32px_90px_rgba(8,21,47,0.12)] backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
                  Portfolio proof
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  What this site already demonstrates
                </h2>
              </div>
              <span className="rounded-full border border-[var(--border)] bg-[var(--brand-green-soft)] px-3 py-1 text-xs font-semibold text-[#215d1d]">
                Build-ready
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              {homeHeroSignals.map((item, index) => (
                <div
                  className="rounded-lg border border-[var(--border)] bg-white/84 p-4"
                  key={item.title}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-blue-soft)] text-sm font-semibold text-[var(--brand-blue)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-base font-semibold text-slate-950">{item.title}</h2>
                  </div>
                  <p className="mt-3 pl-11 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-[#cfe1ff] bg-[var(--surface-muted)] p-4">
              <p className="text-sm font-semibold text-[var(--brand-ink)]">
                Need a decision-ready quote?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share workflow, timeline and budget range. The quote form is structured to qualify
                the project before a final estimate is sent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
