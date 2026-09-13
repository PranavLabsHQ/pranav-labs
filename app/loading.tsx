export default function Loading() {
  return (
    <section
      aria-label="Loading page"
      className="container-wide flex min-h-[70vh] items-center justify-center py-20"
    >
      <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        Loading Pranav Labs
      </div>
    </section>
  );
}
