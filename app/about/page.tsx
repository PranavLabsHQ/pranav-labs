import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { processSteps } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the mission, engineering philosophy, and long-term direction behind Pranav Labs.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="Pranav Labs is an engineering-first software company focused on practical AI, automation, developer tools, and modern business software."
        eyebrow="About"
        title="A software company built around trust, clarity, and execution."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-normal md:text-5xl">
              Build software that earns trust.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-7 text-muted-foreground md:text-lg lg:col-span-2">
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
        </div>
      </section>
      <PrinciplesSection />
      <section className="border-y border-border bg-card py-20 md:py-32">
        <div className="container-wide space-y-10">
          <h2 className="text-3xl font-bold tracking-normal md:text-5xl">
            How we work
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                className="rounded-2xl border border-border bg-background p-6"
                key={step.title}
              >
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
