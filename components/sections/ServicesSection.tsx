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
          description="The company focuses on software that creates leverage: tools that reduce work, improve decisions, and make operations more reliable."
          eyebrow="Services"
          title="Software for teams that need systems, not decoration."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeIn delay={index * 0.04} key={service.title}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary">
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
