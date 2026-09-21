import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { principles } from "@/content/site";

export function PrinciplesSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container-wide space-y-12">
        <SectionHeader
          description="The website, codebase, and future products all share the same operating principles."
          eyebrow="Why Pranav Labs"
          title="Calm interfaces. Serious engineering."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <FadeIn delay={index * 0.04} key={principle.title}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                      <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{principle.title}</CardTitle>
                    <CardDescription>{principle.description}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
