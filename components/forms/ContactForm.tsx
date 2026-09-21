"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getWhatsAppHref } from "@/lib/contact";

type FormState = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<
  Record<"name" | "email" | "company" | "budget" | "timeline" | "project", string>
>;

export function ContactForm() {
  const startedAt = useRef(Date.now());
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
          startedAt: startedAt.current,
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
      startedAt.current = Date.now();
      setState("success");
      setMessage("Thanks. Your message was sent. We will reply by email.");
    } catch {
      setState("error");
      setMessage("Network error. Try again or use WhatsApp.");
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Project details</CardTitle>
        <CardDescription>
          Required fields are marked. We use this information only to respond
          to your inquiry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
          <input
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
            name="website"
            tabIndex={-1}
            type="text"
          />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
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
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input autoComplete="organization" id="company" name="company" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" name="budget" placeholder="Optional" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input id="timeline" name="timeline" placeholder="Optional" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project">Project *</Label>
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
          </div>
          {message ? (
            <Alert
              aria-live="polite"
              variant={state === "error" ? "destructive" : "default"}
            >
              {state === "error" ? (
                <CircleAlert aria-hidden="true" />
              ) : (
                <CheckCircle2 aria-hidden="true" className="text-primary" />
              )}
              <AlertTitle>
                {state === "success" ? "Inquiry received" : "Unable to send"}
              </AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button disabled={state === "loading"} type="submit">
              {state === "loading" ? (
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
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
      </CardContent>
    </Card>
  );
}
