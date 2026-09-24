import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { principles } from "@/content/site";

export function PrinciplesSection() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="border-t border-neutral-100 bg-white py-24 md:py-32"
    >
      <div className="container-wide flex flex-col gap-14 md:gap-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">
            Why Pranav Labs
          </p>
          <h2
            className="text-balance text-3xl font-semibold leading-tight text-neutral-950 md:text-5xl"
            id="principles-heading"
          >
            Calm interfaces. Serious engineering.
          </h2>
          <p className="text-base leading-7 text-neutral-600 md:text-lg">
            The website, codebase, and future products all share the same
            operating principles.
          </p>
        </div>

        <div className="grid auto-rows-fr gap-6 md:grid-cols-3 lg:gap-8">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <Card
                className="principle-card h-full border-neutral-200 bg-white"
                key={principle.title}
              >
                <CardHeader className="flex h-full flex-col items-center gap-5 p-10 text-center md:p-12">
                  <Icon aria-hidden="true" className="principle-icon size-6" />
                  <div className="flex flex-col gap-3">
                    <CardTitle className="text-xl text-neutral-950">
                      {principle.title}
                    </CardTitle>
                    <CardDescription className="mx-auto max-w-sm text-neutral-600">
                      {principle.description}
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
