import { KriovyaLogo } from "@/components/branding/kriovya-logo";
import { contactMethods, siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[#10244f] bg-[#06112b] text-white">
      <div className="site-shell grid gap-10 py-12 lg:grid-cols-[1.25fr_0.95fr]">
        <div>
          <KriovyaLogo showTagline theme="dark" />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Built for founders, operators and teams that need cleaner workflows, tighter delivery
            discipline and software that still makes sense after handover.
          </p>
          <p className="mt-5 text-sm text-slate-400">
            Third-party costs such as domain, hosting, database, SMS, WhatsApp, email, payment
            gateway and AI API usage are separate and paid by the client based on actual usage.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
            Contact
          </h2>
          <div className="mt-4 grid gap-3">
            {contactMethods.slice(0, 3).map((method) => (
              <div className="flex items-start gap-3 text-sm text-slate-300" key={method.label}>
                <method.icon aria-hidden className="h-4 w-4 text-[var(--brand-green)]" />
                <div className="grid gap-1">
                  {Array.isArray(method.values) ? (
                    method.values.map((item) => (
                      <a className="hover:text-white" href={item.href} key={item.href}>
                        {item.value}
                      </a>
                    ))
                  ) : (
                    <a className="hover:text-white" href={method.href}>
                      {method.value}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}
      </div>
    </footer>
  );
}
