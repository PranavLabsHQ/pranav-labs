type TimelineItem = {
  label: string;
  title: string;
  body: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="grid gap-4">
      {items.map((item, index) => (
        <li
          className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-sm md:grid-cols-[7rem_1fr]"
          key={item.label}
        >
          <div className="text-sm font-medium text-primary">
            {String(index + 1).padStart(2, "0")} {item.label}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
