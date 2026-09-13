import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechnologyStackSection } from "@/components/sections/TechnologyStackSection";
import { TrustedTechnologies } from "@/components/sections/TrustedTechnologies";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedTechnologies />
      <ServicesSection />
      <FeaturedProjectsSection />
      <PrinciplesSection />
      <ProcessSection />
      <TechnologyStackSection />
      <CtaSection />
    </>
  );
}
