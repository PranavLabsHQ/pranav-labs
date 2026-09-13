"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="container-wide flex min-h-[70vh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-sm font-medium text-primary">Something went wrong</p>
      <h1 className="text-4xl font-bold tracking-normal md:text-6xl">
        The page could not load.
      </h1>
      <p className="max-w-xl text-lg leading-8 text-muted-foreground">
        The site hit an unexpected error. You can try again or return home.
        {error.digest ? ` Reference: ${error.digest}.` : null}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} type="button">
          Try Again
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
