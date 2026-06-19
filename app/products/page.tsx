import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/page-header";
import { productIcons, products } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Kriovya Labs product demos and prototypes including FieldOps SaaS, School Management, AI Site Supervisor and Local Maid/Helper platform.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="Products" title="Product demos and prototypes from Kriovya Labs">
        No fake client logos or exaggerated claims. These products are labeled honestly as available
        demos, prototypes or internal product demos.
      </PageHeader>
      <section className="bg-white py-16 sm:py-20">
        <div className="site-shell grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => {
            const Icon = productIcons[index % productIcons.length];

            return (
              <article className="h-full rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm" key={product.name}>
                <Icon aria-hidden className="h-7 w-7 text-[var(--brand-blue)]" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  {product.status}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">{product.name}</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">{product.summary}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
