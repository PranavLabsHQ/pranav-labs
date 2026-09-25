import Link from "next/link";
import { ArrowRight, Building2, Layers3, PackageCheck } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
        title="We build software businesses can rely on."
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
                We start every engagement by solving the real problem in front
                of us, not selling a template. That focus on real outcomes is
                what lets us build software that holds up &mdash; for the
                business we&apos;re working with today, and for every one after
                it.
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
      <section className="border-y border-border bg-card/50 py-20 md:py-32">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-5">
            <Badge variant="outline">Founder</Badge>
            <h2 className="text-3xl font-bold tracking-normal md:text-5xl">
              Started by one engineer who got tired of bad software.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-muted-foreground md:text-lg">
            <p>
              Pranav Labs started as a simple idea: most small businesses
              don&apos;t have a bad product or a bad service &mdash; they have a
              website and systems that don&apos;t reflect either. Customers
              can&apos;t find them, can&apos;t trust them, or can&apos;t book them,
              and that gap costs more than most owners realize.
            </p>
            <p>
              I started building software because I wanted to close that gap
              properly &mdash; not with another templated site, but with systems
              built the way real engineering gets built: understand the problem
              first, then design something that holds up.
            </p>
            <p>
              Pranav Labs is still early. That&apos;s not something to hide
              &mdash; it&apos;s why every project gets full attention, and why the
              bar for what we ship stays high.
            </p>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
