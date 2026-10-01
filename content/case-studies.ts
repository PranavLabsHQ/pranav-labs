export type DemoStage = "Building first" | "Build next" | "Build later";

export type DemoKind =
  | "Flagship demo"
  | "Website case study"
  | "Supporting demo"
  | "Engineering proof";

export type CaseStudy = {
  slug: string;
  order: string;
  title: string;
  summary: string;
  kind: DemoKind;
  stage: DemoStage;
  featured: boolean;
  liveHref?: string;
  services: string[];
  audience: string;
  problem: string;
  before: string;
  action: string;
  result: string;
  wow: string;
  walkthrough: string[];
  features: string[];
  stack: string[];
  sampleData: string;
  presentation: string;
  outreach: string;
  difficulty: string;
  scope: string;
  cost: string;
  reusability: string;
  excluded: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "trial-to-renewal",
    order: "01",
    title: "Trial-to-Renewal",
    summary:
      "A compact operating system that turns gym enquiries into booked trials, timely follow-ups, and visible renewal risk.",
    kind: "Flagship demo",
    stage: "Building first",
    featured: true,
    liveHref: "/demos/trial-to-renewal",
    services: ["Web apps", "Automation", "Business software", "APIs"],
    audience: "Independent gyms, fitness studios, and owner-led membership businesses.",
    problem:
      "Trial enquiries arrive through forms, calls, and direct messages, then disappear into informal follow-up. Renewals are noticed only after revenue has already slipped.",
    before: "A promising trial lead is sitting in a message thread with no owner or next action.",
    action: "Book the trial, trigger a confirmation, and move the lead through one visible pipeline.",
    result: "The lead is tracked and the revenue at risk from upcoming expiries is actionable.",
    wow: "One screen connects acquisition and retention instead of treating them as separate problems.",
    walkthrough: [
      "Submit a new trial booking as a prospective member.",
      "See the confirmation event and assigned follow-up in the activity log.",
      "Open the operator dashboard and move the lead to trial completed.",
      "Review members expiring this week and the rupee value at risk.",
      "Queue a renewal reminder and inspect the resulting event.",
    ],
    features: [
      "Public trial-booking flow",
      "Lead pipeline with next actions",
      "Confirmation and reminder events",
      "Renewal-risk dashboard",
      "Operator activity log",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "WhatsApp test API", "Razorpay test mode", "Vercel"],
    sampleData:
      "Vortex Athletics: 40 members, 12 upcoming expiries, and 9 trial leads across realistic funnel states.",
    presentation:
      "A guided live flow from booking to renewal dashboard, supported by a 60-second recorded walkthrough and a one-page architecture note.",
    outreach:
      "Best used in outreach to gym owners: lead with missed follow-ups and expiring membership revenue, then share the focused demo link.",
    difficulty: "Medium",
    scope: "7–10 focused build days",
    cost: "Low-cost managed services and test-mode messaging/payment integrations",
    reusability: "High — the same workflow fits studios, academies, clinics, and other recurring-membership businesses.",
    excluded: [
      "Multi-branch administration",
      "Attendance and access control",
      "Trainer scheduling",
      "A full CRM",
      "Production payment processing",
    ],
  },
  {
    slug: "conversion-rebuild",
    order: "02",
    title: "Conversion Rebuild",
    summary:
      "A measured before-and-after website rebuild that shows how speed, message clarity, and conversion paths work together.",
    kind: "Website case study",
    stage: "Building first",
    featured: true,
    liveHref: "/demos/conversion-rebuild",
    services: ["Websites", "Frontend engineering", "Performance", "SEO"],
    audience: "Local service businesses with dated, slow, or unclear marketing sites.",
    problem:
      "A business may have a website but still lose mobile visitors through slow pages, vague positioning, and calls to action that compete with one another.",
    before: "The fictional Vortex Athletics site is slow on mobile and buries its trial offer.",
    action: "Compare the old and rebuilt experiences, then inspect the measured performance evidence.",
    result: "The new version makes the offer, proof, and next step clear without inventing a conversion claim.",
    wow: "A side-by-side comparison makes invisible frontend decisions legible to a non-technical buyer.",
    walkthrough: [
      "Open the old mobile experience and note the delayed hero and competing actions.",
      "Use the comparison control to reveal the rebuilt page.",
      "Follow the simplified path from service proof to trial booking.",
      "Inspect Lighthouse, image weight, and structured-data evidence.",
      "Review the implementation decisions and the claims intentionally not made.",
    ],
    features: [
      "Responsive before-and-after comparison",
      "Performance evidence panel",
      "Focused conversion journey",
      "Local-business structured data",
      "Accessible, responsive UI",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "JSON-LD", "Lighthouse CI", "Vercel"],
    sampleData:
      "A fictional gym brand with controlled old/new builds so every performance number can be reproduced.",
    presentation:
      "An interactive comparison page with a concise performance table and a transparent methodology note.",
    outreach:
      "Send to businesses with an obviously dated site, paired with two specific observations about their current mobile experience.",
    difficulty: "Low to medium",
    scope: "4–6 focused build days",
    cost: "Near-zero infrastructure cost",
    reusability: "High — a repeatable audit-and-rebuild format for many service-business verticals.",
    excluded: [
      "Invented traffic or revenue uplift",
      "A full CMS migration",
      "Paid acquisition campaigns",
      "Broad brand-strategy work",
      "Production analytics history",
    ],
  },
  {
    slug: "field-service-proof-of-work",
    order: "03",
    title: "Field Service Proof-of-Work",
    summary:
      "A dispatcher-to-technician workflow that turns a service visit into structured evidence, client sign-off, and a shareable report.",
    kind: "Flagship demo",
    stage: "Build next",
    featured: true,
    liveHref: "/demos/field-service-proof-of-work",
    services: ["Web apps", "Mobile workflows", "Operations software", "Automation"],
    audience: "AC repair, appliance service, installation, and maintenance teams.",
    problem:
      "Dispatchers often know a job was assigned but cannot quickly prove what happened on-site, what was replaced, or whether the customer accepted the work.",
    before: "A completed job is represented by a phone call and a few photos scattered across chat.",
    action: "Complete a mobile checklist, attach evidence, and capture customer sign-off.",
    result: "The office receives a structured proof report and can monitor callbacks and service-level risk.",
    wow: "The final client-ready report is assembled directly from the technician’s field actions.",
    walkthrough: [
      "Assign a service job from the dispatcher board.",
      "Open the technician view and complete the visit checklist.",
      "Add before-and-after evidence and record the work performed.",
      "Capture a customer signature and close the visit.",
      "Generate the proof report and review callback or SLA flags.",
    ],
    features: [
      "Dispatcher job board",
      "Mobile technician checklist",
      "Photo and note evidence",
      "Customer sign-off",
      "Proof-of-work report",
      "Callback and SLA view",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Object storage", "PDF generation", "Vercel"],
    sampleData:
      "A fictional eight-job day across installation, preventive maintenance, repeat visits, and an SLA-risk callback.",
    presentation:
      "Two connected device views — dispatcher desktop and technician mobile — ending in a generated service report.",
    outreach:
      "Use with service-business operators who coordinate field teams through calls and messaging groups.",
    difficulty: "Medium to high",
    scope: "10–14 focused build days",
    cost: "Low; storage and generated documents remain within small demo usage",
    reusability: "High — adaptable to installation, inspection, repair, and facilities workflows.",
    excluded: [
      "Live GPS tracking",
      "Route optimization",
      "Inventory management",
      "Billing and payroll",
      "Offline-first sync",
      "Multi-tenant administration",
    ],
  },
  {
    slug: "operations-document-inbox",
    order: "04",
    title: "Operations Document Inbox",
    summary:
      "An AI-assisted review queue that extracts purchase-order, challan, and invoice data while keeping approval deterministic and human-controlled.",
    kind: "Flagship demo",
    stage: "Build next",
    featured: false,
    liveHref: "/demos/operations-document-inbox",
    services: ["AI systems", "Document automation", "Internal tools", "Integrations"],
    audience: "Operations and finance teams processing repeated vendor documents.",
    problem:
      "Teams retype information from semi-structured documents, then discover mismatched quantities, totals, or references late in the process.",
    before: "A mixed document pack is waiting for manual reading, entry, and cross-checking.",
    action: "Upload the pack, review extracted fields, and resolve deterministic validation flags.",
    result: "An approved, traceable record is ready for export without pretending the model is infallible.",
    wow: "The interface clearly separates AI suggestions from rule-based checks and human approval.",
    walkthrough: [
      "Upload a sample purchase order, delivery challan, and invoice set.",
      "Inspect the extracted supplier, reference, item, tax, and total fields.",
      "Review confidence indicators and exact source-page evidence.",
      "Resolve quantity and total mismatches flagged by deterministic rules.",
      "Approve the record and export a clean operational payload.",
    ],
    features: [
      "Multi-document intake",
      "Structured field extraction",
      "Source-linked evidence",
      "Deterministic validation rules",
      "Human approval queue",
      "Audit-friendly export",
    ],
    stack: ["Next.js", "TypeScript", "OCR", "LLM structured output", "Zod", "PostgreSQL", "Vercel"],
    sampleData:
      "Six synthetic document packs covering clean matches, missing references, quantity variance, tax errors, and low-confidence extraction.",
    presentation:
      "A review-first interface plus an evaluation sheet showing expected fields, model output, validation outcome, and reviewer decision.",
    outreach:
      "Share with operations-heavy teams after identifying one document workflow that is currently copied into spreadsheets or an ERP by hand.",
    difficulty: "High",
    scope: "12–16 focused build days",
    cost: "Low demo volume; model and OCR calls are capped and observable",
    reusability: "Very high — the review architecture generalizes to many document and compliance workflows.",
    excluded: [
      "Direct ERP or accounting sync",
      "Production email ingestion",
      "Custom OCR model training",
      "Autonomous approval",
      "Unbounded document formats",
    ],
  },
  {
    slug: "quote-to-status",
    order: "05",
    title: "Quote-to-Status",
    summary:
      "A lightweight sales workflow that turns a messy enquiry into an approved quote and a simple customer status page.",
    kind: "Supporting demo",
    stage: "Build later",
    featured: false,
    services: ["Automation", "Business software", "Customer portals"],
    audience: "Small fabricators, contractors, distributors, and owner-led B2B service businesses.",
    problem:
      "Enquiries arrive as informal Hinglish messages, quotes are rebuilt manually, and customers repeatedly call for status updates.",
    before: "A multi-line enquiry is buried in chat with unclear quantities, specifications, and delivery expectations.",
    action: "Parse the enquiry, apply a controlled rate table, and let the owner approve the draft.",
    result: "The customer receives a clear quote and a link that shows the current order status.",
    wow: "Unstructured conversational input becomes a governed business workflow without removing owner control.",
    walkthrough: [
      "Paste a realistic Hinglish enquiry into the intake screen.",
      "Review the parsed items, units, dimensions, and open questions.",
      "Apply rates and adjust the generated quote draft.",
      "Approve and share the quote with the customer.",
      "Update the job and open the customer-facing status link.",
    ],
    features: [
      "Conversational enquiry parsing",
      "Controlled rate table",
      "Owner approval step",
      "Shareable quote",
      "Customer status page",
    ],
    stack: ["Next.js", "TypeScript", "LLM structured output", "PostgreSQL", "PDF generation", "Vercel"],
    sampleData:
      "Ten synthetic enquiries with mixed Hindi-English phrasing, incomplete dimensions, and varied item counts.",
    presentation:
      "A single narrative from pasted message to customer status, with the approval boundary visible throughout.",
    outreach:
      "Useful for owner-led businesses that already sell through WhatsApp but have no lightweight system around it.",
    difficulty: "Medium",
    scope: "7–9 focused build days",
    cost: "Low model usage and simple managed storage",
    reusability: "High — rate tables and parsing rules can be adapted to multiple quotation-heavy businesses.",
    excluded: [
      "A full product catalog",
      "Customer accounts",
      "Voice-note transcription",
      "Inventory allocation",
      "Accounting integration",
    ],
  },
  {
    slug: "run-log-and-replay",
    order: "06",
    title: "Run Log & Replay",
    summary:
      "A technical proof that makes automation failures inspectable, retryable, and safe to explain to an operator.",
    kind: "Engineering proof",
    stage: "Build later",
    featured: false,
    services: ["Automation", "Backend engineering", "Reliability", "Developer tools"],
    audience: "Technical buyers and operations teams that depend on business automations.",
    problem:
      "Automations are easy to celebrate when they work and difficult to trust when a silent failure leaves nobody sure what happened or what can be retried.",
    before: "A business event failed halfway through and the operator only sees a missing outcome.",
    action: "Inspect the inputs, failure reason, completed steps, and replay policy before retrying.",
    result: "The run completes without duplicating finished work, and the audit trail explains the recovery.",
    wow: "A deliberate failure demonstrates idempotency and operational judgment more convincingly than a happy-path animation.",
    walkthrough: [
      "Trigger a prepared automation run that fails on a downstream step.",
      "Open the run detail and inspect sanitized inputs and completed actions.",
      "Read the classified failure and the conditions required for replay.",
      "Replay the run from the safe checkpoint.",
      "Confirm successful completion and the unchanged idempotency key.",
    ],
    features: [
      "Run history and state timeline",
      "Structured error classification",
      "Sanitized input and output inspection",
      "Safe replay controls",
      "Idempotency evidence",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Background jobs", "OpenTelemetry concepts", "Vercel"],
    sampleData:
      "A small library of deterministic runs: timeout, invalid payload, downstream rejection, duplicate event, and successful replay.",
    presentation:
      "A compact operator console with one scripted failure/recovery path and a short reliability note for technical reviewers.",
    outreach:
      "Use as engineering evidence in proposals involving integrations, scheduled workflows, or business-critical automation.",
    difficulty: "Medium",
    scope: "5–7 focused build days",
    cost: "Near-zero at demo scale",
    reusability: "Medium — the patterns transfer widely even when the interface remains a focused proof.",
    excluded: [
      "A full observability platform",
      "Distributed tracing infrastructure",
      "Arbitrary workflow authoring",
      "Production incident paging",
      "Multi-tenant log retention controls",
    ],
  },
];
