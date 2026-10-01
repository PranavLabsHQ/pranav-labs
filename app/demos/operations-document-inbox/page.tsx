import type { Metadata } from "next";

import { OperationsDocumentInboxDemo } from "@/components/demos/OperationsDocumentInboxDemo";

export const metadata: Metadata = {
  title: "Operations Document Inbox Demo",
  description:
    "Review AI-extracted purchase-order, challan, and invoice data with source evidence, deterministic validation, and human approval.",
};

export default function OperationsDocumentInboxPage() {
  return <OperationsDocumentInboxDemo />;
}
