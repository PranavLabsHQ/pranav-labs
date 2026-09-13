import { PageHero } from "@/components/shared/PageHero";
import { changelogEntries } from "@/content/ecosystem";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Changelog",
  description:
    "Product, website, open-source, and company updates from Pranav Labs.",
  path: "/changelog",
  keywords: ["Pranav Labs changelog", "software updates"],
});

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        description="A clear record of meaningful changes across the Pranav Labs website, products, tooling, and public infrastructure."
        eyebrow="Changelog"
        title="A public record of progress."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide max-w-4xl space-y-5">
          {changelogEntries.map((entry) => (
            <article
              className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8"
              key={entry.version}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-primary">
                    {entry.version}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">{entry.title}</h2>
                </div>
                <time className="text-sm text-muted-foreground" dateTime={entry.date}>
                  {entry.date}
                </time>
              </div>
              <ul className="mt-6 grid gap-3">
                {entry.items.map((item) => (
                  <li className="text-sm leading-6 text-muted-foreground" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
