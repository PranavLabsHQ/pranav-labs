"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  Eye,
  FileWarning,
  GitBranch,
  LoaderCircle,
  LockKeyhole,
  Play,
  RefreshCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

type RunStatus = "Failed" | "Succeeded" | "Skipped";
type StepStatus = "success" | "failed" | "blocked" | "skipped" | "replayed";

type RunStep = {
  id: string;
  label: string;
  detail: string;
  timestamp: string;
  status: StepStatus;
};

type Run = {
  id: string;
  name: string;
  source: string;
  started: string;
  duration: string;
  status: RunStatus;
  failure: string;
  failureDetail: string;
  replayable: boolean;
  checkpoint: string;
  idempotency: string;
  payload: string;
  steps: RunStep[];
};

const initialRuns: Run[] = [
  {
    id: "RUN-2048",
    name: "Trial reminder sync",
    source: "trial.completed",
    started: "10:42:18",
    duration: "2.8s",
    status: "Failed",
    failure: "Downstream timeout",
    failureDetail: "WhatsApp test provider did not acknowledge the send request within 2 seconds.",
    replayable: true,
    checkpoint: "send_reminder",
    idempotency: "evt_trial_2048_reminder_v1",
    payload: '{\n  "member": "Riya Sharma",\n  "phone": "+91 98204 11824",\n  "trialId": "TR-8831",\n  "template": "trial_follow_up"\n}',
    steps: [
      { id: "receive", label: "Event received", detail: "trial.completed accepted", timestamp: "10:42:18.041", status: "success" },
      { id: "validate", label: "Validate payload", detail: "Schema and consent checks passed", timestamp: "10:42:18.084", status: "success" },
      { id: "ledger", label: "Write activity ledger", detail: "Lead TR-8831 activity recorded", timestamp: "10:42:18.351", status: "success" },
      { id: "send", label: "Send WhatsApp update", detail: "Provider timeout after 2,000ms", timestamp: "10:42:20.802", status: "failed" },
      { id: "finish", label: "Finalize run", detail: "Blocked until send outcome is known", timestamp: "10:42:20.804", status: "blocked" },
    ],
  },
  {
    id: "RUN-2047",
    name: "Invoice export",
    source: "invoice.approved",
    started: "10:40:02",
    duration: "0.3s",
    status: "Failed",
    failure: "Invalid payload",
    failureDetail: "The invoice total is missing from the approved record.",
    replayable: false,
    checkpoint: "validate_payload",
    idempotency: "evt_invoice_2047_export_v1",
    payload: '{\n  "invoice": "INV-3301",\n  "supplier": "Apex Cooling Parts",\n  "total": null\n}',
    steps: [
      { id: "receive", label: "Event received", detail: "invoice.approved accepted", timestamp: "10:40:02.012", status: "success" },
      { id: "validate", label: "Validate payload", detail: "Required field total is null", timestamp: "10:40:02.311", status: "failed" },
      { id: "export", label: "Export to ledger", detail: "Skipped because validation failed", timestamp: "10:40:02.312", status: "skipped" },
    ],
  },
  {
    id: "RUN-2046",
    name: "Renewal nudge",
    source: "renewal.due",
    started: "10:37:44",
    duration: "1.1s",
    status: "Succeeded",
    failure: "None",
    failureDetail: "All steps completed on the first attempt.",
    replayable: false,
    checkpoint: "—",
    idempotency: "evt_renewal_2046_nudge_v1",
    payload: '{\n  "member": "Kabir Singh",\n  "daysLeft": 2,\n  "channel": "whatsapp_test"\n}',
    steps: [
      { id: "receive", label: "Event received", detail: "renewal.due accepted", timestamp: "10:37:44.012", status: "success" },
      { id: "validate", label: "Validate payload", detail: "Schema and consent checks passed", timestamp: "10:37:44.102", status: "success" },
      { id: "send", label: "Send WhatsApp update", detail: "Provider acknowledged", timestamp: "10:37:45.091", status: "success" },
    ],
  },
  {
    id: "RUN-2045",
    name: "Lead enrichment",
    source: "lead.created",
    started: "10:35:09",
    duration: "0.2s",
    status: "Skipped",
    failure: "Duplicate event",
    failureDetail: "The idempotency key was already completed by RUN-2044.",
    replayable: false,
    checkpoint: "—",
    idempotency: "evt_lead_2045_enrich_v1",
    payload: '{\n  "lead": "Saanvi Kapoor",\n  "source": "instagram",\n  "createdAt": "2026-10-01"\n}',
    steps: [
      { id: "receive", label: "Event received", detail: "lead.created accepted", timestamp: "10:35:09.012", status: "success" },
      { id: "dedupe", label: "Check idempotency", detail: "Existing completion found", timestamp: "10:35:09.198", status: "skipped" },
    ],
  },
];

function statusTone(status: RunStatus) {
  if (status === "Succeeded") return "bg-[#dff4e9] text-[#2d8a61] dark:bg-[#12382a] dark:text-[#7ed8ad]";
  if (status === "Skipped") return "bg-[#e8ebee] text-[#717d86] dark:bg-white/[0.08] dark:text-[#acb7bf]";
  return "bg-[#fae5e3] text-[#c2544d] dark:bg-[#3d201e] dark:text-[#f09b93]";
}

function stepTone(status: StepStatus) {
  if (status === "success" || status === "replayed") return "bg-[#55c28a] text-[#06130d]";
  if (status === "failed") return "bg-[#e16a61] text-white";
  if (status === "blocked") return "bg-[#e6a448] text-[#201606]";
  return "bg-[#5f6d77] text-[#0d141b]";
}

export function RunLogReplayDemo() {
  const [runs, setRuns] = useState(initialRuns);
  const [selectedId, setSelectedId] = useState(initialRuns[0].id);
  const [replayedIds, setReplayedIds] = useState<string[]>([]);
  const [replaying, setReplaying] = useState(false);
  const [payloadOpen, setPayloadOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("RUN-2048 failed at the provider boundary. Inspect the checkpoint before replaying.");

  const run = runs.find((item) => item.id === selectedId) ?? runs[0];
  const replayed = replayedIds.includes(run.id);
  const currentStatus: RunStatus = replayed ? "Succeeded" : run.status;
  const currentSteps = useMemo(
    () =>
      run.steps.map((step) =>
        replayed && (step.status === "failed" || step.status === "blocked")
          ? { ...step, status: "replayed" as const, detail: step.id === "send" ? "Provider acknowledged on safe replay" : "Completed after send checkpoint" }
          : step,
      ),
    [replayed, run.steps],
  );
  const canReplay = run.replayable && currentStatus === "Failed" && !replaying;

  function selectRun(nextRun: Run) {
    setSelectedId(nextRun.id);
    setPayloadOpen(false);
    setCopied(false);
    setNotice(nextRun.status === "Failed" ? `${nextRun.id} is waiting for inspection.` : `${nextRun.id} is ${nextRun.status.toLowerCase()}.`);
  }

  function replayRun() {
    if (!canReplay) return;
    setReplaying(true);
    setNotice(`Replaying ${run.checkpoint} with idempotency key preserved…`);
    window.setTimeout(() => {
      setReplayedIds((current) => [...current, run.id]);
      setRuns((current) => current.map((item) => item.id === run.id ? { ...item, status: "Succeeded" } : item));
      setReplaying(false);
      setNotice(`${run.id} replayed successfully. Three completed actions were not duplicated.`);
    }, 900);
  }

  async function copyRunId() {
    await navigator.clipboard.writeText(run.id);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function resetDemo() {
    setRuns(initialRuns);
    setSelectedId(initialRuns[0].id);
    setReplayedIds([]);
    setReplaying(false);
    setPayloadOpen(false);
    setCopied(false);
    setNotice("Demo reset. RUN-2048 is waiting at the provider timeout checkpoint.");
  }

  return (
    <div className="min-h-screen bg-[#080d12] py-7 text-[#e7edf0] md:py-10">
      <div className="container-wide">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link className="inline-flex items-center gap-2 text-[#8999a4] transition-colors hover:text-white" href="/work/case-studies/run-log-and-replay"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Case study brief</Link>
          <p className="text-xs text-[#758691]">Interactive prototype · Sanitized payloads · Deterministic replay</p>
        </div>

        <div className="overflow-hidden rounded-[1.15rem] border border-[#273640] bg-[#0e151b] shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <header className="flex flex-col gap-3 border-b border-[#273640] bg-[#111b22] px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-lg bg-[#274a60] text-[#8fd0f0]"><Activity aria-hidden="true" className="h-5 w-5" /></div><div><p className="text-sm font-semibold">Runline</p><p className="text-xs text-[#8497a3]">Automation operations console · Mumbai workspace</p></div></div>
            <div className="flex items-center gap-2"><span className="hidden items-center gap-2 rounded-md border border-[#294050] px-2.5 py-2 text-[10px] text-[#91a3ad] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#55c28a]" />Synthetic environment</span><button aria-label="Reset demo" className="grid h-10 w-10 place-items-center rounded-lg border border-[#2b3b45] text-[#9aacb5] transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5aa7d7]" onClick={resetDemo} type="button"><RefreshCcw aria-hidden="true" className="h-4 w-4" /></button></div>
          </header>

          <div className="grid grid-cols-4 border-b border-[#273640] bg-[#0b1217]">
            {[
              { label: "Observe", detail: "Run history", icon: Eye },
              { label: "Classify", detail: "Failure reason", icon: FileWarning },
              { label: "Replay", detail: "Safe checkpoint", icon: Play },
              { label: "Verify", detail: "No duplicates", icon: ShieldCheck },
            ].map(({ label, detail, icon: Icon }, index) => <div className={`flex items-start gap-2 px-3 py-3 md:px-5 ${index > 0 ? "border-l border-[#273640]" : ""}`} key={label}><Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#5aa7d7]" /><div><p className="text-xs font-semibold">{label}</p><p className="mt-0.5 hidden text-[10px] text-[#758691] sm:block">{detail}</p></div></div>)}
          </div>

          <div className="border-b border-[#273640] bg-[#211b13] px-4 py-3 md:px-6"><p aria-live="polite" className="flex items-center gap-2 text-xs text-[#e6b96d]"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e6a448]" />{notice}</p></div>

          <div className="grid min-h-[780px] md:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_21rem]">
            <RunQueue runs={runs} selectedId={selectedId} selectRun={selectRun} replayedIds={replayedIds} />
            <RunDetail copied={copied} copyRunId={copyRunId} currentStatus={currentStatus} currentSteps={currentSteps} payloadOpen={payloadOpen} run={run} setPayloadOpen={setPayloadOpen} replayed={replayed} />
            <ReplayInspector canReplay={canReplay} currentStatus={currentStatus} replayRun={replayRun} replayed={replayed} replaying={replaying} run={run} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RunQueue({ runs, selectedId, selectRun, replayedIds }: { runs: Run[]; selectedId: string; selectRun: (run: Run) => void; replayedIds: string[] }) {
  return <aside className="border-b border-[#273640] bg-[#0b1217] p-3 md:border-b-0 md:border-r"><div className="flex items-center justify-between px-2 py-2"><h2 className="text-xs font-semibold">Run history</h2><span className="text-[10px] text-[#758691]">Today · 4 runs</span></div><div className="mt-1 flex gap-2 overflow-x-auto pb-1 md:block md:space-y-1">{runs.map((item) => { const status: RunStatus = replayedIds.includes(item.id) ? "Succeeded" : item.status; return <button className={`min-w-64 rounded-lg border p-3 text-left transition-colors md:w-full md:min-w-0 ${selectedId === item.id ? "border-[#38617a] bg-[#14232c]" : "border-transparent hover:bg-white/[0.04]"}`} key={item.id} onClick={() => selectRun(item)} type="button"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] text-[#77b6d7]">{item.id}</span><span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${statusTone(status)}`}>{status}</span></div><p className="mt-2 text-xs font-semibold">{item.name}</p><p className="mt-1 truncate text-[10px] text-[#81929c]">{item.source}</p><div className="mt-3 flex items-center justify-between text-[10px] text-[#758691]"><span>{item.started}</span><ChevronRight aria-hidden="true" className="h-3 w-3" /></div></button>; })}</div></aside>;
}

function RunDetail({ copied, copyRunId, currentStatus, currentSteps, payloadOpen, run, setPayloadOpen, replayed }: { copied: boolean; copyRunId: () => void; currentStatus: RunStatus; currentSteps: RunStep[]; payloadOpen: boolean; run: Run; setPayloadOpen: (value: boolean) => void; replayed: boolean }) {
  return <main className="min-w-0 bg-[#101a21] p-4 md:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs text-[#77b6d7]">{run.id}</span><span className={`rounded px-2 py-1 text-[10px] font-medium ${statusTone(currentStatus)}`}>{currentStatus}</span></div><h1 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{run.name}</h1><p className="mt-2 text-sm text-[#94a4ad]">{run.source} · started {run.started} · {run.duration}</p></div><button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#2d414d] px-3 text-xs font-medium text-[#b4c4cc] transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5aa7d7]" onClick={copyRunId} type="button"><Copy aria-hidden="true" className="h-3.5 w-3.5" />{copied ? "Copied" : "Copy run ID"}</button></div>

    <section className="mt-8 rounded-xl border border-[#2b3d48] bg-[#0c141a] p-4 md:p-5"><div className="flex items-center justify-between gap-4"><div><div className="flex items-center gap-2"><GitBranch aria-hidden="true" className="h-4 w-4 text-[#5aa7d7]" /><h2 className="text-sm font-semibold">Execution chain</h2></div><p className="mt-1 text-xs text-[#80929d]">The run stays legible from trigger to final side effect.</p></div><span className="font-mono text-[10px] text-[#80929d]">attempt {replayed ? "2" : "1"}</span></div><div className="mt-6 space-y-0">{currentSteps.map((step, index) => <div className="relative flex gap-3" key={step.id}>{index < currentSteps.length - 1 ? <span className={`absolute bottom-0 left-[9px] top-5 w-px ${step.status === "success" || step.status === "replayed" ? "bg-[#2a7355]" : "bg-[#2d414d]"}`} /> : null}<span className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full ${stepTone(step.status)}`}>{step.status === "success" || step.status === "replayed" ? <Check aria-hidden="true" className="h-3 w-3" /> : step.status === "failed" ? <XCircle aria-hidden="true" className="h-3 w-3" /> : step.status === "blocked" ? <AlertTriangle aria-hidden="true" className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</span><div className="min-w-0 flex-1 pb-6"><div className="flex flex-wrap items-baseline justify-between gap-3"><p className="text-xs font-medium">{step.label}</p><p className="font-mono text-[10px] text-[#71838e]">{step.timestamp}</p></div><p className={`mt-1 text-[11px] leading-5 ${step.status === "failed" ? "text-[#ef928b]" : step.status === "blocked" ? "text-[#e6b96d]" : step.status === "replayed" ? "text-[#77d7a7]" : "text-[#899aa3]"}`}>{step.detail}</p></div></div>)}</div></section>

    {replayed ? <div className="mt-5 rounded-xl border border-[#2c7757] bg-[#10271e] p-4"><div className="flex items-start gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#55c28a]" /><div><p className="text-xs font-semibold text-[#8be0b5]">Replay completed safely</p><p className="mt-1 text-xs leading-5 text-[#a4cbb5]">Checkpoint 04 and the blocked finalize step completed on attempt 2. The first three ledger actions were preserved exactly once.</p></div></div></div> : null}

    <section className="mt-5 overflow-hidden rounded-xl border border-[#2b3d48] bg-[#0c141a]"><button className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-xs font-medium text-[#b4c4cc] transition-colors hover:bg-white/[0.04]" onClick={() => setPayloadOpen(!payloadOpen)} type="button"><span className="flex items-center gap-2"><Code2 aria-hidden="true" className="h-4 w-4 text-[#5aa7d7]" />Sanitized input payload</span><span className="text-[10px] text-[#71838e]">{payloadOpen ? "Hide" : "Inspect"}</span></button>{payloadOpen ? <pre className="overflow-x-auto border-t border-[#2b3d48] px-4 py-4 font-mono text-[11px] leading-6 text-[#9fc5d9]">{run.payload}</pre> : null}</section>
  </main>;
}

function ReplayInspector({ canReplay, currentStatus, replayRun, replayed, replaying, run }: { canReplay: boolean; currentStatus: RunStatus; replayRun: () => void; replayed: boolean; replaying: boolean; run: Run }) {
  const noReplayReason = run.status === "Succeeded" ? "This run has no failure to replay." : run.status === "Skipped" ? "The idempotency guard correctly prevented duplicate work." : "Payload validation failed before a safe checkpoint existed.";
  return <aside className="border-t border-[#273640] bg-[#111b22] p-4 md:col-span-2 md:p-6 xl:col-span-1 xl:border-l xl:border-t-0"><div className="flex items-center gap-2"><ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#5aa7d7]" /><h2 className="text-xs font-semibold">Replay inspector</h2></div><div className="mt-5 border-t border-[#2b3d48] pt-5"><p className="text-[10px] text-[#71838e]">Failure classification</p><p className={`mt-2 text-lg font-semibold ${currentStatus === "Failed" ? "text-[#ef928b]" : "text-[#77d7a7]"}`}>{replayed ? "Recovered" : run.failure}</p><p className="mt-2 text-xs leading-5 text-[#91a2ab]">{replayed ? "The provider acknowledged the side effect on a controlled replay." : run.failureDetail}</p></div><div className="mt-6 space-y-5 border-t border-[#2b3d48] pt-5"><div><p className="text-[10px] text-[#71838e]">Safe checkpoint</p><p className="mt-1 font-mono text-xs text-[#c2d0d7]">{run.checkpoint}</p></div><div><p className="text-[10px] text-[#71838e]">Idempotency key</p><p className="mt-1 break-all font-mono text-[11px] leading-5 text-[#9fc5d9]">{run.idempotency}</p></div><div><p className="text-[10px] text-[#71838e]">Completed before failure</p><p className="mt-1 text-xs text-[#c2d0d7]">{replayed ? "3 / 3 preserved" : run.replayable ? "3 / 3 preserved" : "0 / 0"}</p></div></div>{run.replayable && !replayed ? <button className="mt-7 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#e6a448] px-4 text-xs font-semibold text-[#201606] transition-colors hover:bg-[#f1b45c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6a448] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111b22] disabled:cursor-wait disabled:opacity-70" disabled={!canReplay} onClick={replayRun} type="button">{replaying ? <><LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />Replaying checkpoint…</> : <><Play aria-hidden="true" className="h-4 w-4" />Replay safe checkpoint</>}</button> : null}{!run.replayable ? <div className="mt-7 rounded-lg border border-[#2b3d48] bg-[#0c141a] p-3"><p className="text-[10px] leading-5 text-[#81929c]">{noReplayReason}</p></div> : null}<div className="mt-7 border-t border-[#2b3d48] pt-5"><p className="flex items-center gap-2 text-[10px] font-medium text-[#91a2ab]"><LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />Replay policy</p><p className="mt-2 text-[10px] leading-5 text-[#71838e]">Only provider-boundary failures may replay. Payload errors need correction upstream; duplicate events stay closed.</p></div></aside>;
}
