import {
  Bot,
  Boxes,
  BrainCircuit,
  Code2,
  DatabaseZap,
  GitBranch,
  Layers3,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import type { Article, NavigationItem, Project, Service } from "@/types/site";

export const siteConfig = {
  name: "Pranav Labs",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pranav-labs.vercel.app",
  email: "hello.pranavlabs@gmail.com",
  description:
    "Pranav Labs builds AI products, automation systems, developer tools, business software, and future software infrastructure.",
};

export const navigationItems: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "Open Source", href: "/open-source" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    title: "AI Products",
    description:
      "Assistants, copilots, search systems, and AI workflows designed around repeatable work.",
    capabilities: ["AI workflows", "Knowledge systems", "Agent systems"],
    icon: BrainCircuit,
  },
  {
    title: "Automation Systems",
    description:
      "Workflow software for sales, support, documents, and internal operations.",
    capabilities: ["CRM automation", "Document flows", "Operations tooling"],
    icon: Workflow,
  },
  {
    title: "Business Software",
    description:
      "Dashboards, portals, internal tools, and SaaS foundations designed for daily use.",
    capabilities: ["Admin panels", "Client portals", "Reporting systems"],
    icon: ServerCog,
  },
  {
    title: "Developer Tools",
    description:
      "APIs, SDKs, CLIs, and utilities that help engineers ship with confidence.",
    capabilities: ["CLI tools", "APIs", "SDKs"],
    icon: Code2,
  },
];

export const featuredProjects: Project[] = [
  {
    title: "BuildNest",
    type: "Business platform",
    status: "In Development",
    description:
      "A foundation for managing project delivery, client work, and operational systems.",
    stack: ["Next.js", "PostgreSQL", "Automation"],
  },
  {
    title: "Aaspas",
    type: "Modern web application",
    status: "In Progress",
    description:
      "A local-first product direction focused on discovery, clean workflows, and reliable data.",
    stack: ["React", "Maps", "Product UX"],
  },
  {
    title: "Internal AI Systems",
    type: "Automation infrastructure",
    status: "Active Research",
    description:
      "Reusable workflows for research, development, documentation, testing, and delivery.",
    stack: ["OpenAI", "n8n", "TypeScript"],
  },
];

export const technologyGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "Supabase"],
  },
  {
    title: "Automation and AI",
    items: ["OpenAI", "n8n", "Agents", "Workflow systems"],
  },
  {
    title: "Delivery",
    items: ["Vercel", "GitHub", "CI/CD", "Monitoring"],
  },
];

export const processSteps = [
  {
    title: "Understand",
    description:
      "Clarify the problem, users, constraints, success metrics, and the smallest useful version.",
  },
  {
    title: "Architect",
    description:
      "Design the system shape, data flow, interfaces, risks, and deployment path before the build expands.",
  },
  {
    title: "Build",
    description:
      "Ship in focused slices with clean components, accessible UI, and performance kept visible.",
  },
  {
    title: "Improve",
    description:
      "Review, test, document, measure, and refine until the product is reliable enough to trust.",
  },
];

export const principles = [
  {
    title: "Engineering first",
    description: "Strong software comes from architecture, reliability, and careful execution.",
    icon: ShieldCheck,
  },
  {
    title: "Simplicity wins",
    description: "Good systems remove complexity from the people who use and maintain them.",
    icon: Sparkles,
  },
  {
    title: "Built to last",
    description: "Every decision should still make sense when the product grows.",
    icon: Boxes,
  },
];

export const articles: Article[] = [
  {
    title: "Engineering over decoration",
    category: "Design",
    date: "13 September 2026",
    description:
      "How calm interfaces, clear writing, and disciplined systems help software companies build trust.",
  },
  {
    title: "Automation that earns its place",
    category: "Automation",
    date: "13 September 2026",
    description:
      "A practical filter for deciding which business workflows deserve to become software.",
  },
  {
    title: "AI products need product judgment",
    category: "AI",
    date: "13 September 2026",
    description:
      "Useful AI products start with a repeated problem, not a model demo.",
  },
];

export const trustedTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "OpenAI",
  "n8n",
  "Vercel",
  "GitHub",
];

export const roadmapItems = [
  {
    title: "Engineering studio",
    description: "Client software, AI automation, internal tools, and modern applications.",
    icon: Layers3,
  },
  {
    title: "Product studio",
    description: "Reusable SaaS products, developer utilities, and workflow platforms.",
    icon: Rocket,
  },
  {
    title: "Product company",
    description: "Software platforms, APIs, and tools used repeatedly by teams.",
    icon: DatabaseZap,
  },
  {
    title: "Open source",
    description: "Small, useful tools that teach, help, and demonstrate engineering quality.",
    icon: GitBranch,
  },
  {
    title: "AI infrastructure",
    description: "Practical AI systems for research, automation, support, and operations.",
    icon: Bot,
  },
];
