import type { Metadata } from "next";

import { FieldServiceProofDemo } from "@/components/demos/FieldServiceProofDemo";

export const metadata: Metadata = {
  title: "Field Service Proof-of-Work Demo",
  description:
    "Follow a field-service job from dispatch through technician evidence, customer sign-off, and a structured proof report.",
};

export default function FieldServiceProofOfWorkPage() {
  return <FieldServiceProofDemo />;
}
