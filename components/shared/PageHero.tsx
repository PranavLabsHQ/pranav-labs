import { Badge } from "@/components/ui/badge";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="aurora-surface border-b border-border py-20 md:py-28">
      <div className="container-wide max-w-4xl space-y-6">
        <Badge variant="outline">{eyebrow}</Badge>
        <h1 className="text-4xl font-bold tracking-normal md:text-6xl">
          {title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground md:text-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
