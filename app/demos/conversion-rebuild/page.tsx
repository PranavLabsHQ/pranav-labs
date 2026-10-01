import type { Metadata } from "next";

import { ConversionRebuildDemo } from "@/components/demos/ConversionRebuildDemo";

export const metadata: Metadata = {
  title: "Conversion Rebuild Demo",
  description:
    "Compare a controlled old and rebuilt local-business website across mobile clarity, performance decisions, accessibility, and conversion paths.",
};

export default function ConversionRebuildDemoPage() {
  return <ConversionRebuildDemo />;
}
