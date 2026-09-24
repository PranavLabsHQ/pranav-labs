"use client";

import {
  BriefcaseBusiness,
  Code2,
  Contact,
  Home,
  Info,
  Newspaper,
  Package,
  Wrench,
} from "lucide-react";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { getWhatsAppHref } from "@/lib/contact";

export function Navbar() {
  const whatsAppHref = getWhatsAppHref();
  const navItems = [
    { name: "Home", link: "/", icon: <Home aria-hidden="true" className="size-4" /> },
    { name: "About", link: "/about", icon: <Info aria-hidden="true" className="size-4" /> },
    { name: "Services", link: "/services", icon: <Wrench aria-hidden="true" className="size-4" /> },
    { name: "Work", link: "/work", icon: <BriefcaseBusiness aria-hidden="true" className="size-4" /> },
    { name: "Products", link: "/products", icon: <Package aria-hidden="true" className="size-4" /> },
    { name: "Open Source", link: "/open-source", icon: <Code2 aria-hidden="true" className="size-4" /> },
    { name: "Blog", link: "/blog", icon: <Newspaper aria-hidden="true" className="size-4" /> },
    { name: "Contact", link: "/contact", icon: <Contact aria-hidden="true" className="size-4" /> },
  ];

  return (
    <FloatingNav
      brandLabel="Pranav Labs"
      ctaLabel="Start a Project"
      ctaLink={whatsAppHref}
      navItems={navItems}
    />
  );
}
