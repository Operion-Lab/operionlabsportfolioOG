import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { productIcons, products } from "@/content/site";

export function ProductsPreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-shell">
        <SectionHeading eyebrow="Products" title="Product thinking beyond service delivery">
          Kriovya Labs showcases real product directions honestly as demos and prototypes until
          live client proof is available.
        </SectionHeading>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            const Icon = productIcons[index % productIcons.length];

            return (
              <article
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                key={product.name}
              >
                <Icon aria-hidden className="h-6 w-6 text-blue-700" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  {product.status}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{product.summary}</p>
              </article>
            );
          })}
        </div>

        <Link
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-strong)]"
          href="/products"
        >
          View all products <ArrowRight aria-hidden size={16} />
        </Link>
      </div>
    </section>
  );
}
