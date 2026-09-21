import { Mail, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
        <div className="container-wide grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <Card className="h-fit">
            <CardHeader>
              <Badge className="mb-3 w-fit" variant="secondary">
                Project inquiry
              </Badge>
              <CardTitle className="text-2xl">
                Tell us what needs to work better.
              </CardTitle>
              <CardDescription>
                Include the business goal, current workflow, timeline, and what
                a successful version should help people do.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />
              <div className="grid gap-3">
                <Button asChild className="justify-start" variant="secondary">
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </Button>
                <Button asChild className="justify-start" variant="secondary">
                  <a href={whatsAppHref} rel="noreferrer" target="_blank">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    Message on WhatsApp
                  </a>
                </Button>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Useful context</p>
                <ul className="grid gap-2">
                  <li>What people do today</li>
                  <li>Where the workflow breaks down</li>
                  <li>What a successful first release should achieve</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
