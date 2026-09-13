import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { SystemDiagram } from "@/components/shared/SystemDiagram";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proofPoints = [
  "AI products",
  "Automation systems",
  "Developer tools",
  "Business software",
];

export function HeroSection() {
  return (
    <section className="aurora-surface relative overflow-hidden">
      <div className="absolute inset-0 subtle-grid opacity-70" />
      <div className="container-wide relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
        <FadeIn className="space-y-8">
          <Badge>Engineering Ideas Into Impact.</Badge>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-bold tracking-normal text-foreground md:text-7xl">
              We build software.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              Pranav Labs builds AI products, automation systems, developer
              tools, and modern applications for teams that need reliable
              software.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a Project
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/work">Explore Work</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {proofPoints.map((item) => (
              <div className="flex items-center gap-3 text-sm" key={item}>
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <SystemDiagram />
        </FadeIn>
      </div>
    </section>
  );
}
