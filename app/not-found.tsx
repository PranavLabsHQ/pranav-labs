import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-wide flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="text-4xl font-bold tracking-normal md:text-6xl">
        Page not found.
      </h1>
      <p className="max-w-xl text-lg leading-8 text-muted-foreground">
        The page may have moved, or the route has not been published yet.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </section>
  );
}
