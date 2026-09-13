import type { Metadata } from "next";

import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the Pranav Labs website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        description="These terms cover general use of the Pranav Labs website. Project-specific work is governed by a separate agreement."
        eyebrow="Terms"
        title="Website terms."
      />
      <section className="bg-background py-20">
        <div className="container-wide max-w-3xl space-y-6 text-base leading-7 text-muted-foreground">
          <p>
            The content on this website is provided for general information
            about Pranav Labs, its services, and its product direction.
          </p>
          <p>
            Do not misuse the website, attempt to disrupt access, or represent
            Pranav Labs content as your own. Client work, product use, and
            support terms are handled through separate written agreements.
          </p>
        </div>
      </section>
    </>
  );
}
