import { CaseStudiesPreview } from "@/components/sections/case-studies-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import { FieldOpsHighlight } from "@/components/sections/fieldops-highlight";
import { Hero } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process-section";
import { ProductsPreview } from "@/components/sections/products-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TrustSection } from "@/components/sections/trust-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FieldOpsHighlight />
      <ProductsPreview />
      <TrustSection />
      <ProcessSection />
      <CaseStudiesPreview />
      <ContactCta />
    </>
  );
}
