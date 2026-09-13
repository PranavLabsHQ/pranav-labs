import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Pranav Labs to discuss AI products, automation systems, developer tools, and business software.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        description="Share the product, workflow, or system you want to build. Clear context helps us recommend the right next step."
        eyebrow="Contact"
        title="Start with the problem."
      />
      <section className="bg-background py-20 md:py-32">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold tracking-normal">
              Tell us what needs to work better.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Include the business goal, current workflow, timeline, and what a
              successful version should help people do.
            </p>
            <a
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
              href={`mailto:${siteConfig.email}`}
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {siteConfig.email}
            </a>
          </div>
          <form
            action={`mailto:${siteConfig.email}`}
            className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-sm"
            method="post"
          >
            <label className="grid gap-2 text-sm font-medium">
              Name
              <Input autoComplete="name" name="name" required />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Email
              <Input autoComplete="email" name="email" required type="email" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Project
              <Textarea name="project" required />
            </label>
            <Button className="w-fit" type="submit">
              Send Inquiry
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
