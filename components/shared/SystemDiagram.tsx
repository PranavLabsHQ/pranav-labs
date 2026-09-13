import { ArrowRight, Braces, Database, GitBranch, Workflow } from "lucide-react";

const nodes = [
  {
    title: "Product",
    description: "User needs, workflows, constraints",
    icon: Braces,
  },
  {
    title: "System",
    description: "Interfaces, data, automation",
    icon: Workflow,
  },
  {
    title: "Delivery",
    description: "Testing, deployment, iteration",
    icon: GitBranch,
  },
];

export function SystemDiagram() {
  return (
    <div
      aria-label="Pranav Labs software delivery system"
      className="relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm md:p-5"
    >
      <div className="absolute inset-0 subtle-grid opacity-50" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              System view
            </p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.01em]">
              From problem to reliable software.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <Database aria-hidden="true" className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const shouldShowConnector = index < nodes.length - 1;

            return (
              <div className="contents" key={node.title}>
                <div className="rounded-lg border border-border bg-background/90 p-4">
                  <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-base font-semibold">{node.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {node.description}
                  </p>
                </div>
                {shouldShowConnector ? (
                  <div className="hidden items-center px-1 text-muted-foreground lg:flex">
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="rounded-lg border border-border bg-background/90 p-4">
          <div className="flex flex-wrap gap-2">
            {["Fast", "Accessible", "Documented", "Maintainable"].map((item) => (
              <span
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
