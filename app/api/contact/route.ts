import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxLengths = {
  name: 120,
  email: 160,
  company: 160,
  budget: 80,
  timeline: 80,
  project: 3000,
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  budget?: unknown;
  timeline?: unknown;
  project?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload) {
  const name = readString(payload.name);
  const email = readString(payload.email);
  const company = readString(payload.company);
  const budget = readString(payload.budget);
  const timeline = readString(payload.timeline);
  const project = readString(payload.project);
  const website = readString(payload.website);
  const startedAt = Number(payload.startedAt);
  const elapsedMs = Number.isFinite(startedAt) ? Date.now() - startedAt : 0;
  const errors: Record<string, string> = {};

  if (!name) errors.name = "Enter your name.";
  if (!email || !emailPattern.test(email)) errors.email = "Enter a valid email.";
  if (!project || project.length < 20) {
    errors.project = "Describe the project in at least 20 characters.";
  }

  for (const [key, max] of Object.entries(maxLengths)) {
    const value = { name, email, company, budget, timeline, project }[
      key as keyof typeof maxLengths
    ];

    if (value.length > max) {
      errors[key] = `Keep this under ${max} characters.`;
    }
  }

  return {
    data: { name, email, company, budget, timeline, project },
    elapsedMs,
    errors,
    isSpam: Boolean(website) || elapsedMs < 2500,
  };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Send valid JSON." },
      { status: 400 },
    );
  }

  const { data, elapsedMs, errors, isSpam } = validatePayload(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  if (isSpam) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Pranav Labs <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        message:
          "Contact delivery is not configured. Email hello@pranavlabs.com directly.",
      },
      { status: 503 },
    );
  }

  const subject = `Project inquiry from ${data.name}`;
  const text = [
    subject,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "Not provided"}`,
    `Budget: ${data.budget || "Not provided"}`,
    `Timeline: ${data.timeline || "Not provided"}`,
    `Form time: ${Math.round(elapsedMs / 1000)}s`,
    "",
    "Project:",
    data.project,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from,
      reply_to: data.email,
      subject,
      text,
      to,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "The message could not be sent. Try email or WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
