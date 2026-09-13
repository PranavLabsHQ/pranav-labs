import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";
import { publicRoadmap } from "@/content/ecosystem";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The public Pranav Labs roadmap across now, next, and future company work.",
};

const roadmapGroups = [
  { title: "Now", items: publicRoadmap.now },
  { title: "Next", items: publicRoadmap.next },
  { title: "Future", items: publicRoadmap.future },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        description="A public view of what Pranav Labs is building, preparing, and exploring. The roadmap stays practical and changes as the company learns."
        eyebrow="Roadmap"
        title="Now, next, and future."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-5 lg:grid-cols-3">
          {roadmapGroups.map((group) => (
            <section
              aria-labelledby={`roadmap-${group.title.toLowerCase()}`}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
              key={group.title}
            >
              <h2
                className="text-2xl font-semibold"
                id={`roadmap-${group.title.toLowerCase()}`}
              >
                {group.title}
              </h2>
              <ul className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <li
                    className="rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
