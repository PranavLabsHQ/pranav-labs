import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
              <Card className="h-full">
                <CardHeader>
                  <Badge className="mb-3 w-fit" variant="secondary">
                    0{index + 1}
                  </Badge>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
