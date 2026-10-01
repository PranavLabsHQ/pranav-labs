import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getWhatsAppHref } from "@/lib/contact";

export function CtaSection() {
  const whatsAppHref = getWhatsAppHref();

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container-wide">
        <div className="rounded-xl border border-border bg-foreground px-6 py-12 text-background shadow-sm md:px-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-medium text-background/70">
                Build with Pranav Labs
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-[-0.02em] md:text-5xl">
                Have a software problem worth solving?
              </h2>
              <p className="text-base leading-7 text-background/70 md:text-lg">
                Share the workflow, system, or product you want to build. We
                will help shape it into a clear, maintainable software plan.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href={whatsAppHref} rel="noreferrer" target="_blank">
                Contact Us
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
