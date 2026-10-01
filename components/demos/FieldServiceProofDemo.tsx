"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Clipboard,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  MapPin,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Thermometer,
  UserRound,
  Wrench,
} from "lucide-react";

type Mode = "dispatch" | "technician" | "report";
type JobStatus = "Assigned" | "En route" | "On site" | "Completed";

type Job = {
  id: string;
  customer: string;
  area: string;
  issue: string;
  slot: string;
  technician: string;
  status: JobStatus;
  flag?: string;
};

const initialJobs: Job[] = [
  { id: "FS-1048", customer: "Meera Shah", area: "Andheri West", issue: "Split AC not cooling", slot: "10:30–11:30", technician: "Arun P.", status: "On site", flag: "42m SLA" },
  { id: "FS-1049", customer: "Orchid Dental", area: "Bandra East", issue: "AC water leakage", slot: "11:30–12:30", technician: "Arun P.", status: "Assigned" },
  { id: "FS-1044", customer: "Naman Verma", area: "Juhu", issue: "Annual AC service", slot: "09:00–10:00", technician: "Rakesh M.", status: "Completed" },
  { id: "FS-1051", customer: "Kaveri Foods", area: "Santacruz", issue: "Freezer temperature alert", slot: "12:00–13:00", technician: "Sara K.", status: "En route", flag: "SLA risk" },
  { id: "FS-1052", customer: "Dev Malhotra", area: "Versova", issue: "Washing machine noise", slot: "13:30–14:30", technician: "Rakesh M.", status: "Assigned" },
  { id: "FS-1046", customer: "Studio Kanso", area: "Khar West", issue: "Cassette AC inspection", slot: "09:30–10:30", technician: "Sara K.", status: "Completed" },
];

const checklist = [
  { id: "isolate", label: "Isolate power and verify safe access" },
  { id: "filters", label: "Inspect filters, evaporator coil, and drain" },
  { id: "pressure", label: "Check refrigerant pressure and visible leakage" },
  { id: "clean", label: "Clean filters and evaporator coil" },
  { id: "test", label: "Restart unit and confirm cooling output" },
];

const reportSummary =
  "FS-1048 · Meera Shah · Split AC not cooling\nWork: filters and evaporator coil cleaned; unit tested after service.\nReadings: inlet 29.4°C, outlet 17.2°C, delta 12.2°C.\nEvidence: before and after proof recorded.\nCustomer sign-off recorded in the controlled demo.";

function statusTone(status: JobStatus) {
  if (status === "Completed") return "bg-[#dff3e9] text-[#207451] dark:bg-[#12382a] dark:text-[#7bd8ad]";
  if (status === "On site") return "bg-[#dceff5] text-[#176b87] dark:bg-[#12313d] dark:text-[#78c7df]";
  if (status === "En route") return "bg-[#fff0d9] text-[#9a5f08] dark:bg-[#3b2910] dark:text-[#f4bd65]";
  return "bg-[#e9ecef] text-[#59636a] dark:bg-white/[0.07] dark:text-[#aab3b8]";
}

export function FieldServiceProofDemo() {
  const [mode, setMode] = useState<Mode>("dispatch");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [completedChecks, setCompletedChecks] = useState<string[]>(["isolate"]);
  const [beforeEvidence, setBeforeEvidence] = useState(true);
  const [afterEvidence, setAfterEvidence] = useState(false);
  const [workNote, setWorkNote] = useState("Filters were heavily blocked. Cleaned filters and evaporator coil; tested cooling output after service.");
  const [signatory, setSignatory] = useState("");
  const [reportReady, setReportReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("Arun is on site. One safety check and one before photo are already recorded.");

  const activeJob = jobs[0];
  const checksComplete = completedChecks.length === checklist.length;
  const readyToComplete = checksComplete && beforeEvidence && afterEvidence && signatory.trim().length > 1;

  const proofSteps = useMemo(
    () => [
      { label: "Assigned", complete: true, detail: "09:52" },
      { label: "On site", complete: true, detail: "10:34" },
      { label: "Checklist", complete: checksComplete, detail: `${completedChecks.length}/${checklist.length}` },
      { label: "Evidence", complete: beforeEvidence && afterEvidence, detail: `${Number(beforeEvidence) + Number(afterEvidence)}/2` },
      { label: "Sign-off", complete: signatory.trim().length > 1, detail: signatory ? "Ready" : "Pending" },
      { label: "Report", complete: reportReady, detail: reportReady ? "Ready" : "Pending" },
    ],
    [afterEvidence, beforeEvidence, checksComplete, completedChecks.length, reportReady, signatory],
  );

  function toggleCheck(id: string) {
    setCompletedChecks((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function completeJob() {
    if (!readyToComplete) return;
    setReportReady(true);
    setJobs((current) =>
      current.map((job, index) => (index === 0 ? { ...job, status: "Completed" } : job)),
    );
    setNotice("Job completed. Proof report FS-1048-R1 is ready for the office and customer.");
    setMode("report");
  }

  async function copyReport() {
    await navigator.clipboard.writeText(`${reportSummary}\nSigned by: ${signatory || "Meera Shah"}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  function resetDemo() {
    setMode("dispatch");
    setJobs(initialJobs);
    setCompletedChecks(["isolate"]);
    setBeforeEvidence(true);
    setAfterEvidence(false);
    setWorkNote("Filters were heavily blocked. Cleaned filters and evaporator coil; tested cooling output after service.");
    setSignatory("");
    setReportReady(false);
    setCopied(false);
    setNotice("Demo reset. Arun is on site with the first safety check recorded.");
  }

  return (
    <div className="min-h-screen bg-[#edf1f1] py-7 text-[#14252f] dark:bg-[#081014] dark:text-[#eef4f2] md:py-10">
      <div className="container-wide">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            className="inline-flex items-center gap-2 text-[#66757b] transition-colors hover:text-[#14252f] dark:text-[#9aabb0] dark:hover:text-white"
            href="/work/case-studies/field-service-proof-of-work"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Case study brief
          </Link>
          <p className="text-xs text-[#718087] dark:text-[#91a1a6]">
            Interactive prototype · Synthetic records · Simulated photo evidence
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.2rem] border border-[#cbd5d6] bg-[#f8faf9] shadow-[0_24px_80px_rgba(29,53,59,0.15)] dark:border-white/10 dark:bg-[#10191e] dark:shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
          <header className="flex flex-col gap-3 border-b border-[#d8dfe0] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#10191e] sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#176b87] text-white">
                <Wrench aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Proofline Service Desk</p>
                <p className="text-xs text-[#718087]">Mumbai West · Thursday operations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-[#d2dbdc] bg-[#f5f7f6] p-1 dark:border-white/10 dark:bg-white/[0.04]">
                {([
                  ["dispatch", "Dispatch", ClipboardCheck],
                  ["technician", "Technician", Smartphone],
                  ["report", "Report", FileCheck2],
                ] as const).map(([value, label, Icon]) => (
                  <button
                    aria-pressed={mode === value}
                    className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
                      mode === value
                        ? "bg-white text-[#14252f] shadow-sm dark:bg-[#233139] dark:text-white"
                        : "text-[#6b797f] hover:text-[#14252f] dark:text-[#99a8ad] dark:hover:text-white"
                    }`}
                    key={value}
                    onClick={() => setMode(value)}
                    type="button"
                  >
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
              <button
                aria-label="Reset demo"
                className="grid h-10 w-10 place-items-center rounded-lg border border-[#d2dbdc] text-[#637278] transition-colors hover:bg-[#f0f4f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b87] dark:border-white/10 dark:hover:bg-white/[0.06]"
                onClick={resetDemo}
                type="button"
              >
                <RefreshCcw aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="border-b border-[#d8dfe0] bg-[#fffaf1] px-4 py-3 dark:border-white/10 dark:bg-[#211c12] md:px-6">
            <p aria-live="polite" className="flex items-center gap-2 text-xs text-[#76551e] dark:text-[#e1bb72]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e39a27]" />
              {notice}
            </p>
          </div>

          <ProofChain steps={proofSteps} />

          <div className="grid min-h-[720px] lg:grid-cols-[17rem_minmax(0,1fr)]">
            <JobQueue jobs={jobs} />
            <div className="min-w-0">
              {mode === "dispatch" ? (
                <DispatchView
                  afterEvidence={afterEvidence}
                  beforeEvidence={beforeEvidence}
                  checksComplete={checksComplete}
                  job={activeJob}
                  openTechnician={() => setMode("technician")}
                  reportReady={reportReady}
                  showReport={() => setMode("report")}
                  signatory={signatory}
                />
              ) : null}
              {mode === "technician" ? (
                <TechnicianView
                  afterEvidence={afterEvidence}
                  beforeEvidence={beforeEvidence}
                  completeJob={completeJob}
                  completedChecks={completedChecks}
                  job={activeJob}
                  readyToComplete={readyToComplete}
                  setAfterEvidence={setAfterEvidence}
                  setBeforeEvidence={setBeforeEvidence}
                  setSignatory={setSignatory}
                  setWorkNote={setWorkNote}
                  signatory={signatory}
                  toggleCheck={toggleCheck}
                  workNote={workNote}
                />
              ) : null}
              {mode === "report" ? (
                <ReportView
                  afterEvidence={afterEvidence}
                  beforeEvidence={beforeEvidence}
                  copied={copied}
                  copyReport={copyReport}
                  job={activeJob}
                  reportReady={reportReady}
                  signatory={signatory}
                  workNote={workNote}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProofChain({
  steps,
}: {
  steps: { label: string; complete: boolean; detail: string }[];
}) {
  return (
    <section className="overflow-x-auto border-b border-[#d8dfe0] bg-[#f3f6f5] px-4 py-4 dark:border-white/10 dark:bg-[#0c1519] md:px-6">
      <div className="flex min-w-[660px] items-start">
        {steps.map((step, index) => (
          <div className="relative flex min-w-0 flex-1" key={step.label}>
            <div className="relative z-10">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${
                  step.complete
                    ? "border-[#2f8f68] bg-[#2f8f68] text-white"
                    : "border-[#c6d0d1] bg-white text-[#7d8a8e] dark:border-white/15 dark:bg-[#10191e]"
                }`}
              >
                {step.complete ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <p className="mt-2 text-xs font-medium">{step.label}</p>
              <p className="mt-0.5 text-[10px] text-[#819095]">{step.detail}</p>
            </div>
            {index < steps.length - 1 ? (
              <span
                className={`mt-3 h-px flex-1 ${step.complete ? "bg-[#2f8f68]" : "bg-[#cdd6d7] dark:bg-white/10"}`}
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function JobQueue({ jobs }: { jobs: Job[] }) {
  return (
    <aside className="border-b border-[#d8dfe0] bg-[#f1f5f4] p-3 dark:border-white/10 dark:bg-[#0c1519] lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-xs font-semibold">Today&apos;s jobs</h2>
        <span className="text-[11px] tabular-nums text-[#78878c]">6 scheduled</span>
      </div>
      <div className="mt-1 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1">
        {jobs.map((job, index) => (
          <div
            className={`min-w-64 rounded-lg border p-3 lg:min-w-0 ${
              index === 0
                ? "border-[#8eb9c7] bg-white shadow-sm dark:border-[#276d84] dark:bg-[#16252c]"
                : "border-transparent bg-transparent"
            }`}
            key={job.id}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[11px] font-medium text-[#176b87] dark:text-[#78c7df]">{job.id}</p>
              {job.flag ? <span className="text-[10px] font-medium text-[#a7650b] dark:text-[#f4bd65]">{job.flag}</span> : null}
            </div>
            <p className="mt-1.5 text-xs font-semibold">{job.customer}</p>
            <p className="mt-1 truncate text-[11px] text-[#6c7a7f] dark:text-[#9aabb0]">{job.issue}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-[10px] tabular-nums text-[#7b898e]">{job.slot}</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${statusTone(job.status)}`}>{job.status}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function DispatchView({
  afterEvidence,
  beforeEvidence,
  checksComplete,
  job,
  openTechnician,
  reportReady,
  showReport,
  signatory,
}: {
  afterEvidence: boolean;
  beforeEvidence: boolean;
  checksComplete: boolean;
  job: Job;
  openTechnician: () => void;
  reportReady: boolean;
  showReport: () => void;
  signatory: string;
}) {
  return (
    <div className="p-4 md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#176b87] dark:text-[#78c7df]">{job.id}</span>
            <span className={`rounded px-2 py-1 text-xs font-medium ${statusTone(job.status)}`}>{job.status}</span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{job.issue}</h1>
          <p className="mt-2 text-sm text-[#65747a] dark:text-[#9aabb0]">{job.customer} · {job.area}</p>
        </div>
        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#176b87] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#115b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b87] focus-visible:ring-offset-2"
          onClick={reportReady ? showReport : openTechnician}
          type="button"
        >
          {reportReady ? <FileCheck2 aria-hidden="true" className="h-4 w-4" /> : <Smartphone aria-hidden="true" className="h-4 w-4" />}
          {reportReady ? "Open proof report" : "Continue technician view"}
        </button>
      </div>

      <div className="mt-7 grid border-y border-[#d7dfe0] dark:border-white/10 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Technician", value: job.technician, icon: UserRound },
          { label: "Service window", value: job.slot, icon: Clock3 },
          { label: "Address", value: "Lokhandwala Complex", icon: MapPin },
          { label: "Customer", value: "+91 98204 11824", icon: Phone },
        ].map(({ label, value, icon: DetailIcon }, index) => {
          return (
            <div className={`py-4 sm:px-4 ${index > 0 ? "sm:border-l sm:border-[#d7dfe0] sm:dark:border-white/10" : "sm:pl-0"}`} key={label}>
              <DetailIcon aria-hidden="true" className="h-4 w-4 text-[#718087]" />
              <p className="mt-3 text-[11px] text-[#819095]">{label}</p>
              <p className="mt-1 text-xs font-medium">{value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section>
          <h2 className="text-sm font-semibold">Office view of field proof</h2>
          <p className="mt-1 text-xs leading-5 text-[#718087] dark:text-[#9aabb0]">The dispatcher sees completion state, not a loose photo dump.</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-[#d4ddde] bg-white dark:border-white/10 dark:bg-[#142027]">
            {[
              ["Safety and service checklist", checksComplete ? "Complete" : "In progress", checksComplete],
              ["Before-service evidence", beforeEvidence ? "Recorded" : "Missing", beforeEvidence],
              ["After-service evidence", afterEvidence ? "Recorded" : "Missing", afterEvidence],
              ["Customer sign-off", signatory ? `Signed by ${signatory}` : "Pending", Boolean(signatory)],
              ["Client-ready report", reportReady ? "Generated" : "Waiting for sign-off", reportReady],
            ].map(([label, value, complete]) => (
              <div className="flex items-center justify-between gap-4 border-b border-[#e3e8e8] px-4 py-4 last:border-b-0 dark:border-white/[0.07]" key={String(label)}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-6 w-6 place-items-center rounded-full ${complete ? "bg-[#dff3e9] text-[#2f8f68] dark:bg-[#12382a]" : "bg-[#eef1f1] text-[#8a979b] dark:bg-white/[0.06]"}`}>
                    {complete ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />}
                  </span>
                  <p className="text-xs font-medium">{label}</p>
                </div>
                <p className="text-[11px] text-[#748287] dark:text-[#9aabb0]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="border-t-2 border-[#e39a27] pt-5">
          <p className="text-xs font-semibold text-[#a7650b] dark:text-[#f4bd65]">SLA watch</p>
          <p className="mt-3 text-3xl font-semibold tabular-nums">42 min</p>
          <p className="mt-2 text-xs leading-5 text-[#718087] dark:text-[#9aabb0]">Time remaining to close the visit or record a documented callback reason.</p>
          <div className="mt-6 border-t border-[#d8dfe0] pt-5 dark:border-white/10">
            <p className="text-xs font-semibold">Callback history</p>
            <p className="mt-2 text-xs leading-5 text-[#718087] dark:text-[#9aabb0]">No repeat visit in the last 90 days.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TechnicianView({
  afterEvidence,
  beforeEvidence,
  completeJob,
  completedChecks,
  job,
  readyToComplete,
  setAfterEvidence,
  setBeforeEvidence,
  setSignatory,
  setWorkNote,
  signatory,
  toggleCheck,
  workNote,
}: {
  afterEvidence: boolean;
  beforeEvidence: boolean;
  completeJob: () => void;
  completedChecks: string[];
  job: Job;
  readyToComplete: boolean;
  setAfterEvidence: (value: boolean) => void;
  setBeforeEvidence: (value: boolean) => void;
  setSignatory: (value: string) => void;
  setWorkNote: (value: string) => void;
  signatory: string;
  toggleCheck: (id: string) => void;
  workNote: string;
}) {
  const missing = checklist.length - completedChecks.length + Number(!beforeEvidence) + Number(!afterEvidence) + Number(signatory.trim().length < 2);

  return (
    <div className="grid gap-8 p-4 md:p-7 xl:grid-cols-[minmax(0,1fr)_23rem]">
      <div>
        <p className="text-xs font-medium text-[#176b87] dark:text-[#78c7df]">Technician workflow</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">Finish the visit with evidence.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#65747a] dark:text-[#9aabb0]">Complete the checklist, record before and after proof, then capture customer acceptance.</p>

        <section className="mt-7">
          <h2 className="text-sm font-semibold">Service checklist</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-[#d4ddde] bg-white dark:border-white/10 dark:bg-[#142027]">
            {checklist.map((item) => {
              const checked = completedChecks.includes(item.id);
              return (
                <label className="flex cursor-pointer items-start gap-3 border-b border-[#e3e8e8] px-4 py-3.5 last:border-b-0 dark:border-white/[0.07]" key={item.id}>
                  <input
                    checked={checked}
                    className="sr-only"
                    onChange={() => toggleCheck(item.id)}
                    type="checkbox"
                  />
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border ${checked ? "border-[#2f8f68] bg-[#2f8f68] text-white" : "border-[#b9c5c7] bg-white dark:bg-transparent"}`}>
                    {checked ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : null}
                  </span>
                  <span className={`text-xs leading-5 ${checked ? "text-[#526167] line-through decoration-[#9fb0b4]" : ""}`}>{item.label}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-semibold">Temperature readings</h2>
          <div className="mt-3 grid gap-px overflow-hidden rounded-xl border border-[#d4ddde] bg-[#d4ddde] dark:border-white/10 dark:bg-white/10 sm:grid-cols-3">
            {[["Inlet", "29.4°C"], ["Outlet", "17.2°C"], ["Cooling delta", "12.2°C"]].map(([label, value]) => (
              <div className="bg-white p-4 dark:bg-[#142027]" key={label}>
                <Thermometer aria-hidden="true" className="h-4 w-4 text-[#176b87] dark:text-[#78c7df]" />
                <p className="mt-3 text-[11px] text-[#7b898e]">{label}</p>
                <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <label className="mt-7 block">
          <span className="text-sm font-semibold">Work performed</span>
          <textarea
            className="mt-3 min-h-24 w-full resize-y rounded-xl border border-[#cbd5d6] bg-white p-3 text-sm leading-6 outline-none focus:border-[#176b87] focus:ring-2 focus:ring-[#176b87]/20 dark:border-white/10 dark:bg-[#142027]"
            onChange={(event) => setWorkNote(event.target.value)}
            value={workNote}
          />
        </label>
      </div>

      <aside>
        <div className="rounded-[1.5rem] border-[6px] border-[#14252f] bg-[#eef3f2] p-3 shadow-[0_18px_50px_rgba(20,37,47,0.2)] dark:bg-[#0c1519]">
          <div className="mx-auto mb-3 h-1 w-14 rounded-full bg-[#607178]" />
          <div className="rounded-xl bg-white p-4 dark:bg-[#142027]">
            <p className="text-[10px] font-medium text-[#176b87] dark:text-[#78c7df]">{job.id} · Evidence</p>
            <h2 className="mt-1 text-sm font-semibold">Cooling service proof</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <EvidenceTile
                captured={beforeEvidence}
                label="Before"
                onClick={() => setBeforeEvidence(true)}
                tone="fault"
              />
              <EvidenceTile
                captured={afterEvidence}
                label="After"
                onClick={() => setAfterEvidence(true)}
                tone="success"
              />
            </div>
            <label className="mt-5 block">
              <span className="text-xs font-semibold">Customer name for sign-off</span>
              <input
                className="mt-2 h-10 w-full rounded-lg border border-[#cbd5d6] bg-white px-3 text-sm outline-none focus:border-[#176b87] focus:ring-2 focus:ring-[#176b87]/20 dark:border-white/10 dark:bg-[#10191e]"
                onChange={(event) => setSignatory(event.target.value)}
                placeholder="e.g. Meera Shah"
                value={signatory}
              />
            </label>
            <div className="mt-3 rounded-lg border border-dashed border-[#b8c5c7] bg-[#f8faf9] px-3 py-4 text-center dark:border-white/15 dark:bg-white/[0.03]">
              <p className="text-lg italic tracking-[-0.04em] text-[#4f6066] dark:text-[#b3c0c4]">{signatory || "Signature pending"}</p>
              <p className="mt-1 text-[9px] text-[#879499]">Typed acknowledgement for this prototype</p>
            </div>
            <button
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#176b87] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#115b74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b87] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#9babad]"
              disabled={!readyToComplete}
              onClick={completeJob}
              type="button"
            >
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              Complete and generate report
            </button>
            {!readyToComplete ? (
              <p className="mt-3 text-center text-[10px] leading-4 text-[#8c641c] dark:text-[#e1bb72]">
                {missing} required {missing === 1 ? "item" : "items"} remaining
              </p>
            ) : null}
          </div>
        </div>
        <p className="mt-4 text-center text-[10px] leading-4 text-[#7b898e]">Evidence buttons simulate a captured photo. No file leaves this browser.</p>
      </aside>
    </div>
  );
}

function EvidenceTile({
  captured,
  interactive = true,
  label,
  onClick,
  tone,
}: {
  captured: boolean;
  interactive?: boolean;
  label: string;
  onClick: () => void;
  tone: "fault" | "success";
}) {
  return (
    <button
      className={`relative aspect-[4/3] overflow-hidden rounded-lg border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b87] ${captured ? "border-transparent" : "border-dashed border-[#b8c5c7] bg-[#f3f6f5] dark:border-white/15 dark:bg-white/[0.03]"}`}
      disabled={!interactive}
      onClick={onClick}
      type="button"
    >
      {captured ? (
        <>
          <div
            className={`absolute inset-0 ${
              tone === "fault"
                ? "bg-[radial-gradient(circle_at_35%_40%,#879499_0_12%,#3a4b52_13%_30%,#1d2b31_31%_100%)]"
                : "bg-[radial-gradient(circle_at_60%_42%,#9bc9bd_0_12%,#477f72_13%_30%,#183b33_31%_100%)]"
            }`}
          />
          <span className="absolute bottom-2 left-2 rounded bg-black/65 px-1.5 py-1 text-[9px] font-medium text-white">{label} · 10:{tone === "fault" ? "37" : "58"}</span>
          <CheckCircle2 aria-hidden="true" className="absolute right-2 top-2 h-4 w-4 text-white drop-shadow" />
        </>
      ) : (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#708086]">
          <Camera aria-hidden="true" className="h-5 w-5" />
          <span className="text-[10px] font-medium">Capture {label.toLowerCase()}</span>
        </span>
      )}
    </button>
  );
}

function ReportView({
  afterEvidence,
  beforeEvidence,
  copied,
  copyReport,
  job,
  reportReady,
  signatory,
  workNote,
}: {
  afterEvidence: boolean;
  beforeEvidence: boolean;
  copied: boolean;
  copyReport: () => void;
  job: Job;
  reportReady: boolean;
  signatory: string;
  workNote: string;
}) {
  if (!reportReady) {
    return (
      <div className="grid min-h-[620px] place-items-center p-6 text-center">
        <div className="max-w-sm">
          <FileCheck2 aria-hidden="true" className="mx-auto h-9 w-9 text-[#8a999e]" />
          <h1 className="mt-5 text-xl font-semibold">The report is waiting for field proof.</h1>
          <p className="mt-3 text-sm leading-6 text-[#718087] dark:text-[#9aabb0]">Complete the technician checklist, capture after evidence, and record customer sign-off.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-7">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-[#ccd6d7] bg-white shadow-[0_14px_45px_rgba(29,53,59,0.1)] dark:border-white/10 dark:bg-[#142027]">
        <header className="flex flex-col gap-5 border-b border-[#dfe5e5] bg-[#14252f] p-6 text-white sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2"><Wrench aria-hidden="true" className="h-4 w-4 text-[#78c7df]" /><span className="text-xs font-semibold">Proofline Service Desk</span></div>
            <h1 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">Service completion report</h1>
            <p className="mt-2 text-xs text-[#b9c7cc]">Generated from field events · Not manually reconstructed</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-[#91a4aa]">Report ID</p>
            <p className="mt-1 text-sm font-semibold">{job.id}-R1</p>
            <p className="mt-3 text-xs text-[#91a4aa]">1 Oct 2026 · 11:04</p>
          </div>
        </header>

        <div className="p-6 md:p-8">
          <div className="grid gap-6 border-b border-[#dfe5e5] pb-7 dark:border-white/10 sm:grid-cols-2 md:grid-cols-4">
            {[["Customer", job.customer], ["Location", job.area], ["Equipment", "1.5T split AC"], ["Technician", job.technician]].map(([label, value]) => (
              <div key={label}><p className="text-[11px] text-[#819095]">{label}</p><p className="mt-1 text-xs font-medium">{value}</p></div>
            ))}
          </div>

          <section className="py-7">
            <h2 className="text-sm font-semibold">Work completed</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#607076] dark:text-[#a7b4b8]">{workNote}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[["Inlet", "29.4°C"], ["Outlet", "17.2°C"], ["Cooling delta", "12.2°C"]].map(([label, value]) => (
                <div className="border-l-2 border-[#176b87] pl-3" key={label}><p className="text-[10px] text-[#819095]">{label}</p><p className="mt-1 text-sm font-semibold tabular-nums">{value}</p></div>
              ))}
            </div>
          </section>

          <section className="border-t border-[#dfe5e5] py-7 dark:border-white/10">
            <h2 className="text-sm font-semibold">Visual evidence</h2>
            <div className="mt-4 grid max-w-xl grid-cols-2 gap-3">
              <EvidenceTile captured={beforeEvidence} interactive={false} label="Before" onClick={() => undefined} tone="fault" />
              <EvidenceTile captured={afterEvidence} interactive={false} label="After" onClick={() => undefined} tone="success" />
            </div>
          </section>

          <section className="grid gap-6 border-t border-[#dfe5e5] pt-7 dark:border-white/10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-2 text-[#2f8f68] dark:text-[#7bd8ad]"><ShieldCheck aria-hidden="true" className="h-4 w-4" /><p className="text-xs font-semibold">Customer acceptance recorded</p></div>
              <p className="mt-4 text-2xl italic tracking-[-0.04em]">{signatory || "Meera Shah"}</p>
              <p className="mt-1 text-[10px] text-[#819095]">Typed acknowledgement · 11:03</p>
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#ccd6d7] px-3 text-xs font-medium transition-colors hover:bg-[#f3f6f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176b87] dark:border-white/10 dark:hover:bg-white/[0.05]"
              onClick={copyReport}
              type="button"
            >
              {copied ? <Check aria-hidden="true" className="h-4 w-4 text-[#2f8f68]" /> : <Clipboard aria-hidden="true" className="h-4 w-4" />}
              {copied ? "Summary copied" : "Copy report summary"}
            </button>
          </section>
        </div>
      </div>
      <div className="mx-auto mt-5 flex max-w-4xl items-center justify-between gap-4 text-xs text-[#718087] dark:text-[#9aabb0]">
        <p>Shareable report preview · PDF generation is outside this prototype.</p>
        <Link className="inline-flex items-center gap-1 font-medium text-[#176b87] dark:text-[#78c7df]" href="/contact">
          Discuss this workflow <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
