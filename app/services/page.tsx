import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI products, automation systems, business software, and developer tools from Pranav Labs.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        description="We build practical software systems for teams that need speed, reliability, and maintainable execution."
        eyebrow="Services"
        title="Software services for serious business problems."
      />
      <ServicesSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
