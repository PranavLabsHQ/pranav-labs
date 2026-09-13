"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/content/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/88 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="container-wide flex h-[4.5rem] items-center justify-between"
      >
        <Logo />
        <div className="hidden items-center gap-0.5 lg:flex">
          {navigationItems.map((item) => (
            <Link
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2.5 lg:flex">
          <ThemeToggle />
          <Button asChild>
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((current) => !current)}
            size="icon"
            type="button"
            variant="ghost"
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>
      {isOpen ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-wide grid gap-2 py-4">
            {navigationItems.map((item) => (
              <Link
                className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Start a Project
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
