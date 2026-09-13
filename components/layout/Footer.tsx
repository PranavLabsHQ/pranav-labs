import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Separator } from "@/components/ui/separator";
import { navigationItems, siteConfig } from "@/content/site";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "GitHub", href: "https://github.com/ItzPranav61" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Pranav Labs builds AI products, automation systems, developer
              tools, and business software designed to last.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Company</h2>
            <div className="mt-4 grid gap-3">
              {navigationItems.slice(0, 5).map((item) => (
                <Link
                  className="text-sm text-muted-foreground transition-colors visited:text-muted-foreground/80 hover:text-foreground"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Contact</h2>
            <div className="mt-4 grid gap-3">
              <a
                className="text-sm text-muted-foreground transition-colors visited:text-muted-foreground/80 hover:text-foreground"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              {footerLinks.map((item) => (
                <Link
                  className="text-sm text-muted-foreground transition-colors visited:text-muted-foreground/80 hover:text-foreground"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          Copyright {new Date().getFullYear()} Pranav Labs. Built with care in
          India.
        </p>
      </div>
    </footer>
  );
}
