import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  BookOpen,
  Braces,
  Building2,
  Cable,
  CheckCircle2,
  CircleDot,
  Code2,
  Compass,
  FileText,
  GitBranch,
  Globe2,
  Layers3,
  LayoutDashboard,
  Library,
  Lock,
  Map,
  Package,
  PenTool,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

export type BlogCategory =
  | "Engineering"
  | "AI"
  | "Product"
  | "Automation"
  | "Open Source"
  | "Architecture";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  readingTime: string;
  body: string[];
};

export type OpenSourceProject = {
  name: string;
  slug: string;
  status: "Planned" | "Research" | "Designing" | "Building";
  description: string;
  githubHref: string;
  docsHref: string;
  icon: LucideIcon;
};

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  status: string;
  features: string[];
  screenshots: string[];
  roadmap: string[];
  changelog: string[];
  faq: { question: string; answer: string }[];
};

export type DocSection = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  sections: { title: string; body: string[] }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  status: string;
  stack: string[];
  steps: { label: string; title: string; body: string }[];
};

export const blogCategories: BlogCategory[] = [
  "Engineering",
  "AI",
  "Product",
  "Automation",
  "Open Source",
  "Architecture",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "software-that-can-be-operated",
    title: "Software that can be operated",
    description:
      "A practical standard for building systems that stay understandable after launch.",
    category: "Engineering",
    tags: ["reliability", "delivery", "operations"],
    date: "2026-09-13",
    readingTime: "4 min read",
    body: [
      "A product is not finished when the interface works. It is ready when the system can be deployed, monitored, changed, and explained without drama.",
      "The early Pranav Labs standard is simple: prefer boring infrastructure, clear ownership, typed boundaries, accessible interfaces, and documentation that helps the next engineer move faster.",
      "That standard keeps the company honest. It gives product work a memory, and it makes quality visible before a system becomes large.",
    ],
  },
  {
    slug: "ai-products-need-product-judgment",
    title: "AI products need product judgment",
    description:
      "Useful AI systems start with repeated work, clear evaluation, and human control.",
    category: "AI",
    tags: ["agents", "evaluation", "workflow"],
    date: "2026-09-13",
    readingTime: "5 min read",
    body: [
      "AI does not remove the need for product judgment. It raises the cost of unclear workflows because vague systems are harder to evaluate.",
      "The right starting point is a repeated job: research a domain, classify an input, prepare a document, route a request, summarize context, or support a decision.",
      "The product layer should define success, failure, review points, escalation, and traceability before the model layer expands.",
    ],
  },
  {
    slug: "automation-that-earns-its-place",
    title: "Automation that earns its place",
    description:
      "A filter for deciding which manual workflows should become software.",
    category: "Automation",
    tags: ["workflow", "business systems", "process"],
    date: "2026-09-13",
    readingTime: "3 min read",
    body: [
      "Good automation removes repeated effort without hiding how work happens. Bad automation moves confusion into code.",
      "Before building, define the trigger, owner, data source, success state, fallback path, and audit trail. If those are unclear, the workflow is not ready.",
      "A small automation that is trusted and maintained is more valuable than a large one nobody wants to touch.",
    ],
  },
];

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "PL UI",
    slug: "pl-ui",
    status: "Designing",
    description:
      "A small set of accessible interface primitives for Pranav Labs products.",
    githubHref: "https://github.com/PranavLabsHQ/pl-ui",
    docsHref: "/docs/open-source",
    icon: Blocks,
  },
  {
    name: "PL Icons",
    slug: "pl-icons",
    status: "Planned",
    description:
      "A focused icon set for engineering, automation, and product interfaces.",
    githubHref: "https://github.com/PranavLabsHQ/pl-icons",
    docsHref: "/docs/open-source",
    icon: Sparkles,
  },
  {
    name: "PL CLI",
    slug: "pl-cli",
    status: "Research",
    description:
      "Command-line utilities for scaffolding, checks, release notes, and project hygiene.",
    githubHref: "https://github.com/PranavLabsHQ/pl-cli",
    docsHref: "/docs/open-source",
    icon: TerminalSquare,
  },
  {
    name: "Starter Kit",
    slug: "starter-kit",
    status: "Planned",
    description:
      "A production-ready Next.js starter shaped around accessibility, SEO, and clean delivery.",
    githubHref: "https://github.com/PranavLabsHQ/starter-kit",
    docsHref: "/docs/open-source",
    icon: Package,
  },
  {
    name: "SaaS Boilerplate",
    slug: "saas-boilerplate",
    status: "Planned",
    description:
      "A future product foundation for auth, billing, dashboards, teams, and audit logs.",
    githubHref: "https://github.com/PranavLabsHQ/saas-boilerplate",
    docsHref: "/docs/open-source",
    icon: Building2,
  },
];

export const products: Product[] = [
  {
    slug: "buildnest",
    name: "BuildNest",
    eyebrow: "Business platform",
    description:
      "A delivery operating system for project work, clients, documents, automations, and internal visibility.",
    status: "In development",
    features: [
      "Project and client workspaces",
      "Task, document, and status workflows",
      "Automation hooks for repeatable delivery",
      "Operational dashboards for founders and teams",
    ],
    screenshots: [
      "Delivery command center",
      "Client workspace",
      "Automation activity",
    ],
    roadmap: [
      "Define delivery data model",
      "Ship project workspace prototype",
      "Add client reporting and automation events",
    ],
    changelog: [
      "Product scope defined around delivery operations.",
      "Initial page architecture prepared for launch materials.",
    ],
    faq: [
      {
        question: "Who is BuildNest for?",
        answer:
          "Small teams and software studios that need a clearer operating layer for delivery work.",
      },
      {
        question: "Is BuildNest available today?",
        answer:
          "Not yet. The public page is ready for product updates while the system is being designed.",
      },
    ],
  },
  {
    slug: "aaspas",
    name: "Aaspas",
    eyebrow: "Local discovery product",
    description:
      "A local-first product direction for discovery, places, workflows, and reliable structured data.",
    status: "Research",
    features: [
      "Location-aware discovery flows",
      "Clean place and listing interfaces",
      "Structured data foundation",
      "Operational tools for content quality",
    ],
    screenshots: ["Map exploration", "Place profile", "Moderation workflow"],
    roadmap: [
      "Validate discovery use cases",
      "Design place data model",
      "Prototype search and map interactions",
    ],
    changelog: [
      "Research scope defined around local discovery.",
      "Product route prepared for public roadmap updates.",
    ],
    faq: [
      {
        question: "What does Aaspas mean?",
        answer:
          "Aaspas is a product direction around what is nearby: places, services, and local context.",
      },
      {
        question: "Is Aaspas a client project?",
        answer:
          "No. It is prepared as an internal Pranav Labs product direction.",
      },
    ],
  },
];

export const docsSections: DocSection[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description: "How Pranav Labs thinks about software, company building, and public work.",
    icon: BookOpen,
    sections: [
      {
        title: "Purpose",
        body: [
          "Pranav Labs exists to build reliable software systems: AI products, automation, developer tools, business software, and future infrastructure.",
          "The company standard is clear writing, strong engineering, restrained design, and software that can be operated after launch.",
        ],
      },
    ],
  },
  {
    slug: "brand",
    title: "Brand",
    description: "Logo, color, tone, spacing, and identity rules for public surfaces.",
    icon: PenTool,
    sections: [
      {
        title: "Identity",
        body: [
          "The Pranav Labs mark is the official brand symbol. It should keep clear space, avoid decoration, and appear with calm confidence.",
          "The voice is direct and technical. Prefer specific engineering language over inflated claims.",
        ],
      },
    ],
  },
  {
    slug: "engineering",
    title: "Engineering",
    description: "Technical standards for maintainable, accessible, production-ready software.",
    icon: Code2,
    sections: [
      {
        title: "Operating standard",
        body: [
          "Every system should have typed boundaries, observable behavior, clear failure modes, and documentation close to the code.",
          "Prefer simple architecture that can survive growth over clever abstractions that only work while the project is small.",
        ],
      },
    ],
  },
  {
    slug: "products",
    title: "Products",
    description: "How Pranav Labs defines, evaluates, and ships product directions.",
    icon: LayoutDashboard,
    sections: [
      {
        title: "Product filter",
        body: [
          "A product direction must solve repeated work, have a clear user, and support a durable business or operational need.",
          "BuildNest and Aaspas are prepared as early public product tracks.",
        ],
      },
    ],
  },
  {
    slug: "apis",
    title: "APIs",
    description: "Future-ready conventions for APIs, SDKs, versioning, and integration surfaces.",
    icon: Cable,
    sections: [
      {
        title: "Future surface",
        body: [
          "Public APIs should be versioned, documented, observable, and designed around stable resources.",
          "SDKs and examples should follow the same release notes and changelog discipline as product UI.",
        ],
      },
    ],
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Editorial architecture, categories, tags, search, RSS, and MDX source structure.",
    icon: FileText,
    sections: [
      {
        title: "Publishing model",
        body: [
          "The engineering blog uses categories, tags, canonical URLs, RSS, and MDX-ready source files.",
          "Posts should teach a decision, pattern, failure mode, or product lesson.",
        ],
      },
    ],
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "Repository structure, route ownership, content models, and quality gates.",
    icon: Layers3,
    sections: [
      {
        title: "System shape",
        body: [
          "The app uses Next.js App Router, typed content modules, reusable sections, shadcn-compatible primitives, and static metadata routes.",
          "Content models live in content/ so public pages, RSS, sitemap, and future docs tooling share one source.",
        ],
      },
    ],
  },
  {
    slug: "contributing",
    title: "Contributing",
    description: "How future contributors should propose, build, verify, and document changes.",
    icon: GitBranch,
    sections: [
      {
        title: "Contribution rule",
        body: [
          "Every change should explain the user problem, keep the visual system consistent, pass typecheck, pass lint, and build successfully.",
          "New components should reuse existing primitives unless the product need clearly requires a new abstraction.",
        ],
      },
    ],
  },
  {
    slug: "open-source",
    title: "Open Source",
    description: "Standards for public packages, documentation, maintenance, and releases.",
    icon: Braces,
    sections: [
      {
        title: "Publishing standard",
        body: [
          "A Pranav Labs open-source project should solve one clear problem, include setup instructions, document trade-offs, and have a maintenance path.",
          "A project should not be promoted until examples, accessibility notes, release notes, and ownership are clear.",
        ],
      },
    ],
  },
];

export const publicRoadmap = {
  now: [
    "Company website and content system",
    "Product pages for BuildNest and Aaspas",
    "Docs, blog, changelog, and roadmap foundations",
  ],
  next: [
    "First open-source package specifications",
    "BuildNest prototype architecture",
    "Engineering blog publishing workflow",
  ],
  future: [
    "Public API standards and SDK conventions",
    "Reusable product starter kit",
    "Case studies with measurable delivery outcomes",
  ],
};

export const changelogEntries = [
  {
    version: "2026.09",
    title: "Company ecosystem foundation",
    date: "2026-09-13",
    items: [
      "Added docs, roadmap, changelog, legal, product, blog, and open-source systems.",
      "Prepared BuildNest and Aaspas public product routes.",
      "Added RSS, structured content models, and expanded sitemap coverage.",
    ],
  },
  {
    version: "2026.09.1",
    title: "Brand and interaction polish",
    date: "2026-09-13",
    items: [
      "Refined navigation behavior, focus states, and reduced-motion support.",
      "Aligned form controls and buttons with the Pranav Labs design system.",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "delivery-operating-system",
    title: "Delivery operating system foundation",
    summary:
      "A reusable structure for moving from unclear client work to visible, maintainable delivery systems.",
    status: "Internal system",
    stack: ["Next.js", "TypeScript", "Automation", "PostgreSQL"],
    steps: [
      {
        label: "Challenge",
        title: "Project work loses clarity as it scales",
        body: "Teams need one place to understand clients, tasks, documents, decisions, and delivery state.",
      },
      {
        label: "Research",
        title: "Map the repeated workflows",
        body: "The system starts with recurring questions: what is blocked, what changed, what ships next, and who owns it.",
      },
      {
        label: "Architecture",
        title: "Separate product state from activity",
        body: "Core records stay stable while events, notes, automations, and reports build around them.",
      },
      {
        label: "Engineering",
        title: "Ship in visible slices",
        body: "Each slice should be usable, testable, documented, and ready for future automation.",
      },
      {
        label: "Results",
        title: "Clearer operations",
        body: "The expected result is less status chasing, better handoffs, and a stronger basis for client reporting.",
      },
      {
        label: "Lessons",
        title: "Reliability starts in the workflow",
        body: "The interface can stay simple when the workflow, data model, and ownership are clear.",
      },
    ],
  },
];

export const legalPages = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Pranav Labs handles contact information, analytics, and future product data.",
    icon: Lock,
  },
  {
    slug: "terms",
    title: "Terms",
    description:
      "Basic terms for using the Pranav Labs website and future public materials.",
    icon: ScrollText,
  },
  {
    slug: "cookies",
    title: "Cookies",
    description:
      "How cookies and privacy-conscious analytics may be used across Pranav Labs surfaces.",
    icon: ShieldCheck,
  },
];

export const ecosystemCards = [
  { title: "Docs", href: "/docs", icon: Library },
  { title: "Roadmap", href: "/roadmap", icon: Map },
  { title: "Changelog", href: "/changelog", icon: CircleDot },
  { title: "RSS", href: "/rss.xml", icon: Globe2 },
  { title: "Search-ready blog", href: "/blog", icon: Search },
  { title: "Case studies", href: "/work/case-studies", icon: Compass },
  { title: "Open source", href: "/open-source", icon: Braces },
  { title: "Legal", href: "/legal", icon: CheckCircle2 },
];
