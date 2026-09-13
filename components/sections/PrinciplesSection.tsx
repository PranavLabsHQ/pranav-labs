import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
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
                <div className="h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
                  <Icon aria-hidden="true" className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 text-xl font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
