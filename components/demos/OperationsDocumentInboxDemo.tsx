"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  Download,
  FileCheck2,
  RefreshCcw,
  ScanLine,
  ShieldCheck,
  XCircle,
} from "lucide-react";

type DocumentType = "Purchase order" | "Delivery challan" | "Invoice";
type Highlight = "supplier" | "reference" | "quantity" | "tax" | "total";
type Issue = "clean" | "quantity" | "missing-reference" | "tax" | "low-confidence" | "duplicate";
type ReviewStatus = "Review" | "Ready" | "Approved" | "Duplicate";

type DocumentPack = {
  id: string;
  supplier: string;
  invoice: string;
  issue: Issue;
  issueLabel: string;
  expectedPoRef: string;
  extractedPoRef: string;
  poQty: number;
  receivedQty: number;
  invoiceQty: number;
  unitRate: number;
  taxRate: number;
  extractedTax: number;
  confidence: number;
};

type ExtractedState = {
  poRef: string;
  invoiceQty: number;
  tax: number;
};

const packs: DocumentPack[] = [
  { id: "PK-2408", supplier: "Apex Cooling Parts", invoice: "ACP-8821", issue: "quantity", issueLabel: "Quantity variance", expectedPoRef: "PO-4612", extractedPoRef: "PO-4612", poQty: 12, receivedQty: 10, invoiceQty: 12, unitRate: 1850, taxRate: 18, extractedTax: 3996, confidence: 96 },
  { id: "PK-2409", supplier: "Nirman Industrial", invoice: "NI-1704", issue: "clean", issueLabel: "Clean match", expectedPoRef: "PO-4615", extractedPoRef: "PO-4615", poQty: 8, receivedQty: 8, invoiceQty: 8, unitRate: 2400, taxRate: 18, extractedTax: 3456, confidence: 98 },
  { id: "PK-2410", supplier: "Orbit Electricals", invoice: "OE-5540", issue: "missing-reference", issueLabel: "Missing PO reference", expectedPoRef: "PO-4618", extractedPoRef: "", poQty: 20, receivedQty: 20, invoiceQty: 20, unitRate: 620, taxRate: 18, extractedTax: 2232, confidence: 91 },
  { id: "PK-2411", supplier: "Harshita Packaging", invoice: "HP-1038", issue: "tax", issueLabel: "Tax variance", expectedPoRef: "PO-4620", extractedPoRef: "PO-4620", poQty: 50, receivedQty: 50, invoiceQty: 50, unitRate: 180, taxRate: 18, extractedTax: 810, confidence: 97 },
  { id: "PK-2412", supplier: "Coastal Pumps", invoice: "CP-7302", issue: "low-confidence", issueLabel: "Low-confidence total", expectedPoRef: "PO-4624", extractedPoRef: "PO-4624", poQty: 4, receivedQty: 4, invoiceQty: 4, unitRate: 7400, taxRate: 18, extractedTax: 5328, confidence: 67 },
  { id: "PK-2413", supplier: "Apex Cooling Parts", invoice: "ACP-8794", issue: "duplicate", issueLabel: "Possible duplicate", expectedPoRef: "PO-4589", extractedPoRef: "PO-4589", poQty: 6, receivedQty: 6, invoiceQty: 6, unitRate: 1850, taxRate: 18, extractedTax: 1998, confidence: 99 },
];

function initialExtracted(pack: DocumentPack): ExtractedState {
  return {
    poRef: pack.extractedPoRef,
    invoiceQty: pack.invoiceQty,
    tax: pack.extractedTax,
  };
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function statusTone(status: ReviewStatus) {
  if (status === "Approved") return "bg-[#dff2ea] text-[#287760] dark:bg-[#12372c] dark:text-[#7ed3b7]";
  if (status === "Duplicate") return "bg-[#f4e4e2] text-[#a4403b] dark:bg-[#3b1f1f] dark:text-[#ee9993]";
  if (status === "Ready") return "bg-[#e3edf7] text-[#225d9a] dark:bg-[#142c46] dark:text-[#89b6e6]";
  return "bg-[#fff0d7] text-[#94600d] dark:bg-[#382a13] dark:text-[#efbd67]";
}

export function OperationsDocumentInboxDemo() {
  const [selectedId, setSelectedId] = useState(packs[0].id);
  const [documentType, setDocumentType] = useState<DocumentType>("Invoice");
  const [highlight, setHighlight] = useState<Highlight>("quantity");
  const [extracted, setExtracted] = useState<ExtractedState>(initialExtracted(packs[0]));
  const [humanConfirmed, setHumanConfirmed] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, ReviewStatus>>(
    Object.fromEntries(packs.map((pack) => [pack.id, pack.issue === "clean" ? "Ready" : "Review"])),
  );
  const [notice, setNotice] = useState("Quantity mismatch found across PO, challan, and invoice. Review the source evidence.");

  const pack = packs.find((item) => item.id === selectedId) ?? packs[0];
  const expectedTax = Math.round(pack.unitRate * extracted.invoiceQty * (pack.taxRate / 100));
  const subtotal = pack.unitRate * extracted.invoiceQty;
  const total = subtotal + extracted.tax;

  const validations = useMemo(
    () => [
      {
        id: "reference",
        label: "PO reference present",
        detail: extracted.poRef ? extracted.poRef : "No reference extracted",
        pass: extracted.poRef === pack.expectedPoRef,
      },
      {
        id: "quantity",
        label: "Invoice quantity matches receipt",
        detail: `${extracted.invoiceQty} invoiced / ${pack.receivedQty} received`,
        pass: extracted.invoiceQty === pack.receivedQty,
      },
      {
        id: "tax",
        label: "Tax recalculates at 18%",
        detail: `${currency.format(extracted.tax)} extracted / ${currency.format(expectedTax)} expected`,
        pass: extracted.tax === expectedTax,
      },
      {
        id: "duplicate",
        label: "Invoice number is unique",
        detail: pack.issue === "duplicate" ? "Matches approved invoice ACP-8794" : "No prior approved match",
        pass: pack.issue !== "duplicate",
      },
    ],
    [expectedTax, extracted.invoiceQty, extracted.poRef, extracted.tax, pack],
  );

  const rulesPass = validations.every((item) => item.pass);
  const confidencePass = pack.confidence >= 80 || humanConfirmed;
  const canApprove = rulesPass && confidencePass && statuses[pack.id] !== "Approved";

  function selectPack(nextPack: DocumentPack) {
    setSelectedId(nextPack.id);
    setExtracted(initialExtracted(nextPack));
    setHumanConfirmed(false);
    setDocumentType("Invoice");
    setHighlight(nextPack.issue === "missing-reference" ? "reference" : nextPack.issue === "tax" ? "tax" : nextPack.issue === "low-confidence" ? "total" : "quantity");
    setNotice(
      nextPack.issue === "clean"
        ? "All deterministic checks pass. Human approval is still required."
        : `${nextPack.issueLabel} requires review. Source evidence is highlighted.`,
    );
  }

  function applyCorrection() {
    if (pack.issue === "quantity") {
      const correctedQty = pack.receivedQty;
      setExtracted((current) => ({
        ...current,
        invoiceQty: correctedQty,
        tax: Math.round(pack.unitRate * correctedQty * (pack.taxRate / 100)),
      }));
      setDocumentType("Delivery challan");
      setHighlight("quantity");
      setNotice("Invoice quantity corrected to the received quantity. Tax and total were recalculated deterministically.");
    } else if (pack.issue === "missing-reference") {
      setExtracted((current) => ({ ...current, poRef: pack.expectedPoRef }));
      setDocumentType("Purchase order");
      setHighlight("reference");
      setNotice(`PO reference restored from the purchase-order source: ${pack.expectedPoRef}.`);
    } else if (pack.issue === "tax") {
      setExtracted((current) => ({ ...current, tax: expectedTax }));
      setDocumentType("Invoice");
      setHighlight("tax");
      setNotice("Tax corrected using the approved 18% rule. No model judgment was used for the calculation.");
    } else if (pack.issue === "low-confidence") {
      setHumanConfirmed(true);
      setDocumentType("Invoice");
      setHighlight("total");
      setNotice("Low-confidence total confirmed against the source page by a human reviewer.");
    }
  }

  function markDuplicate() {
    setStatuses((current) => ({ ...current, [pack.id]: "Duplicate" }));
    setNotice(`${pack.invoice} marked as a duplicate. It will not be exported for posting.`);
  }

  function approveRecord() {
    if (!canApprove) return;
    setStatuses((current) => ({ ...current, [pack.id]: "Approved" }));
    setNotice(`${pack.id} approved with its correction history and source evidence attached.`);
  }

  function exportRecord() {
    const payload = {
      packId: pack.id,
      supplier: pack.supplier,
      invoice: pack.invoice,
      poReference: extracted.poRef,
      quantity: extracted.invoiceQty,
      unitRate: pack.unitRate,
      subtotal,
      tax: extracted.tax,
      total,
      status: statuses[pack.id],
      provenance: "Synthetic Pranav Labs demo",
    };
    const href = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = `${pack.id.toLowerCase()}-approved.json`;
    anchor.click();
    URL.revokeObjectURL(href);
    setNotice(`${pack.id} exported as a structured JSON record.`);
  }

  function resetDemo() {
    setSelectedId(packs[0].id);
    setDocumentType("Invoice");
    setHighlight("quantity");
    setExtracted(initialExtracted(packs[0]));
    setHumanConfirmed(false);
    setStatuses(
      Object.fromEntries(packs.map((item) => [item.id, item.issue === "clean" ? "Ready" : "Review"])),
    );
    setNotice("Demo reset. Quantity mismatch found across the first document pack.");
  }

  return (
    <div className="min-h-screen bg-[#eef0ef] py-7 text-[#20252b] dark:bg-[#0a0d10] dark:text-[#f0f2f2] md:py-10">
      <div className="container-wide">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            className="inline-flex items-center gap-2 text-[#6d747a] transition-colors hover:text-[#20252b] dark:text-[#9da4a8] dark:hover:text-white"
            href="/work/case-studies/operations-document-inbox"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Case study brief
          </Link>
          <p className="text-xs text-[#747b81] dark:text-[#969da1]">
            Interactive prototype · Six synthetic document packs · No ERP connection
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.15rem] border border-[#ced3d3] bg-[#f7f8f6] shadow-[0_24px_80px_rgba(32,37,43,0.14)] dark:border-white/10 dark:bg-[#111519] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <header className="flex flex-col gap-3 border-b border-[#d9dddd] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#111519] sm:flex-row sm:items-center sm:justify-between md:px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#225d9a] text-white">
                <FileCheck2 aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Ledgerlane Review Desk</p>
                <p className="text-xs text-[#788086]">Accounts operations · October intake</p>
              </div>
            </div>
            <button
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#d1d6d6] px-3 text-xs font-medium transition-colors hover:bg-[#f2f4f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#225d9a] dark:border-white/10 dark:hover:bg-white/[0.05]"
              onClick={resetDemo}
              type="button"
            >
              <RefreshCcw aria-hidden="true" className="h-3.5 w-3.5" />
              Reset demo
            </button>
          </header>

          <div className="grid grid-cols-3 border-b border-[#d9dddd] bg-[#f2f4f3] dark:border-white/10 dark:bg-[#0d1115]">
            {[
              { label: "Extracted", detail: "Model output with confidence", icon: BrainCircuit },
              { label: "Validated", detail: "Deterministic business rules", icon: ShieldCheck },
              { label: "Approved", detail: "Human decision and audit trail", icon: UserCheckIcon },
            ].map(({ label, detail, icon: StepIcon }, index) => {
              return (
                <div className={`flex items-start gap-2 px-3 py-3 md:px-5 ${index > 0 ? "border-l border-[#d9dddd] dark:border-white/10" : ""}`} key={label}>
                  <StepIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#225d9a] dark:text-[#89b6e6]" />
                  <div>
                    <p className="text-xs font-semibold">{label}</p>
                    <p className="mt-0.5 hidden text-[10px] text-[#7d848a] sm:block">{detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-[#d9dddd] bg-[#fff8ea] px-4 py-3 dark:border-white/10 dark:bg-[#241d11] md:px-5">
            <p aria-live="polite" className="flex items-center gap-2 text-xs text-[#76551c] dark:text-[#e8bd6d]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c98516]" />
              {notice}
            </p>
          </div>

          <div className="grid min-h-[820px] md:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_22rem]">
            <InboxQueue packs={packs} selectPack={selectPack} selectedId={selectedId} statuses={statuses} />

            <DocumentWorkspace
              documentType={documentType}
              extracted={extracted}
              highlight={highlight}
              pack={pack}
              setDocumentType={setDocumentType}
            />

            <ReviewPanel
              approveRecord={approveRecord}
              applyCorrection={applyCorrection}
              canApprove={canApprove}
              expectedTax={expectedTax}
              exportRecord={exportRecord}
              extracted={extracted}
              humanConfirmed={humanConfirmed}
              markDuplicate={markDuplicate}
              pack={pack}
              setDocumentType={setDocumentType}
              setHighlight={setHighlight}
              status={statuses[pack.id]}
              subtotal={subtotal}
              total={total}
              validations={validations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserCheckIcon({ className }: { className?: string }) {
  return <CheckCircle2 className={className} />;
}

function InboxQueue({
  packs,
  selectPack,
  selectedId,
  statuses,
}: {
  packs: DocumentPack[];
  selectPack: (pack: DocumentPack) => void;
  selectedId: string;
  statuses: Record<string, ReviewStatus>;
}) {
  return (
    <aside className="border-b border-[#d9dddd] bg-[#f0f2f1] p-3 dark:border-white/10 dark:bg-[#0d1115] md:border-b-0 md:border-r">
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-xs font-semibold">Document inbox</h2>
        <span className="text-[10px] tabular-nums text-[#81888d]">6 packs</span>
      </div>
      <div className="mt-1 flex gap-2 overflow-x-auto pb-1 md:block md:space-y-1">
        {packs.map((pack) => {
          const selected = selectedId === pack.id;
          const status = statuses[pack.id];
          return (
            <button
              className={`min-w-64 rounded-lg border p-3 text-left transition-colors md:w-full md:min-w-0 ${
                selected
                  ? "border-[#9ebbd8] bg-white shadow-sm dark:border-[#315e89] dark:bg-[#16212b]"
                  : "border-transparent hover:bg-white/70 dark:hover:bg-white/[0.04]"
              }`}
              key={pack.id}
              onClick={() => selectPack(pack)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-medium text-[#225d9a] dark:text-[#89b6e6]">{pack.id}</span>
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${statusTone(status)}`}>{status}</span>
              </div>
              <p className="mt-2 truncate text-xs font-semibold">{pack.supplier}</p>
              <p className="mt-1 text-[10px] text-[#747c81] dark:text-[#9ca4a8]">{pack.issueLabel}</p>
              <div className="mt-3 flex items-center justify-between text-[10px] text-[#899095]">
                <span>{pack.invoice}</span>
                <ChevronRight aria-hidden="true" className="h-3 w-3" />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function DocumentWorkspace({
  documentType,
  extracted,
  highlight,
  pack,
  setDocumentType,
}: {
  documentType: DocumentType;
  extracted: ExtractedState;
  highlight: Highlight;
  pack: DocumentPack;
  setDocumentType: (type: DocumentType) => void;
}) {
  const docs: DocumentType[] = ["Purchase order", "Delivery challan", "Invoice"];

  return (
    <main className="min-w-0 bg-[#e4e6e4] p-3 dark:bg-[#161a1e] md:p-5">
      <div className="flex items-center justify-between gap-4 overflow-x-auto rounded-t-lg border border-b-0 border-[#cbd0cf] bg-[#f7f8f6] px-2 py-2 dark:border-white/10 dark:bg-[#111519]">
        <div className="flex gap-1">
          {docs.map((doc) => (
            <button
              aria-pressed={documentType === doc}
              className={`h-8 whitespace-nowrap rounded-md px-3 text-[11px] font-medium transition-colors ${
                documentType === doc
                  ? "bg-[#20252b] text-white dark:bg-white dark:text-[#20252b]"
                  : "text-[#6f767b] hover:bg-[#e9ecea] dark:text-[#a1a8ac] dark:hover:bg-white/[0.06]"
              }`}
              key={doc}
              onClick={() => setDocumentType(doc)}
              type="button"
            >
              {doc}
            </button>
          ))}
        </div>
        <span className="hidden items-center gap-1.5 text-[10px] text-[#7e858a] sm:flex">
          <ScanLine aria-hidden="true" className="h-3.5 w-3.5" />
          Source page 1 of 1
        </span>
      </div>

      <div className="grid min-h-[690px] place-items-start overflow-auto rounded-b-lg border border-[#cbd0cf] bg-[#d6d9d7] p-4 dark:border-white/10 dark:bg-[#20252a] md:p-7">
        <DocumentPage documentType={documentType} extracted={extracted} highlight={highlight} pack={pack} />
      </div>
    </main>
  );
}

function DocumentPage({
  documentType,
  extracted,
  highlight,
  pack,
}: {
  documentType: DocumentType;
  extracted: ExtractedState;
  highlight: Highlight;
  pack: DocumentPack;
}) {
  const isInvoice = documentType === "Invoice";
  const isChallan = documentType === "Delivery challan";
  const quantity = isChallan ? pack.receivedQty : isInvoice ? extracted.invoiceQty : pack.poQty;
  const docNumber = isInvoice ? pack.invoice : isChallan ? `DC-${pack.id.slice(-4)}` : pack.expectedPoRef;
  const heading = isInvoice ? "Tax invoice" : isChallan ? "Delivery challan" : "Purchase order";
  const subtotal = pack.unitRate * quantity;
  const tax = isInvoice ? extracted.tax : Math.round(subtotal * (pack.taxRate / 100));

  function marked(field: Highlight) {
    const fieldDoc = field === "reference" ? "Purchase order" : field === "quantity" && isChallan ? "Delivery challan" : "Invoice";
    return highlight === field && documentType === fieldDoc;
  }

  return (
    <article className="relative aspect-[1/1.414] w-full max-w-[540px] overflow-hidden bg-[#fbfbf8] p-[7%] text-[#252a2e] shadow-[0_12px_35px_rgba(32,37,43,0.2)]">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#225d9a]" />
      <header className="flex items-start justify-between border-b-2 border-[#252a2e] pb-5">
        <div>
          <p className="text-[9px] font-semibold text-[#225d9a]">{pack.supplier}</p>
          <p className="mt-1 text-[7px] leading-3 text-[#747a7e]">Industrial supply division<br />Mumbai, Maharashtra</p>
        </div>
        <div className="text-right">
          <h2 className="text-base font-semibold tracking-[-0.03em]">{heading}</h2>
          <p className="mt-1 text-[8px] font-medium tabular-nums">{docNumber}</p>
        </div>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-5 text-[7px] leading-3">
        <div className={`rounded p-2 ${marked("supplier") ? "bg-[#fff0bb] outline outline-2 outline-[#c98516]" : ""}`}>
          <p className="font-semibold">Bill to</p>
          <p className="mt-1 text-[#636a6e]">Northstar Facilities Pvt Ltd<br />Andheri East, Mumbai</p>
        </div>
        <div className={`rounded p-2 ${marked("reference") ? "bg-[#fff0bb] outline outline-2 outline-[#c98516]" : ""}`}>
          <p><span className="font-semibold">PO reference:</span> {extracted.poRef || "—"}</p>
          <p className="mt-1"><span className="font-semibold">Date:</span> 01 Oct 2026</p>
          <p className="mt-1"><span className="font-semibold">GSTIN:</span> 27AAECA8821K1Z4</p>
        </div>
      </div>

      <table className="mt-7 w-full border-collapse text-left text-[7px]">
        <thead><tr className="border-y border-[#9ea3a5]"><th className="py-2 font-semibold">Description</th><th className="py-2 text-right font-semibold">Qty</th><th className="py-2 text-right font-semibold">Rate</th><th className="py-2 text-right font-semibold">Amount</th></tr></thead>
        <tbody>
          <tr className={`${marked("quantity") ? "bg-[#fff0bb] outline outline-2 outline-[#c98516]" : ""}`}>
            <td className="py-3">Copper condenser coil assembly</td>
            <td className="py-3 text-right tabular-nums">{quantity}</td>
            <td className="py-3 text-right tabular-nums">{currency.format(pack.unitRate)}</td>
            <td className="py-3 text-right tabular-nums">{currency.format(subtotal)}</td>
          </tr>
        </tbody>
      </table>

      <div className="ml-auto mt-6 w-[52%] space-y-2 text-[7px]">
        <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{currency.format(subtotal)}</span></div>
        <div className={`flex justify-between rounded p-1 ${marked("tax") ? "bg-[#fff0bb] outline outline-2 outline-[#c98516]" : ""}`}><span>GST 18%</span><span className="tabular-nums">{currency.format(tax)}</span></div>
        <div className={`flex justify-between border-t border-[#252a2e] pt-2 text-[9px] font-semibold ${marked("total") ? "bg-[#fff0bb] outline outline-2 outline-[#c98516]" : ""}`}><span>Total</span><span className="tabular-nums">{currency.format(subtotal + tax)}</span></div>
      </div>

      <div className="absolute bottom-[8%] left-[7%] right-[7%] flex items-end justify-between border-t border-[#c9cdcc] pt-4 text-[6px] text-[#777d80]">
        <p>Computer-generated {heading.toLowerCase()}<br />Synthetic demonstration record</p>
        <div className="text-right"><p className="font-semibold text-[#383d40]">Authorised signatory</p><p className="mt-1">Apex Operations</p></div>
      </div>
    </article>
  );
}

type Validation = {
  id: string;
  label: string;
  detail: string;
  pass: boolean;
};

function ReviewPanel({
  approveRecord,
  applyCorrection,
  canApprove,
  expectedTax,
  exportRecord,
  extracted,
  humanConfirmed,
  markDuplicate,
  pack,
  setDocumentType,
  setHighlight,
  status,
  subtotal,
  total,
  validations,
}: {
  approveRecord: () => void;
  applyCorrection: () => void;
  canApprove: boolean;
  expectedTax: number;
  exportRecord: () => void;
  extracted: ExtractedState;
  humanConfirmed: boolean;
  markDuplicate: () => void;
  pack: DocumentPack;
  setDocumentType: (type: DocumentType) => void;
  setHighlight: (field: Highlight) => void;
  status: ReviewStatus;
  subtotal: number;
  total: number;
  validations: Validation[];
}) {
  const correctionNeeded = pack.issue !== "clean" && pack.issue !== "duplicate" && !validations.every((item) => item.pass) || (pack.issue === "low-confidence" && !humanConfirmed);

  function inspect(field: Highlight, document: DocumentType) {
    setHighlight(field);
    setDocumentType(document);
  }

  return (
    <aside className="border-t border-[#d9dddd] bg-white p-4 dark:border-white/10 dark:bg-[#111519] md:col-span-2 md:p-5 xl:col-span-1 xl:border-l xl:border-t-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium text-[#225d9a] dark:text-[#89b6e6]">{pack.id}</p>
          <h2 className="mt-1 text-sm font-semibold">Extracted record</h2>
        </div>
        <span className={`rounded px-2 py-1 text-[10px] font-medium ${statusTone(status)}`}>{status}</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-[#d8dddd] dark:border-white/10">
        <FieldRow confidence={99} label="Supplier" onClick={() => inspect("supplier", "Invoice")} value={pack.supplier} />
        <FieldRow confidence={pack.confidence} label="PO reference" onClick={() => inspect("reference", "Purchase order")} value={extracted.poRef || "Not found"} warning={!extracted.poRef} />
        <FieldRow confidence={96} label="Invoice quantity" onClick={() => inspect("quantity", "Invoice")} value={String(extracted.invoiceQty)} warning={extracted.invoiceQty !== pack.receivedQty} />
        <FieldRow confidence={98} label="Unit rate" onClick={() => inspect("quantity", "Invoice")} value={currency.format(pack.unitRate)} />
        <FieldRow confidence={pack.issue === "tax" ? 88 : 97} label="Tax" onClick={() => inspect("tax", "Invoice")} value={currency.format(extracted.tax)} warning={extracted.tax !== expectedTax} />
        <FieldRow confidence={pack.confidence} label="Invoice total" onClick={() => inspect("total", "Invoice")} value={currency.format(total)} warning={pack.confidence < 80 && !humanConfirmed} />
      </div>

      <section className="mt-7">
        <div className="flex items-center gap-2">
          <Database aria-hidden="true" className="h-4 w-4 text-[#225d9a] dark:text-[#89b6e6]" />
          <h2 className="text-xs font-semibold">Deterministic checks</h2>
        </div>
        <div className="mt-3 space-y-2">
          {validations.map((validation) => (
            <div className="flex items-start gap-2 rounded-lg bg-[#f5f6f4] p-3 dark:bg-white/[0.04]" key={validation.id}>
              {validation.pass ? (
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#287760] dark:text-[#7ed3b7]" />
              ) : (
                <XCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#b44a4a] dark:text-[#ee9993]" />
              )}
              <div>
                <p className="text-[11px] font-medium">{validation.label}</p>
                <p className="mt-1 text-[10px] leading-4 text-[#7b8287] dark:text-[#9da4a8]">{validation.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {correctionNeeded ? (
        <button
          className="mt-5 flex w-full items-center justify-between rounded-lg border border-[#e1c087] bg-[#fff8ea] px-3 py-3 text-left text-xs font-medium text-[#76551c] transition-colors hover:bg-[#fff3d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c98516] dark:border-[#694a1d] dark:bg-[#241d11] dark:text-[#e8bd6d]"
          onClick={applyCorrection}
          type="button"
        >
          <span>{pack.issue === "low-confidence" ? "Confirm against source page" : "Apply suggested correction"}</span>
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}

      {pack.issue === "duplicate" && status !== "Duplicate" ? (
        <button
          className="mt-5 flex w-full items-center justify-between rounded-lg border border-[#dfb4b1] bg-[#fbefee] px-3 py-3 text-left text-xs font-medium text-[#93413d] transition-colors hover:bg-[#f9e5e3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b44a4a] dark:border-[#60302e] dark:bg-[#281717] dark:text-[#ee9993]"
          onClick={markDuplicate}
          type="button"
        >
          <span>Mark duplicate and close</span>
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}

      <div className="mt-7 border-t border-[#d9dddd] pt-5 dark:border-white/10">
        <div className="flex items-center justify-between text-xs"><span className="text-[#737b80]">Subtotal</span><span className="font-medium tabular-nums">{currency.format(subtotal)}</span></div>
        <div className="mt-2 flex items-center justify-between text-xs"><span className="text-[#737b80]">Tax</span><span className="font-medium tabular-nums">{currency.format(extracted.tax)}</span></div>
        <div className="mt-3 flex items-center justify-between border-t border-[#d9dddd] pt-3 text-sm font-semibold dark:border-white/10"><span>{status === "Approved" ? "Approved total" : "Calculated total"}</span><span className="tabular-nums">{currency.format(total)}</span></div>
      </div>

      {status === "Approved" ? (
        <button
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#287760] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#206451] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#287760] focus-visible:ring-offset-2"
          onClick={exportRecord}
          type="button"
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Export approved JSON
        </button>
      ) : (
        <button
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#225d9a] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#194d82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#225d9a] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#a5adb1]"
          disabled={!canApprove}
          onClick={approveRecord}
          type="button"
        >
          <FileCheck2 aria-hidden="true" className="h-4 w-4" />
          Approve record
        </button>
      )}

      <p className="mt-3 text-center text-[10px] leading-4 text-[#81888d]">
        Approval records the reviewer decision, corrections, rule results, and source references.
      </p>
    </aside>
  );
}

function FieldRow({
  confidence,
  label,
  onClick,
  value,
  warning = false,
}: {
  confidence: number;
  label: string;
  onClick: () => void;
  value: string;
  warning?: boolean;
}) {
  return (
    <button
      className="flex w-full items-center justify-between gap-3 border-b border-[#e4e7e6] px-3 py-3 text-left transition-colors last:border-b-0 hover:bg-[#f4f6f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#225d9a] dark:border-white/[0.07] dark:hover:bg-white/[0.04]"
      onClick={onClick}
      type="button"
    >
      <div className="min-w-0">
        <p className="text-[10px] text-[#7d8489]">{label}</p>
        <p className={`mt-1 truncate text-xs font-medium ${warning ? "text-[#9a5b12] dark:text-[#e8bd6d]" : ""}`}>{value}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-[10px] font-medium tabular-nums ${confidence < 80 ? "text-[#b44a4a] dark:text-[#ee9993]" : "text-[#7a8287]"}`}>{confidence}%</p>
        <p className="mt-0.5 text-[8px] text-[#9aa0a4]">confidence</p>
      </div>
    </button>
  );
}
