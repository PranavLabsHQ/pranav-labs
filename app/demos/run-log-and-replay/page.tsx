import type { Metadata } from "next";

import { RunLogReplayDemo } from "@/components/demos/RunLogReplayDemo";

export const metadata: Metadata = {
  title: "Run Log & Replay Demo",
  description:
    "Inspect a failed automation run, classify the failure, and safely replay from an idempotent checkpoint.",
};

export default function RunLogReplayPage() {
  return <RunLogReplayDemo />;
}
