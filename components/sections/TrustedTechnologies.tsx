import { trustedTechnologies } from "@/content/site";

export function TrustedTechnologies() {
  return (
    <section aria-labelledby="trusted-technologies" className="border-y border-border bg-card">
      <div className="container-wide py-7">
        <h2
          className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
          id="trusted-technologies"
        >
          Built with proven technology
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {trustedTechnologies.map((technology) => (
            <span
              className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
