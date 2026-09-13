import { FadeIn } from "@/components/shared/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
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
    <section className="bg-background py-20 md:py-32">
      <div className="container-wide space-y-12">
        <SectionHeader
          description="The work is focused on systems that reduce manual effort, improve visibility, and stay maintainable as teams grow."
          eyebrow="Services"
          title="Software for teams that need reliable systems."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeIn delay={index * 0.04} key={service.title}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                      <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2">
                      {service.capabilities.map((capability) => (
                        <li
                          className="text-sm text-muted-foreground"
                          key={capability}
                        >
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
