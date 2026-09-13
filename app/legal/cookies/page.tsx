import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Cookie and analytics information for the Pranav Labs website.",
};

const sections = [
  {
    title: "Current use",
    body: "The website is designed to be simple and privacy-conscious. It may use basic analytics to understand aggregate traffic and improve performance.",
  },
  {
    title: "Future products",
    body: "Future Pranav Labs products may use cookies for authentication, security, preferences, and session continuity. Product-specific notices will explain those uses.",
  },
  {
    title: "Control",
    body: "You can control cookies through your browser settings. Some future product features may require essential cookies to work correctly.",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero
        description="How cookies and privacy-conscious analytics may be used across Pranav Labs surfaces."
        eyebrow="Legal"
        title="Cookies"
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide max-w-3xl space-y-8">
          {sections.map((section) => (
            <section className="space-y-3" key={section.title}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="text-base leading-8 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
