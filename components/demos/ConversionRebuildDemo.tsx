"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clipboard,
  Dumbbell,
  Eye,
  Gauge,
  Laptop,
  MapPin,
  Menu,
  MousePointerClick,
  Smartphone,
  Star,
} from "lucide-react";

type Device = "desktop" | "mobile";

const auditRows = [
  {
    signal: "Primary actions above the fold",
    before: "4 competing actions",
    after: "1 clear trial action",
    why: "Visitors can identify the next step without comparing several buttons.",
  },
  {
    signal: "Initial image fixture",
    before: "1.84 MB unoptimised",
    after: "182 KB responsive",
    why: "The controlled asset manifest removes oversized backgrounds and serves one responsive hero image.",
  },
  {
    signal: "Heading outline",
    before: "H1 → H4 → H2",
    after: "H1 → H2 → H2",
    why: "The rebuilt page exposes a predictable document structure to assistive technology.",
  },
  {
    signal: "Mobile tap targets",
    before: "3 controls below 44 px",
    after: "All controls 44 px or larger",
    why: "Booking, calling, and navigation remain usable on a moving, one-handed visit.",
  },
  {
    signal: "Local-business data",
    before: "Missing",
    after: "Defined and testable",
    why: "Name, location, opening hours, and activity type can be represented with structured data.",
  },
];

const auditSummary = `Conversion Rebuild — controlled fixture\n\n${auditRows
  .map((row) => `${row.signal}: ${row.before} → ${row.after}. ${row.why}`)
  .join("\n")}`;

export function ConversionRebuildDemo() {
  const [position, setPosition] = useState(52);
  const [device, setDevice] = useState<Device>("desktop");
  const [markers, setMarkers] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copySummary() {
    await navigator.clipboard.writeText(auditSummary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-7 text-[#15171a] dark:bg-[#0b0d11] dark:text-[#f2f4f7] md:py-11">
      <div className="container-wide">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              className="inline-flex items-center gap-2 text-sm text-[#6c7280] transition-colors hover:text-[#15171a] dark:text-[#9ca3af] dark:hover:text-white"
              href="/work/case-studies/conversion-rebuild"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Case study brief
            </Link>
            <h1 className="mt-7 max-w-3xl text-3xl font-semibold tracking-[-0.035em] md:text-5xl">
              See what the rebuild changes.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#676e7b] dark:text-[#a5acb8] md:text-base md:leading-7">
              Drag across a controlled reconstruction of the same gym website.
              Inspect the decisions; do not take anyone&apos;s conversion claim on faith.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-[#d3d7df] bg-white p-1 dark:border-white/10 dark:bg-[#13161c]">
              {([
                ["desktop", "Desktop", Laptop],
                ["mobile", "Mobile", Smartphone],
              ] as const).map(([value, label, Icon]) => (
                <button
                  aria-pressed={device === value}
                  className={`flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium transition-colors ${
                    device === value
                      ? "bg-[#15171a] text-white dark:bg-white dark:text-[#15171a]"
                      : "text-[#6c7280] hover:text-[#15171a] dark:text-[#9ca3af] dark:hover:text-white"
                  }`}
                  key={value}
                  onClick={() => setDevice(value)}
                  type="button"
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
            <button
              aria-pressed={markers}
              className={`flex h-11 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors ${
                markers
                  ? "border-[#2457e6] bg-[#e9efff] text-[#1946bd] dark:bg-[#14234b] dark:text-[#93afff]"
                  : "border-[#d3d7df] bg-white text-[#5f6674] hover:text-[#15171a] dark:border-white/10 dark:bg-[#13161c] dark:text-[#a5acb8] dark:hover:text-white"
              }`}
              onClick={() => setMarkers((current) => !current)}
              type="button"
            >
              <Eye aria-hidden="true" className="h-4 w-4" />
              Audit markers
            </button>
          </div>
        </div>

        <section className="mt-9 overflow-hidden rounded-2xl border border-[#cfd4dd] bg-[#dfe3e9] shadow-[0_24px_80px_rgba(35,43,58,0.16)] dark:border-white/10 dark:bg-[#171a20] dark:shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
          <div className="flex flex-col gap-3 border-b border-[#cfd4dd] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#13161c] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e45c55]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e0a62d]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#46a66e]" />
              </div>
              <div className="hidden h-8 min-w-60 items-center rounded-md bg-[#f1f3f6] px-3 text-xs text-[#7a808c] dark:bg-white/[0.06] sm:flex">
                vortex-athletics.example
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <button
                className="text-xs font-medium text-[#d93b32]"
                onClick={() => setPosition(100)}
                type="button"
              >
                Show old
              </button>
              <span className="text-[11px] tabular-nums text-[#8a909c]">{position}% before</span>
              <button
                className="text-xs font-medium text-[#2457e6] dark:text-[#8daaff]"
                onClick={() => setPosition(0)}
                type="button"
              >
                Show rebuild
              </button>
            </div>
          </div>

          <div className="relative grid min-h-[610px] place-items-center overflow-hidden p-3 md:p-7">
            <div
              className={`relative w-full overflow-hidden bg-white shadow-[0_16px_50px_rgba(34,42,57,0.22)] transition-[max-width,aspect-ratio] duration-300 dark:shadow-[0_16px_50px_rgba(0,0,0,0.45)] ${
                device === "mobile"
                  ? "aspect-[390/700] max-w-[390px] rounded-[1.4rem] border-[7px] border-[#17191d]"
                  : "aspect-[16/9] max-w-[1120px] rounded-md border border-[#c8cdd6]"
              }`}
            >
              <div aria-hidden="true" className="absolute inset-0">
                <RebuiltSite mobile={device === "mobile"} />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <LegacySite mobile={device === "mobile"} />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_0_20px_rgba(0,0,0,0.25)]"
                style={{ left: `${position}%` }}
              >
                <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[#15171a] text-white shadow-lg">
                  <span className="text-sm tracking-[-0.25em]">‹ ›</span>
                </div>
              </div>

              <label className="absolute inset-0 z-30 cursor-col-resize">
                <span className="sr-only">Comparison position: {position}% old website</span>
                <input
                  aria-label="Drag to compare the old and rebuilt website"
                  className="h-full w-full cursor-col-resize opacity-0"
                  max="100"
                  min="0"
                  onChange={(event) => setPosition(Number(event.target.value))}
                  type="range"
                  value={position}
                />
              </label>

              {markers ? <AuditMarkers /> : null}

              <div className="pointer-events-none absolute left-3 top-3 z-40 rounded-md bg-[#d93b32] px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                Before
              </div>
              <div className="pointer-events-none absolute right-3 top-3 z-40 rounded-md bg-[#2457e6] px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                Rebuilt
              </div>
            </div>
          </div>
        </section>

        <p className="mt-4 text-xs leading-5 text-[#737a87] dark:text-[#9ca3af]">
          Controlled fixture: both versions and their asset manifests were created for this demonstration.
          The comparison makes no claim about a real client&apos;s traffic, leads, or revenue.
        </p>

        <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#2457e6] dark:text-[#8daaff]">Controlled evidence</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">
                  What changed, and why it matters.
                </h2>
              </div>
              <button
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#cfd4dd] bg-white px-3 text-xs font-medium transition-colors hover:bg-[#f7f8fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457e6] dark:border-white/10 dark:bg-[#13161c] dark:hover:bg-white/[0.06]"
                onClick={copySummary}
                type="button"
              >
                {copied ? <Check aria-hidden="true" className="h-4 w-4 text-[#16856b]" /> : <Clipboard aria-hidden="true" className="h-4 w-4" />}
                {copied ? "Copied" : "Copy audit summary"}
              </button>
            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-[#cfd4dd] bg-white dark:border-white/10 dark:bg-[#13161c]">
              {auditRows.map((row) => (
                <article
                  className="grid gap-4 border-b border-[#e3e6eb] p-5 last:border-b-0 dark:border-white/10 md:grid-cols-[minmax(0,1fr)_10rem_10rem] md:items-start"
                  key={row.signal}
                >
                  <div>
                    <h3 className="text-sm font-semibold">{row.signal}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#727986] dark:text-[#a5acb8]">{row.why}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#9a4c47] dark:text-[#f0958f]">Before</p>
                    <p className="mt-1 text-xs font-medium">{row.before}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#2457e6] dark:text-[#8daaff]">Rebuilt</p>
                    <p className="mt-1 text-xs font-medium">{row.after}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-8 lg:pt-1">
            <div className="border-t-2 border-[#15171a] pt-5 dark:border-white">
              <Gauge aria-hidden="true" className="h-5 w-5 text-[#2457e6] dark:text-[#8daaff]" />
              <h2 className="mt-4 text-sm font-semibold">Measurement rule</h2>
              <p className="mt-2 text-xs leading-5 text-[#6f7683] dark:text-[#a5acb8]">
                Publish measured Lighthouse and field data only after deployment. Until then, show the controlled inputs and implementation decisions.
              </p>
            </div>
            <div className="border-t border-[#cfd4dd] pt-5 dark:border-white/10">
              <MousePointerClick aria-hidden="true" className="h-5 w-5 text-[#2457e6] dark:text-[#8daaff]" />
              <h2 className="mt-4 text-sm font-semibold">Conversion rule</h2>
              <p className="mt-2 text-xs leading-5 text-[#6f7683] dark:text-[#a5acb8]">
                One primary action above the fold. Phone, schedule, and location remain available without competing with the trial path.
              </p>
            </div>
            <Link
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2457e6] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1946bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457e6] focus-visible:ring-offset-2"
              href="/contact"
            >
              Discuss a rebuild
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </div>
    </div>
  );
}

function LegacySite({ mobile }: { mobile: boolean }) {
  return (
    <div className="h-full w-full overflow-hidden bg-black font-sans text-white">
      <header className={`flex items-center justify-between border-b-4 border-[#d93b32] bg-black ${mobile ? "px-3 py-3" : "px-7 py-4"}`}>
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-[#ef3e35]" />
          <p className={`${mobile ? "text-sm" : "text-lg"} font-black italic text-[#ef3e35]`}>VORTEX GYM</p>
        </div>
        {mobile ? (
          <Menu className="h-5 w-5" />
        ) : (
          <nav className="flex items-center gap-5 text-xs font-bold">
            <span>HOME</span><span>ABOUT</span><span>TRAINERS</span><span>GALLERY</span><span>CONTACT</span>
          </nav>
        )}
      </header>
      <main className={`relative flex h-[72%] flex-col justify-center overflow-hidden bg-[#1a1a1a] ${mobile ? "px-5" : "px-[8%]"}`}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(120deg, transparent 0 28px, #d93b32 29px 31px)" }} />
        <div className="relative z-10 max-w-2xl">
          <p className={`${mobile ? "text-[10px]" : "text-sm"} font-bold text-[#f5d44f]`}>#1 BEST GYM IN ANDHERI!!!</p>
          <h2 className={`${mobile ? "mt-3 text-[2rem] leading-[0.95]" : "mt-4 text-6xl leading-[0.9]"} font-black italic uppercase`}>
            Transform your body today
          </h2>
          <p className={`${mobile ? "mt-4 text-xs" : "mt-5 text-base"} max-w-xl leading-6 text-[#d0d0d0]`}>
            We provide best fitness services with latest machines, experienced trainers and amazing offers for everyone.
          </p>
          <div className={`mt-5 flex ${mobile ? "flex-col items-start gap-2" : "flex-wrap gap-3"}`}>
            <span className="bg-[#d93b32] px-4 py-2 text-xs font-black">JOIN NOW</span>
            <span className="border-2 border-[#f5d44f] px-4 py-2 text-xs font-black text-[#f5d44f]">FREE TRIAL</span>
            <span className="border-2 border-white px-4 py-2 text-xs font-black">CALL NOW</span>
            <span className="bg-white px-4 py-2 text-xs font-black text-black">VIEW OFFERS</span>
          </div>
        </div>
      </main>
      <div className={`grid bg-[#d93b32] text-center font-black ${mobile ? "grid-cols-2 text-[10px]" : "grid-cols-4 text-xs"}`}>
        {['LATEST EQUIPMENT', 'EXPERT TRAINERS', 'BEST PRICES', 'OPEN 7 DAYS'].map((item) => (
          <div className="border border-black/30 p-3" key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function RebuiltSite({ mobile }: { mobile: boolean }) {
  return (
    <div className="h-full w-full overflow-hidden bg-[#f7f8fa] font-sans text-[#15171a]">
      <header className={`flex items-center justify-between border-b border-[#dfe2e8] bg-white ${mobile ? "px-4 py-3" : "px-8 py-4"}`}>
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-[#2457e6] text-white"><Dumbbell className="h-4 w-4" /></div>
          <p className={`${mobile ? "text-xs" : "text-sm"} font-semibold`}>Vortex Athletics</p>
        </div>
        {mobile ? (
          <Menu className="h-5 w-5" />
        ) : (
          <div className="flex items-center gap-6 text-xs text-[#656c78]">
            <span>Training</span><span>Coaches</span><span>Schedule</span>
            <span className="rounded-md bg-[#2457e6] px-3 py-2 font-semibold text-white">Book a free trial</span>
          </div>
        )}
      </header>
      <main className={`grid h-[72%] items-center ${mobile ? "px-5 py-7" : "grid-cols-[1.05fr_.95fr] gap-8 px-[8%]"}`}>
        <div>
          <div className="flex items-center gap-1.5 text-[#a36108]">
            <Star className="h-3.5 w-3.5 fill-current" />
            <p className="text-[11px] font-medium">4.9 from 120 local members</p>
          </div>
          <h2 className={`${mobile ? "mt-4 text-[2.35rem] leading-[0.98]" : "mt-5 max-w-xl text-6xl leading-[0.96]"} font-semibold tracking-[-0.055em]`}>
            Strength for real life.
          </h2>
          <p className={`${mobile ? "mt-4 text-xs leading-5" : "mt-5 max-w-lg text-sm leading-6"} text-[#626976]`}>
            Coach-led strength and small-group training for people who want to feel capable, not intimidated.
          </p>
          <div className={`mt-6 flex ${mobile ? "flex-col items-stretch gap-3" : "items-center gap-4"}`}>
            <span className="rounded-md bg-[#2457e6] px-4 py-3 text-center text-xs font-semibold text-white">Book a free trial</span>
            <span className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#4f5662]"><MapPin className="h-3.5 w-3.5" />Andheri West</span>
          </div>
          <div className={`mt-7 flex gap-5 border-t border-[#dfe2e8] pt-4 text-[10px] text-[#69707c] ${mobile ? "justify-between" : "max-w-lg"}`}>
            <span>Beginner friendly</span><span>Small groups</span><span>Open 6 am–10 pm</span>
          </div>
        </div>
        {!mobile ? (
          <div className="relative h-[76%] min-h-60 overflow-hidden rounded-[1.2rem] bg-[#182033]">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(135deg, transparent 0 42%, #2457e6 42% 58%, transparent 58%), repeating-linear-gradient(90deg, transparent 0 46px, rgba(255,255,255,.08) 47px 48px)" }} />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/95 p-4 text-[#15171a] shadow-lg">
              <p className="text-xs font-semibold">Tonight at Vortex</p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#626976]"><span>Strength foundations</span><span>7:00 pm · 3 spots</span></div>
            </div>
          </div>
        ) : null}
      </main>
      <div className={`grid border-t border-[#dfe2e8] bg-white ${mobile ? "grid-cols-3" : "grid-cols-3 px-[8%]"}`}>
        {['Clear coaching', 'No lock-in pitch', 'Progress you can track'].map((item) => (
          <div className="border-r border-[#e3e6eb] p-3 text-center text-[10px] font-medium last:border-r-0" key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function AuditMarkers() {
  const markers = [
    { label: "Primary action", position: "left-[22%] top-[54%]" },
    { label: "Message hierarchy", position: "left-[50%] top-[35%]" },
    { label: "Mobile-ready controls", position: "right-[9%] top-[12%]" },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40">
      {markers.map((marker, index) => (
        <div className={`absolute ${marker.position}`} key={marker.label}>
          <div className="group relative grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#c27a12] text-[11px] font-bold text-white shadow-lg">
            {index + 1}
            <span className="absolute left-1/2 top-9 w-max max-w-36 -translate-x-1/2 rounded-md bg-[#15171a] px-2 py-1.5 text-center text-[10px] font-medium text-white shadow-lg">
              {marker.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
