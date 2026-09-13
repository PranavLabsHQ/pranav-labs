import { SectionHeader } from "@/components/shared/SectionHeader";
import { technologyGroups } from "@/content/site";

export function TechnologyStackSection() {
  return (
    <section className="border-y border-border bg-card py-20 md:py-32">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          description="Tools are chosen for maintainability, speed, and long-term value. The stack can evolve; the decision filter stays stable."
          eyebrow="Technology"
          title="A modern stack for reliable software."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {technologyGroups.map((group) => (
            <div
              className="rounded-xl border border-border bg-background p-6 shadow-sm"
              key={group.title}
            >
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
