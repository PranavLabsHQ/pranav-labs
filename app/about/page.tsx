import Link from "next/link";
import { ArrowRight, Building2, Layers3, PackageCheck } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { processSteps } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

const companyStages = [
  {
    title: "Engineering studio",
    description: "Solve real operating problems through focused software work.",
    icon: Building2,
  },
  {
    title: "Reusable systems",
    description: "Turn repeated patterns into dependable internal platforms and tools.",
    icon: Layers3,
  },
  {
    title: "Product company",
    description: "Build software products that create value beyond a single engagement.",
    icon: PackageCheck,
  },
];

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about the mission, engineering philosophy, and long-term direction behind Pranav Labs.",
  path: "/about",
  keywords: ["Pranav Labs mission", "engineering philosophy"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="Pranav Labs is an engineering-first software company focused on practical AI, automation, developer tools, and modern business software."
        eyebrow="About"
        title="A software company built around trust, clarity, and execution."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-6">
            <Badge variant="outline">Mission</Badge>
            <h2 className="text-balance text-3xl font-bold tracking-normal md:text-5xl">
              Build software that earns trust.
            </h2>
            <div className="space-y-5 text-base leading-7 text-muted-foreground md:text-lg">
              <p>
              The mission is simple: build intelligent software that helps
              people and businesses work better through engineering, AI, and
              automation.
              </p>
              <p>
              The company starts as an engineering studio and grows toward a
              product company. Services fund product development. Products
              create long-term value.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/work">
                See our work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Card className="self-start">
            <CardHeader>
              <CardTitle>Long-term direction</CardTitle>
              <CardDescription>
                A deliberate path from delivery work to reusable software.
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 md:px-7 md:pb-7">
              {companyStages.map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <div key={stage.title}>
                    {index > 0 ? <Separator className="my-5" /> : null}
                    <div className="grid grid-cols-[2.5rem_1fr] gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{stage.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          </div>
      </section>
      <PrinciplesSection />
      <section className="border-y border-border bg-card/50 py-20 md:py-32">
        <div className="container-wide space-y-10">
          <div className="max-w-3xl space-y-5">
            <Badge variant="outline">Operating method</Badge>
            <h2 className="text-3xl font-bold tracking-normal md:text-5xl">
              How we work
            </h2>
            <p className="text-base leading-7 text-muted-foreground md:text-lg">
              Each stage reduces uncertainty before the next one adds cost.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Card className="h-full bg-background" key={step.title}>
                <CardHeader>
                  <Badge className="mb-3 w-fit" variant="secondary">
                    0{index + 1}
                  </Badge>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
