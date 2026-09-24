import { PanelsTopLeft, Rocket, Workflow } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    title: "Product",
    description: "User needs, workflows, constraints",
    icon: PanelsTopLeft,
  },
  {
    title: "System",
    description: "Interfaces, data, automation",
    icon: Workflow,
  },
  {
    title: "Delivery",
    description: "Testing, deployment, iteration",
    icon: Rocket,
  },
];

export function ValuePropositionSection() {
  return (
    <section
      aria-labelledby="value-proposition-heading"
      className="bg-white py-20 md:py-28"
    >
      <div className="container-wide flex flex-col gap-10 md:gap-14">
        <h2
          className="text-balance mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight text-neutral-950 md:text-5xl"
          id="value-proposition-heading"
        >
          From problem to reliable software.
        </h2>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                className="brand-card h-full"
                key={step.title}
              >
                <CardHeader className="flex h-full flex-col gap-5 p-7 md:p-8">
                  <Icon aria-hidden="true" className="size-5 text-primary" />
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl text-neutral-950">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-neutral-600">
                      {step.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
