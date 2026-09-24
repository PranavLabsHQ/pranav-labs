import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getWhatsAppHref } from "@/lib/contact";

export function CtaSection() {
  const whatsAppHref = getWhatsAppHref();

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-[#0047FF] py-24 text-white md:py-28"
    >
      <div className="container-wide grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex max-w-3xl flex-col gap-4">
          <h2
            className="text-balance text-3xl font-semibold leading-tight text-white md:text-5xl"
            id="final-cta-heading"
          >
            Have a software problem worth solving?
          </h2>
          <p className="max-w-2xl text-base leading-7 text-white md:text-lg">
            Share the workflow, system, or product you want to build. We&apos;ll
            help shape it into a clear, maintainable plan.
          </p>
        </div>

        <Button
          asChild
          className="final-cta-button w-fit"
          size="lg"
          variant="secondary"
        >
          <Link
            href={whatsAppHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Start a Project
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
