"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clipboard,
  FileText,
  Link2,
  MapPin,
  MessageCircle,
  PackageCheck,
  RefreshCcw,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";

type Mode = "intake" | "quote" | "status";
type Stage = "Received" | "Quote drafted" | "Approved" | "In production" | "Ready for dispatch" | "Delivered";

type LineItem = {
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  rate: number;
};

type Enquiry = {
  id: string;
  customer: string;
  phone: string;
  location: string;
  received: string;
  message: string;
  items: LineItem[];
  clarification: string;
};

const initialEnquiries: Enquiry[] = [
  {
    id: "QN-031",
    customer: "Nikhil Shah",
    phone: "+91 98204 11824",
    location: "Andheri West",
    received: "10 min ago",
    message: "Bhai 24 by 18 ka ACP front chahiye, matte black. Side frame 12 ft. Sunday tak estimate bhej do. Site measure kar lena please.",
    items: [
      { name: "ACP front panel", specification: "24 × 18 ft · matte black", quantity: 432, unit: "sq ft", rate: 145 },
      { name: "Side frame", specification: "12 ft · powder-coated", quantity: 12, unit: "ft", rate: 90 },
    ],
    clarification: "Confirm final site measurement before cutting.",
  },
  {
    id: "QN-032",
    customer: "Rhea Interiors",
    phone: "+91 98920 43018",
    location: "Bandra East",
    received: "24 min ago",
    message: "Need 6 reception panels in oak finish, 3 feet each. Please quote installation separately.",
    items: [{ name: "Reception panel", specification: "3 ft · oak finish", quantity: 6, unit: "panel", rate: 3800 }],
    clarification: "",
  },
  {
    id: "QN-033",
    customer: "Kaveri Foods",
    phone: "+91 99305 71240",
    location: "Santacruz",
    received: "1 hr ago",
    message: "Cold room door rubber replace karna hai, 2 sets. Urgent rate and earliest slot share karo.",
    items: [{ name: "Cold room gasket", specification: "Food-safe rubber · 2 sets", quantity: 2, unit: "set", rate: 2400 }],
    clarification: "",
  },
  {
    id: "QN-034",
    customer: "Studio Kanso",
    phone: "+91 97691 44803",
    location: "Khar West",
    received: "Yesterday",
    message: "Can you do 18 birch plywood shelves, 900 mm wide? Need delivery next week.",
    items: [{ name: "Birch shelf", specification: "900 mm · clear coat", quantity: 18, unit: "shelf", rate: 1650 }],
    clarification: "",
  },
];

const stageOrder: Stage[] = ["Received", "Quote drafted", "Approved", "In production", "Ready for dispatch", "Delivered"];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function stageTone(stage: Stage) {
  if (stage === "Delivered") return "bg-[#def3e9] text-[#227553] dark:bg-[#12372b] dark:text-[#83d6b6]";
  if (stage === "In production" || stage === "Ready for dispatch") return "bg-[#e5f1ef] text-[#147c83] dark:bg-[#123438] dark:text-[#7fd0cf]";
  if (stage === "Approved") return "bg-[#fff0da] text-[#986015] dark:bg-[#382912] dark:text-[#efbd67]";
  return "bg-[#e5edf8] text-[#2e5da8] dark:bg-[#162a49] dark:text-[#91b4eb]";
}

export function QuoteToStatusDemo() {
  const [mode, setMode] = useState<Mode>("intake");
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [selectedId, setSelectedId] = useState(initialEnquiries[0].id);
  const [items, setItems] = useState<LineItem[]>(initialEnquiries[0].items);
  const [parsed, setParsed] = useState(false);
  const [clarificationResolved, setClarificationResolved] = useState(false);
  const [stage, setStage] = useState<Stage>("Received");
  const [notice, setNotice] = useState("Paste or review an enquiry, then let the owner decide what becomes a quote.");
  const [copied, setCopied] = useState(false);

  const enquiry = enquiries.find((item) => item.id === selectedId) ?? enquiries[0];
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.rate, 0), [items]);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
  const readyForApproval = parsed && (!enquiry.clarification || clarificationResolved) && items.every((item) => item.quantity > 0 && item.rate > 0);
  const approved = stageOrder.indexOf(stage) >= stageOrder.indexOf("Approved");

  function selectEnquiry(next: Enquiry) {
    setSelectedId(next.id);
    setItems(next.items);
    setParsed(false);
    setClarificationResolved(false);
    setStage("Received");
    setMode("intake");
    setNotice(`${next.id} loaded. The message remains the source of truth until it is parsed.`);
  }

  function parseMessage() {
    setParsed(true);
    setMode("quote");
    setStage("Quote drafted");
    setNotice(`${enquiry.id} parsed into ${items.length} line item${items.length === 1 ? "" : "s"}. Review the rate table before approval.`);
  }

  function updateItem(index: number, key: "quantity" | "rate", value: number) {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  }

  function approveQuote() {
    if (!readyForApproval) return;
    setStage("Approved");
    setMode("status");
    setNotice(`${enquiry.id} approved by the owner. The customer status page is now shareable.`);
  }

  function advanceStage() {
    if (!approved) return;
    const currentIndex = stageOrder.indexOf(stage);
    const nextStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
    setStage(nextStage);
    setNotice(`Status updated to ${nextStage}. The customer page will show the same event.`);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`https://quoteform.demo/status/${enquiry.id.toLowerCase()}`);
    setCopied(true);
    setNotice("Customer status link copied. This prototype does not send it anywhere.");
    window.setTimeout(() => setCopied(false), 2200);
  }

  function exportQuote() {
    const payload = { id: enquiry.id, customer: enquiry.customer, items, subtotal, tax, total, stage, synthetic: true };
    const href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${enquiry.id.toLowerCase()}-quote.json`;
    anchor.click();
    URL.revokeObjectURL(href);
    setNotice(`${enquiry.id} exported as a structured quote record.`);
  }

  function resetDemo() {
    setEnquiries(initialEnquiries);
    setSelectedId(initialEnquiries[0].id);
    setItems(initialEnquiries[0].items);
    setParsed(false);
    setClarificationResolved(false);
    setStage("Received");
    setMode("intake");
    setCopied(false);
    setNotice("Demo reset. Start with the raw Hinglish enquiry in the inbox.");
  }

  return (
    <div className="min-h-screen bg-[#efeee8] py-7 text-[#222522] dark:bg-[#0b0d0c] dark:text-[#f0f2ee] md:py-10">
      <div className="container-wide">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link className="inline-flex items-center gap-2 text-[#727871] transition-colors hover:text-[#222522] dark:text-[#9ca49b] dark:hover:text-white" href="/work/case-studies/quote-to-status">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Case study brief
          </Link>
          <p className="text-xs text-[#7d837b] dark:text-[#989f96]">Interactive prototype · Synthetic enquiries · No external messages</p>
        </div>

        <div className="overflow-hidden rounded-[1.15rem] border border-[#d2d2c8] bg-[#f8f7f2] shadow-[0_24px_80px_rgba(44,48,35,0.15)] dark:border-white/10 dark:bg-[#121614] dark:shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
          <header className="flex flex-col gap-3 border-b border-[#ddddd4] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#121614] sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#23855b] text-white"><MessageCircle aria-hidden="true" className="h-5 w-5" /></div>
              <div><p className="text-sm font-semibold">Quoteform</p><p className="text-xs text-[#7d837b]">Owner-led sales desk · Mumbai</p></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-[#d5d7cf] bg-[#f4f5f0] p-1 dark:border-white/10 dark:bg-white/[0.04]">
                {([
                  { value: "intake", label: "Enquiry", icon: MessageCircle },
                  { value: "quote", label: "Quote", icon: FileText },
                  { value: "status", label: "Status", icon: PackageCheck },
                ] as const).map(({ value, label, icon: Icon }) => (
                  <button aria-pressed={mode === value} className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${mode === value ? "bg-white text-[#222522] shadow-sm dark:bg-[#263029] dark:text-white" : "text-[#707870] hover:text-[#222522] dark:text-[#9ca49b] dark:hover:text-white"}`} key={value} onClick={() => setMode(value)} type="button">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" /><span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
              <button aria-label="Reset demo" className="grid h-10 w-10 place-items-center rounded-lg border border-[#d5d7cf] text-[#6e776e] transition-colors hover:bg-[#f1f2ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23855b] dark:border-white/10 dark:hover:bg-white/[0.05]" onClick={resetDemo} type="button"><RefreshCcw aria-hidden="true" className="h-4 w-4" /></button>
            </div>
          </header>

          <div className="grid grid-cols-3 border-b border-[#ddddd4] bg-[#f3f4ee] dark:border-white/10 dark:bg-[#0e120f]">
            {[
              { label: "Message", detail: "Raw customer input", icon: MessageCircle },
              { label: "Owner review", detail: "Price and approve", icon: ShieldCheck },
              { label: "Customer view", detail: "Share current status", icon: Link2 },
            ].map(({ label, detail, icon: Icon }, index) => (
              <div className={`flex items-start gap-2 px-3 py-3 md:px-6 ${index > 0 ? "border-l border-[#ddddd4] dark:border-white/10" : ""}`} key={label}>
                <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#23855b] dark:text-[#7bd1a9]" />
                <div><p className="text-xs font-semibold">{label}</p><p className="mt-0.5 hidden text-[10px] text-[#858b83] sm:block">{detail}</p></div>
              </div>
            ))}
          </div>

          <div className="border-b border-[#ddddd4] bg-[#fff5e5] px-4 py-3 dark:border-white/10 dark:bg-[#251b0e] md:px-6">
            <p aria-live="polite" className="flex items-center gap-2 text-xs text-[#80551b] dark:text-[#e6bb72]"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d27b24]" />{notice}</p>
          </div>

          <div className="grid min-h-[760px] md:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_22rem]">
            <EnquiryInbox enquiries={enquiries} selectedId={selectedId} selectEnquiry={selectEnquiry} stage={stage} />
            {mode === "intake" ? <IntakeView enquiry={enquiry} parsed={parsed} parseMessage={parseMessage} /> : null}
            {mode === "quote" ? <QuoteView clarificationResolved={clarificationResolved} enquiry={enquiry} exportQuote={exportQuote} items={items} parsed={parsed} readyForApproval={readyForApproval} setClarificationResolved={setClarificationResolved} updateItem={updateItem} approveQuote={approveQuote} subtotal={subtotal} tax={tax} total={total} /> : null}
            {mode === "status" ? <StatusView approved={approved} copyLink={copyLink} copied={copied} enquiry={enquiry} exportQuote={exportQuote} stage={stage} total={total} advanceStage={advanceStage} /> : null}
            <ContextPanel enquiry={enquiry} parsed={parsed} approved={approved} stage={stage} total={total} />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-xs text-[#747b73] dark:text-[#9aa29a] sm:flex-row sm:items-center sm:justify-between"><p>Built by Pranav Labs to show the boundary between parsing and owner judgment.</p><Link className="inline-flex items-center gap-1 font-medium text-[#23855b]" href="/contact">Discuss a workflow like this <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link></div>
      </div>
    </div>
  );
}

function EnquiryInbox({ enquiries, selectedId, selectEnquiry, stage }: { enquiries: Enquiry[]; selectedId: string; selectEnquiry: (enquiry: Enquiry) => void; stage: Stage }) {
  return <aside className="border-b border-[#ddddd4] bg-[#f1f2ec] p-3 dark:border-white/10 dark:bg-[#0e120f] md:border-b-0 md:border-r"><div className="flex items-center justify-between px-2 py-2"><h2 className="text-xs font-semibold">Enquiry inbox</h2><span className="text-[10px] text-[#858c83]">4 open</span></div><div className="mt-1 flex gap-2 overflow-x-auto pb-1 md:block md:space-y-1">{enquiries.map((item, index) => <button className={`min-w-64 rounded-lg border p-3 text-left transition-colors md:w-full md:min-w-0 ${selectedId === item.id ? "border-[#a7cfb8] bg-white shadow-sm dark:border-[#2f7654] dark:bg-[#18271f]" : "border-transparent hover:bg-white/70 dark:hover:bg-white/[0.04]"}`} key={item.id} onClick={() => selectEnquiry(item)} type="button"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-medium text-[#23855b] dark:text-[#7bd1a9]">{item.id}</span><span className="rounded bg-[#e9eee8] px-1.5 py-0.5 text-[9px] text-[#687369] dark:bg-white/[0.07] dark:text-[#a5b0a5]">{index === 0 ? stage : "Received"}</span></div><p className="mt-2 truncate text-xs font-semibold">{item.customer}</p><p className="mt-1 truncate text-[10px] text-[#747b73] dark:text-[#9ca49b]">{item.message}</p><div className="mt-3 flex items-center justify-between text-[10px] text-[#899087]"><span>{item.received}</span><ChevronRight aria-hidden="true" className="h-3 w-3" /></div></button>)}</div></aside>;
}

function IntakeView({ enquiry, parsed, parseMessage }: { enquiry: Enquiry; parsed: boolean; parseMessage: () => void }) {
  return <main className="min-w-0 bg-[#ebe9e1] p-4 dark:bg-[#1a1d1a] md:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-medium text-[#23855b] dark:text-[#7bd1a9]">Raw enquiry</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">What the customer actually said.</h1><p className="mt-2 max-w-xl text-sm leading-6 text-[#6d756c] dark:text-[#a5aea5]">Keep the conversational source visible before structured fields start looking authoritative.</p></div><MessageCircle aria-hidden="true" className="hidden h-6 w-6 text-[#23855b] md:block" /></div><div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_17rem]"><section className="rounded-xl border border-[#d4d4c9] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#202520]"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#dff1e7] text-xs font-semibold text-[#23855b] dark:bg-[#173c29] dark:text-[#7bd1a9]">NS</div><div><p className="text-xs font-semibold">{enquiry.customer}</p><p className="mt-0.5 text-[10px] text-[#858c83]">{enquiry.phone} · {enquiry.location}</p></div></div><div className="mt-6 max-w-xl rounded-2xl rounded-tl-sm bg-[#e3f1e8] px-4 py-4 text-sm leading-7 text-[#26352b] dark:bg-[#173d2a] dark:text-[#d5eadb]">{enquiry.message}</div><p className="mt-3 text-[10px] text-[#92988f]">Received in WhatsApp · {enquiry.received}</p></section><aside className="border-t-2 border-[#d27b24] pt-5"><p className="text-xs font-semibold text-[#a46019] dark:text-[#e6bb72]">Owner checkpoint</p><p className="mt-3 text-sm leading-6 text-[#697269] dark:text-[#a5aea5]">Parsing can find quantities and specs. The owner still decides whether the request is clear enough to price.</p><button className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#23855b] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#1c704b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23855b] focus-visible:ring-offset-2" onClick={parseMessage} type="button"><Send aria-hidden="true" className="h-4 w-4" />{parsed ? "Re-parse message" : "Parse into quote"}</button><p className="mt-3 text-[10px] leading-4 text-[#858c83]">This demo uses prepared extraction output. No message is sent to an external model.</p></aside></div></main>;
}

function QuoteView({ clarificationResolved, enquiry, exportQuote, items, parsed, readyForApproval, setClarificationResolved, updateItem, approveQuote, subtotal, tax, total }: { clarificationResolved: boolean; enquiry: Enquiry; exportQuote: () => void; items: LineItem[]; parsed: boolean; readyForApproval: boolean; setClarificationResolved: (value: boolean) => void; updateItem: (index: number, key: "quantity" | "rate", value: number) => void; approveQuote: () => void; subtotal: number; tax: number; total: number }) {
  if (!parsed) return <main className="grid min-h-[620px] place-items-center p-6 text-center"><div className="max-w-sm"><FileText aria-hidden="true" className="mx-auto h-8 w-8 text-[#849084]" /><h1 className="mt-5 text-xl font-semibold">Parse the enquiry before pricing it.</h1><p className="mt-3 text-sm leading-6 text-[#747b73] dark:text-[#a5aea5]">The raw customer message stays primary until the owner starts a structured quote.</p></div></main>;
  return <main className="min-w-0 bg-[#f4f2eb] p-4 dark:bg-[#181c18] md:p-7"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-medium text-[#2e5da8] dark:text-[#91b4eb]">Owner review · {enquiry.id}</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">Make the quote explain itself.</h1><p className="mt-2 text-sm leading-6 text-[#6d756c] dark:text-[#a5aea5]">Rates are editable. Clarifications stay visible. Approval is a deliberate action.</p></div><button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#d2d3ca] bg-white px-3 text-xs font-medium transition-colors hover:bg-[#f7f7f2] dark:border-white/10 dark:bg-[#202520] dark:hover:bg-white/[0.05]" onClick={exportQuote} type="button"><Clipboard aria-hidden="true" className="h-3.5 w-3.5" />Export draft</button></div><div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]"><section><div className="overflow-x-auto rounded-xl border border-[#d3d5cc] bg-white dark:border-white/10 dark:bg-[#202520]"><table className="w-full min-w-[560px] border-collapse text-left"><thead><tr className="border-b border-[#e3e4dc] text-[10px] text-[#7c847a] dark:border-white/10"><th className="px-4 py-3 font-medium">Line item</th><th className="px-4 py-3 font-medium">Quantity</th><th className="px-4 py-3 font-medium">Rate</th><th className="px-4 py-3 text-right font-medium">Amount</th></tr></thead><tbody>{items.map((item, index) => <tr className="border-b border-[#e7e8e1] last:border-b-0 dark:border-white/[0.07]" key={`${item.name}-${index}`}><td className="px-4 py-4"><p className="text-xs font-medium">{item.name}</p><p className="mt-1 text-[10px] text-[#858c83]">{item.specification}</p></td><td className="px-4 py-4"><input aria-label={`${item.name} quantity`} className="h-8 w-20 rounded-md border border-[#cfd3ca] bg-white px-2 text-xs tabular-nums outline-none focus:border-[#2e5da8] focus:ring-2 focus:ring-[#2e5da8]/20 dark:border-white/10 dark:bg-[#18201b]" min="1" onChange={(event) => updateItem(index, "quantity", Number(event.target.value))} type="number" value={item.quantity} /></td><td className="px-4 py-4"><div className="flex items-center gap-1 text-xs"><span className="text-[#858c83]">₹</span><input aria-label={`${item.name} rate`} className="h-8 w-24 rounded-md border border-[#cfd3ca] bg-white px-2 text-xs tabular-nums outline-none focus:border-[#2e5da8] focus:ring-2 focus:ring-[#2e5da8]/20 dark:border-white/10 dark:bg-[#18201b]" min="1" onChange={(event) => updateItem(index, "rate", Number(event.target.value))} type="number" value={item.rate} /></div></td><td className="px-4 py-4 text-right text-xs font-medium tabular-nums">{currency.format(item.quantity * item.rate)}</td></tr>)}</tbody></table></div><div className="mt-5 rounded-xl border border-[#e2bf88] bg-[#fff8e9] p-4 dark:border-[#6c4c1c] dark:bg-[#251d10]"><div className="flex items-start gap-3"><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${clarificationResolved ? "bg-[#23855b] text-white" : "bg-[#d27b24] text-white"}`}>{clarificationResolved ? <Check aria-hidden="true" className="h-3 w-3" /> : "!"}</span><div className="min-w-0"><p className="text-xs font-semibold text-[#80551b] dark:text-[#e6bb72]">Clarification before production</p><p className="mt-1 text-xs leading-5 text-[#856b42] dark:text-[#d4b67a]">{enquiry.clarification || "No open clarification. This quote can move to owner approval."}</p>{enquiry.clarification ? <button className="mt-3 text-xs font-semibold text-[#a46019] underline underline-offset-2" onClick={() => setClarificationResolved(!clarificationResolved)} type="button">{clarificationResolved ? "Undo confirmation" : "Confirm owner will measure on site"}</button> : null}</div></div></div></section><aside className="border-t-2 border-[#d27b24] pt-5 xl:border-t-0 xl:border-l-2 xl:pl-5"><p className="text-xs font-semibold text-[#a46019] dark:text-[#e6bb72]">Approval boundary</p><p className="mt-3 text-sm leading-6 text-[#697269] dark:text-[#a5aea5]">The draft can be parsed automatically. The owner decides whether the numbers and open questions are safe to send.</p><div className="mt-6 space-y-3 border-t border-[#dedfd7] pt-5 text-xs dark:border-white/10"><div className="flex justify-between"><span className="text-[#7d857b]">Subtotal</span><span className="tabular-nums">{currency.format(subtotal)}</span></div><div className="flex justify-between"><span className="text-[#7d857b]">GST 18%</span><span className="tabular-nums">{currency.format(tax)}</span></div><div className="flex justify-between border-t border-[#dedfd7] pt-3 text-sm font-semibold dark:border-white/10"><span>Total to customer</span><span className="tabular-nums">{currency.format(total)}</span></div></div><button className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2e5da8] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#244e90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e5da8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#a7b0bb]" disabled={!readyForApproval} onClick={approveQuote} type="button"><ShieldCheck aria-hidden="true" className="h-4 w-4" />Approve and share quote</button>{!readyForApproval ? <p className="mt-3 text-center text-[10px] leading-4 text-[#9a671c]">Resolve the open clarification before approval.</p> : <p className="mt-3 text-center text-[10px] leading-4 text-[#758075]">This changes the customer status from draft to approved.</p>}</aside></div></main>;
}

function StatusView({ approved, copyLink, copied, enquiry, exportQuote, stage, total, advanceStage }: { approved: boolean; copyLink: () => void; copied: boolean; enquiry: Enquiry; exportQuote: () => void; stage: Stage; total: number; advanceStage: () => void }) {
  return <main className="min-w-0 bg-[#eef3f0] p-4 dark:bg-[#15201a] md:p-7"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-medium text-[#147c83] dark:text-[#7fd0cf]">Customer status preview · {enquiry.id}</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">A quiet page for “where is my order?”</h1><p className="mt-2 text-sm leading-6 text-[#68776e] dark:text-[#a5b4a8]">Only the approved facts appear here. Internal notes and rate decisions stay private.</p></div><div className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${stageTone(stage)}`}>{stage}</div></div><div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]"><section className="rounded-xl border border-[#cbdad2] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1d2b22] md:p-7"><div className="flex items-start justify-between gap-4 border-b border-[#e0e8e2] pb-5 dark:border-white/10"><div><p className="text-xs text-[#7c897f]">Quoteform status link</p><h2 className="mt-2 text-xl font-semibold">{enquiry.customer}</h2><p className="mt-1 text-xs text-[#738077]">{enquiry.location} · Prepared for customer review</p></div><div className="grid h-10 w-10 place-items-center rounded-full bg-[#def3e9] text-[#23855b] dark:bg-[#12372b] dark:text-[#83d6b6]"><PackageCheck aria-hidden="true" className="h-5 w-5" /></div></div><div className="mt-7 space-y-0">{stageOrder.slice(0, approved ? stageOrder.length : 2).map((item, index, visible) => { const complete = stageOrder.indexOf(stage) >= index; return <div className="relative flex gap-4" key={item}>{index < visible.length - 1 ? <span className={`absolute bottom-0 left-[9px] top-5 w-px ${complete ? "bg-[#23855b]" : "bg-[#d5dfd8]"}`} /> : null}<span className={`relative z-10 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${complete ? "border-[#23855b] bg-[#23855b] text-white" : "border-[#b9cbbf] bg-white text-transparent"}`}><Check aria-hidden="true" className="h-3 w-3" /></span><div className="pb-6"><p className={`text-xs font-medium ${complete ? "" : "text-[#849087]"}`}>{item}</p><p className="mt-1 text-[10px] text-[#869289]">{complete ? (index === 0 ? "Enquiry received" : index === 1 ? "Quote approved by owner" : "Updated in the workshop") : "Waiting for next update"}</p></div></div>; })}</div><div className="mt-2 flex items-center justify-between border-t border-[#e0e8e2] pt-5 dark:border-white/10"><div><p className="text-xs text-[#7c897f]">Approved quote total</p><p className="mt-1 text-xl font-semibold tabular-nums">{approved ? currency.format(total) : "Pending approval"}</p></div><span className="text-[10px] text-[#7c897f]">No account required</span></div></section><aside className="border-t-2 border-[#147c83] pt-5"><p className="text-xs font-semibold text-[#147c83] dark:text-[#7fd0cf]">Customer-safe actions</p><button className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#147c83] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#106d73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147c83] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#a9b5b0]" disabled={!approved} onClick={copyLink} type="button"><Link2 aria-hidden="true" className="h-4 w-4" />{copied ? "Link copied" : "Copy customer link"}</button><button className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#cbdad2] bg-white px-3 text-xs font-medium transition-colors hover:bg-[#f4f7f4] dark:border-white/10 dark:bg-transparent dark:hover:bg-white/[0.05]" onClick={advanceStage} disabled={!approved || stage === "Delivered"} type="button"><Truck aria-hidden="true" className="h-4 w-4" />{stage === "Delivered" ? "Delivered" : "Advance internal status"}</button><button className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#cbdad2] bg-white px-3 text-xs font-medium transition-colors hover:bg-[#f4f7f4] dark:border-white/10 dark:bg-transparent dark:hover:bg-white/[0.05]" onClick={exportQuote} type="button"><Clipboard aria-hidden="true" className="h-4 w-4" />Export quote JSON</button><p className="mt-5 text-[10px] leading-4 text-[#7b887f]">A production version would authenticate this link, expire it, and log every status change.</p></aside></div></main>;
}

function ContextPanel({ enquiry, parsed, approved, stage, total }: { enquiry: Enquiry; parsed: boolean; approved: boolean; stage: Stage; total: number }) {
  return <aside className="border-t border-[#ddddd4] bg-white p-4 dark:border-white/10 dark:bg-[#121614] md:col-span-2 md:p-5 xl:col-span-1 xl:border-l xl:border-t-0"><div className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-4 w-4 text-[#23855b] dark:text-[#7bd1a9]" /><h2 className="text-xs font-semibold">Request context</h2></div><dl className="mt-5 space-y-4 text-xs"><div><dt className="text-[10px] text-[#858c83]">Customer</dt><dd className="mt-1 font-medium">{enquiry.customer}</dd></div><div><dt className="text-[10px] text-[#858c83]">Location</dt><dd className="mt-1 font-medium">{enquiry.location}</dd></div><div><dt className="text-[10px] text-[#858c83]">Source</dt><dd className="mt-1 font-medium">WhatsApp message</dd></div><div><dt className="text-[10px] text-[#858c83]">Open question</dt><dd className="mt-1 leading-5 text-[#697269] dark:text-[#a5aea5]">{enquiry.clarification || "No clarification required"}</dd></div></dl><div className="mt-7 border-t border-[#ddddd4] pt-5 dark:border-white/10"><p className="text-[10px] text-[#858c83]">Workflow state</p><div className="mt-3 space-y-2 text-xs"><div className="flex items-center justify-between"><span className="text-[#737b73]">Parsed</span><span className={parsed ? "text-[#23855b]" : "text-[#a1a8a0]"}>{parsed ? "Ready" : "Waiting"}</span></div><div className="flex items-center justify-between"><span className="text-[#737b73]">Owner</span><span className={approved ? "text-[#23855b]" : "text-[#a1a8a0]"}>{approved ? "Approved" : "Review"}</span></div><div className="flex items-center justify-between"><span className="text-[#737b73]">Status page</span><span className="text-[#147c83]">{stage}</span></div></div></div><div className="mt-7 rounded-lg bg-[#f1f4ee] p-4 dark:bg-white/[0.04]"><p className="text-[10px] text-[#858c83]">Current quote total</p><p className="mt-1 text-xl font-semibold tabular-nums">{approved ? currency.format(total) : "—"}</p><p className="mt-2 text-[10px] leading-4 text-[#7d857b]">Shown to the customer only after owner approval.</p></div></aside>;
}
