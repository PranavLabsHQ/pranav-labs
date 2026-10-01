import type { Metadata } from "next";

import { TrialToRenewalDemo } from "@/components/demos/TrialToRenewalDemo";

export const metadata: Metadata = {
  title: "Trial-to-Renewal Demo",
  description:
    "Explore a working Pranav Labs demo for managing gym trials, follow-ups, and renewal risk.",
};

export default function TrialToRenewalDemoPage() {
  return <TrialToRenewalDemo />;
}
