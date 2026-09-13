import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { processSteps } from "@/content/site";

export function ProcessSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container-wide space-y-12">
        <SectionHeader
          description="Every engagement starts with the problem. The process stays small enough to move quickly and structured enough to protect quality."
          eyebrow="Process"
          title="A practical path from idea to shipped software."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <FadeIn delay={index * 0.04} key={step.title}>
              <div className="h-full border-l border-border pl-5">
                <span className="text-sm font-semibold text-primary">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
