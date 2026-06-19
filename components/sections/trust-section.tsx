import { SectionHeading } from "@/components/ui/section-heading";
import { trustBlocks } from "@/content/site";

export function TrustSection() {
  return (
    <section className="bg-[#06112b] py-16 text-white sm:py-20">
      <div className="site-shell">
        <SectionHeading
          align="center"
          eyebrow="Why Kriovya Labs"
          theme="dark"
          title="A disciplined build process"
        >
          Clients see scope, security, progress, deployment and maintenance as one connected
          delivery system.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {trustBlocks.map((item) => (
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5" key={item.title}>
              <item.icon aria-hidden className="h-6 w-6 text-[var(--brand-green)]" />
              <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
