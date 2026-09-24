import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { navigationItems, siteConfig } from "@/content/site";

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const ecosystemLinks = [
  { label: "GitHub", href: "https://github.com/ItzPranav61" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pranav-sawant-1061a63a5",
  },
];

const footerLinkClassName =
  "w-fit text-sm text-neutral-600 underline-offset-4 visited:text-neutral-600 hover:text-[#0047FF] hover:underline";

export function Footer() {
  return (
    <footer className="bg-white text-neutral-950">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr] lg:gap-16">
          <div className="flex max-w-lg flex-col gap-5">
            <Logo />
            <p className="max-w-md text-sm leading-6 text-neutral-600">
              Pranav Labs builds AI products, automation systems, and business
              software that help serious teams operate better.
            </p>
          </div>

          <nav aria-label="Company links">
            <h2 className="text-xs font-medium uppercase text-neutral-500">
              Company
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navigationItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClassName} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact and legal links">
            <h2 className="text-xs font-medium uppercase text-neutral-500">
              Contact / Legal
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  className={footerLinkClassName}
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </li>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link className={footerLinkClassName} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ecosystem links">
            <h2 className="text-xs font-medium uppercase text-neutral-500">
              Ecosystem
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {ecosystemLinks.map((item) => (
                <li key={item.href}>
                  <a
                    className={footerLinkClassName}
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-divider mt-12 border-t pt-6 md:mt-16">
          <p className="text-xs leading-5 text-neutral-500">
            Copyright 2026 Pranav Labs. Built with care in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
