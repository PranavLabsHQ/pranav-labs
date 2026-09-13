"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getWhatsAppHref } from "@/lib/contact";

type FormState = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<
  Record<"name" | "email" | "company" | "budget" | "timeline" | "project", string>
>;

export function ContactForm() {
  const startedAt = useMemo(() => Date.now(), []);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const whatsAppHref = getWhatsAppHref();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("loading");
    setMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          budget: formData.get("budget"),
          timeline: formData.get("timeline"),
          project: formData.get("project"),
          website: formData.get("website"),
          startedAt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = (await response.json()) as {
        errors?: FieldErrors;
        message?: string;
      };

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setMessage(result.message ?? "Check the form and try again.");
        setState("error");
        return;
      }

      form.reset();
      setState("success");
      setMessage("Thanks. Your message was sent. We will reply by email.");
    } catch {
      setState("error");
      setMessage("Network error. Try again or use WhatsApp.");
    }
  }

  return (
    <form
      className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-sm"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium" htmlFor="name">
          Name
          <Input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="name"
            name="name"
            required
          />
          {errors.name ? (
            <span className="text-sm text-destructive" id="name-error">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-sm font-medium" htmlFor="email">
          Email
          <Input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="email"
            name="email"
            required
            type="email"
          />
          {errors.email ? (
            <span className="text-sm text-destructive" id="email-error">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium" htmlFor="company">
          Company
          <Input autoComplete="organization" id="company" name="company" />
        </label>
        <label className="grid gap-2 text-sm font-medium" htmlFor="budget">
          Budget
          <Input id="budget" name="budget" placeholder="Optional" />
        </label>
        <label className="grid gap-2 text-sm font-medium" htmlFor="timeline">
          Timeline
          <Input id="timeline" name="timeline" placeholder="Optional" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium" htmlFor="project">
        Project
        <Textarea
          aria-describedby={errors.project ? "project-error" : undefined}
          aria-invalid={Boolean(errors.project)}
          id="project"
          name="project"
          placeholder="What are you trying to build, automate, or improve?"
          required
        />
        {errors.project ? (
          <span className="text-sm text-destructive" id="project-error">
            {errors.project}
          </span>
        ) : null}
      </label>
      <div aria-live="polite" className="min-h-6 text-sm">
        {message ? (
          <p
            className={
              state === "success" ? "text-primary" : "text-destructive"
            }
          >
            {message}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button disabled={state === "loading"} type="submit">
          {state === "loading" ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : state === "success" ? (
            <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          ) : null}
          {state === "loading" ? "Sending" : "Send Inquiry"}
        </Button>
        <Button asChild variant="secondary">
          <Link href={whatsAppHref} rel="noreferrer" target="_blank">
            Message on WhatsApp
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </form>
  );
}
