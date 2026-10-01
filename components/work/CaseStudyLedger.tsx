import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { CaseStudy } from "@/content/case-studies";

type CaseStudyLedgerProps = {
  studies: CaseStudy[];
  showProof?: boolean;
};

const stageTone: Record<CaseStudy["stage"], string> = {
  "Building first": "border-primary/25 bg-primary/[0.07] text-primary",
  "Build next": "border-border bg-secondary text-foreground",
  "Build later": "border-border bg-background text-muted-foreground",
};

export function CaseStudyLedger({
  studies,
  showProof = false,
}: CaseStudyLedgerProps) {
  return (
    <div className="border-y border-border">
      {studies.map((study) => (
        <Link
          className="group block border-b border-border py-7 transition-colors last:border-b-0 hover:bg-secondary/45 focus-visible:bg-secondary/45 md:py-9"
          href={`/work/case-studies/${study.slug}`}
          key={study.slug}
        >
          <article className="px-1 md:px-4">
            <div className="grid gap-5 md:grid-cols-[5rem_minmax(0,1fr)_auto] md:gap-8">
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  {study.order}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {study.kind}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold tracking-[-0.015em] md:text-2xl">
                  {study.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                  {study.summary}
                </p>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  {study.services.join(" · ")}
                </p>
              </div>

              <div className="flex items-start justify-between gap-4 md:min-w-36 md:justify-end">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${stageTone[study.stage]}`}
                >
                  {study.stage}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </div>
            </div>

            {showProof ? (
              <div className="mt-7 grid border-t border-border md:ml-[7rem] md:grid-cols-3">
                {[
                  ["Before", study.before],
                  ["Try it", study.action],
                  ["Result", study.result],
                ].map(([label, copy], index) => (
                  <div
                    className={`pt-5 md:px-5 ${
                      index === 0 ? "md:pl-0" : "md:border-l md:border-border"
                    }`}
                    key={label}
                  >
                    <p className="text-xs font-medium text-primary">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        </Link>
      ))}
    </div>
  );
}
