import type { Metadata } from "next";

import { QuoteToStatusDemo } from "@/components/demos/QuoteToStatusDemo";

export const metadata: Metadata = {
  title: "Quote-to-Status Demo",
  description:
    "Turn a messy business enquiry into an owner-approved quote and a simple customer status page.",
};

export default function QuoteToStatusPage() {
  return <QuoteToStatusDemo />;
}
