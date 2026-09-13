import { Mail, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/content/site";
import { getWhatsAppHref } from "@/lib/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Pranav Labs to discuss AI products, automation systems, developer tools, and business software.",
  path: "/contact",
  keywords: ["contact Pranav Labs", "software project inquiry"],
});

export default function ContactPage() {
  const whatsAppHref = getWhatsAppHref();

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
            <a
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
              href={whatsAppHref}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
