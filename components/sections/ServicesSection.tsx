import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { services } from "@/content/site";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="border-t border-neutral-100 bg-white py-20 md:py-28"
    >
      <div className="container-wide flex flex-col gap-10 md:gap-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <h2
            className="text-balance text-3xl font-semibold leading-tight text-neutral-950 md:text-5xl"
            id="services-heading"
          >
            Software for teams that need reliable systems.
          </h2>
          <p className="text-base leading-7 text-neutral-600 md:text-lg">
            Systems that reduce manual effort, improve visibility, and remain
            maintainable as your business grows.
          </p>
        </div>

        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                className="brand-card flex h-full flex-col"
                key={service.title}
              >
                <CardHeader className="flex flex-1 flex-col gap-5 p-7 md:p-8">
                  <Icon aria-hidden="true" className="size-5 text-primary" />
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl text-neutral-950">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="max-w-xl text-neutral-600">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-7 pt-0 md:p-8 md:pt-0">
                  <ul className="flex flex-wrap gap-2">
                    {service.capabilities.map((capability) => (
                      <li
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600"
                        key={capability}
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
