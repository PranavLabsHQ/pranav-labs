import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BackgroundLines } from "@/components/ui/background-lines";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { getWhatsAppHref } from "@/lib/contact";

export function HeroSection() {
  const whatsAppHref = getWhatsAppHref();

  return (
    <BackgroundLines
      className="relative flex h-auto min-h-[42rem] items-center justify-center overflow-hidden bg-white px-5 pb-16 pt-28 md:min-h-[calc(100svh-2rem)] md:px-8 md:pb-20 md:pt-32"
      svgOptions={{ duration: 18 }}
    >
      <HeroHighlight
        className="mx-auto w-full max-w-5xl"
        containerClassName="h-auto min-h-0 bg-transparent dark:bg-transparent"
      >
        <div className="flex flex-col items-center gap-7 text-center">
          <h1 className="text-balance text-5xl font-semibold leading-[1.08] text-neutral-950 md:text-7xl lg:text-8xl">
            Software built around your <Highlight>business.</Highlight>
          </h1>
          <p className="text-balance max-w-3xl text-base leading-7 text-neutral-600 md:text-xl md:leading-8">
            From customer-facing websites to AI and automation, we build reliable
            systems that turn business needs into working software.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
            <Link
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#0047FF] px-6 text-sm font-semibold text-white shadow-lg shadow-[#0047FF]/15 transition-colors hover:bg-[#0039cc] sm:w-auto"
              href={whatsAppHref}
              rel="noreferrer"
              target="_blank"
            >
              Start a Project
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex h-12 w-full items-center justify-center rounded-md border border-[#0047FF]/25 bg-white/80 px-6 text-sm font-semibold text-[#0047FF] backdrop-blur-sm transition-colors hover:bg-[#0047FF]/5 sm:w-auto"
              href="/work"
            >
              Explore Work
            </Link>
          </div>
        </div>
      </HeroHighlight>
    </BackgroundLines>
  );
}
