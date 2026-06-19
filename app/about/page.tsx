import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/page-header";
import { ProcessSection } from "@/components/sections/process-section";
import { TrustSection } from "@/components/sections/trust-section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Kriovya Labs and the secure build process for websites, apps, SaaS and AI software.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Kriovya Labs builds practical software for operations">
        The company focuses on clear scope, secure implementation, working demos, deployment support
        and maintainable client handover.
      </PageHeader>
      <TrustSection />
      <ProcessSection />
    </>
  );
}
