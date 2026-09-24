"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  brandLabel = "Pranav Labs",
  brandLink = "/",
  ctaLabel = "Start a Project",
  ctaLink = "/contact",
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  brandLabel?: string;
  brandLink?: string;
  ctaLabel?: string;
  ctaLink?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        aria-label="Main navigation"
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        role="navigation"
        className={cn(
          "fixed inset-x-0 top-4 z-[5000] mx-auto flex w-[calc(100%-1rem)] max-w-[76rem] items-center justify-center sm:w-[calc(100%-2rem)]",
          className
        )}
      >
        <div className="flex w-full items-center justify-between gap-1 rounded-xl border border-[#0047FF]/15 bg-white/95 p-1.5 shadow-lg shadow-[#0047FF]/10 backdrop-blur-md xl:rounded-full">
          <a
            className="hidden shrink-0 px-3 text-sm font-semibold text-[#0047FF] sm:block"
            href={brandLink}
          >
            {brandLabel}
          </a>

          {/* Nav items container */}
          <div className="flex flex-1 items-center justify-center gap-0.5">
            {navItems.map((navItem, idx: number) => (
              <a
                aria-label={navItem.name}
                key={`link-${idx}`}
                href={navItem.link}
                title={navItem.name}
                className={cn(
                  "relative flex min-w-0 items-center gap-1 rounded-full px-1.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-[#0047FF]/5 hover:text-[#0047FF] xl:px-3"
                )}
              >
                <span className="block xl:hidden">{navItem.icon}</span>
                <span className="hidden xl:block">{navItem.name}</span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-5 w-px shrink-0 bg-[#0047FF]/15" />

          {/* CTA Button */}
          <a
            aria-label={ctaLabel}
            className="relative shrink-0 rounded-lg bg-[#0047FF] px-2.5 py-2 text-sm font-medium text-white transition-all hover:bg-[#0039cc] hover:shadow-lg hover:shadow-[#0047FF]/20 md:px-4 xl:rounded-full"
            href={ctaLink}
          >
            <span className="hidden md:inline">{ctaLabel}</span>
            <span className="md:hidden">Start</span>
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
