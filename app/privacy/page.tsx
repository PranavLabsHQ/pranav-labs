import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Pranav Labs.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        description="Pranav Labs keeps privacy simple: collect only what is needed, protect it, and avoid unnecessary data retention."
        eyebrow="Privacy"
        title="Privacy policy."
      />
      <section className="bg-background py-20">
        <div className="container-wide max-w-3xl space-y-6 text-base leading-7 text-muted-foreground">
          <p>
            When you contact Pranav Labs, we may receive your name, email
            address, and project details. This information is used to respond to
            your inquiry and evaluate whether the project is a good fit.
          </p>
          <p>
            We do not sell personal information. Future analytics or product
            systems will be added only when they support reliability,
            performance, or user experience.
          </p>
        </div>
      </section>
    </>
  );
}
