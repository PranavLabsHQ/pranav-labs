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
    <section
      aria-labelledby="process-heading"
      className="border-t border-neutral-100 bg-neutral-50 py-24 md:py-32"
    >
      <div className="container-wide flex flex-col gap-14 md:gap-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">Process</p>
          <h2
            className="text-balance text-3xl font-semibold leading-tight text-neutral-950 md:text-5xl"
            id="process-heading"
          >
            A practical path from idea to shipped software.
          </h2>
          <p className="text-base leading-7 text-neutral-600 md:text-lg">
            Every engagement starts with the problem. The process stays small
            enough to move quickly and structured enough to protect quality.
          </p>
        </div>

        <div className="process-grid grid auto-rows-fr gap-6 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <Card
              className="process-step-card h-full border-neutral-200 bg-white"
              key={step.title}
            >
              <CardHeader className="flex h-full flex-col items-start gap-5 p-8">
                <Badge
                  className="process-number-badge"
                  variant="outline"
                >
                  0{index + 1}
                </Badge>
                <div className="flex flex-col gap-3">
                  <CardTitle className="text-xl text-neutral-950">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-neutral-600">
                    {step.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
