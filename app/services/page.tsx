import { Gauge, Handshake, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createPageMetadata } from "@/lib/metadata";

const engagementStandards = [
  {
    title: "Architecture before scale",
    description:
      "We clarify boundaries, data flow, and operational risks before implementation expands.",
    icon: ShieldCheck,
  },
  {
    title: "Visible delivery",
    description:
      "Work ships in reviewable increments with decisions, tradeoffs, and progress kept clear.",
    icon: Gauge,
  },
  {
    title: "Maintainable handoff",
    description:
      "Documentation and practical ownership are part of delivery, not cleanup after launch.",
    icon: Handshake,
  },
];

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "AI products, automation systems, business software, and developer tools from Pranav Labs.",
  path: "/services",
  keywords: ["AI products", "automation systems", "business software"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        description="We build practical software systems for teams that need speed, reliability, and maintainable execution."
        eyebrow="Services"
        title="Software services for serious business problems."
      />
      <ServicesSection />
      <section className="border-y border-border bg-card/50 py-20 md:py-32">
        <div className="container-wide space-y-12">
          <SectionHeader
            description="The goal is not just to ship. The system should remain understandable, operable, and useful after launch."
            eyebrow="Delivery standard"
            title="What every engagement includes."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {engagementStandards.map((standard) => {
              const Icon = standard.icon;

              return (
                <Card className="h-full bg-background" key={standard.title}>
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                      <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{standard.title}</CardTitle>
                    <CardDescription>{standard.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
