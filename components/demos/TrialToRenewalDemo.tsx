"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  BellRing,
  CalendarPlus,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  LayoutDashboard,
  RefreshCw,
  RotateCcw,
  Users,
  X,
} from "lucide-react";

type View = "overview" | "leads" | "renewals" | "activity";
type LeadStatus =
  | "New"
  | "Contacted"
  | "Trial booked"
  | "Trial complete"
  | "Won"
  | "Lost";
type RenewalStatus = "Action needed" | "Reminded" | "Payment link sent";

type Lead = {
  id: number;
  name: string;
  phone: string;
  source: string;
  plan: string;
  status: LeadStatus;
  nextAction: string;
};

type Renewal = {
  id: number;
  name: string;
  plan: string;
  amount: number;
  daysLeft: number;
  status: RenewalStatus;
};

type Event = {
  id: number;
  title: string;
  detail: string;
  time: string;
  tone: "blue" | "amber" | "teal";
};

const statusOrder: LeadStatus[] = [
  "New",
  "Contacted",
  "Trial booked",
  "Trial complete",
  "Won",
  "Lost",
];

const initialLeads: Lead[] = [
  { id: 1, name: "Aarav Mehta", phone: "+91 98204 11824", source: "Instagram", plan: "Strength", status: "New", nextAction: "Call by 11:30" },
  { id: 2, name: "Meera Shah", phone: "+91 98920 43018", source: "Website", plan: "Group fitness", status: "Contacted", nextAction: "Share 7 pm slot" },
  { id: 3, name: "Vihaan Rao", phone: "+91 99305 71240", source: "Walk-in", plan: "Strength", status: "Trial booked", nextAction: "Today, 6:30 pm" },
  { id: 4, name: "Tara Iyer", phone: "+91 97691 44803", source: "Referral", plan: "Personal training", status: "Trial booked", nextAction: "Tomorrow, 8 am" },
  { id: 5, name: "Arjun Nair", phone: "+91 98703 31529", source: "Website", plan: "Group fitness", status: "Trial complete", nextAction: "Decision follow-up" },
  { id: 6, name: "Navya Patel", phone: "+91 96195 88310", source: "Instagram", plan: "Strength", status: "Won", nextAction: "Onboarding sent" },
  { id: 7, name: "Reyansh Joshi", phone: "+91 98190 22416", source: "Google", plan: "Strength", status: "Contacted", nextAction: "Call after 5 pm" },
  { id: 8, name: "Saanvi Kapoor", phone: "+91 99871 66304", source: "Referral", plan: "Personal training", status: "New", nextAction: "Reply now" },
  { id: 9, name: "Ishaan Kulkarni", phone: "+91 98212 40955", source: "Website", plan: "Group fitness", status: "Lost", nextAction: "No action" },
];

const initialRenewals: Renewal[] = [
  { id: 1, name: "Riya Sharma", plan: "Quarterly strength", amount: 3500, daysLeft: 1, status: "Action needed" },
  { id: 2, name: "Kabir Singh", plan: "Quarterly group", amount: 4200, daysLeft: 2, status: "Reminded" },
  { id: 3, name: "Anika Desai", plan: "Monthly PT", amount: 3000, daysLeft: 4, status: "Action needed" },
  { id: 4, name: "Dev Malhotra", plan: "Half-year strength", amount: 6000, daysLeft: 6, status: "Payment link sent" },
  { id: 5, name: "Ishita Bose", plan: "Quarterly group", amount: 3500, daysLeft: 8, status: "Action needed" },
  { id: 6, name: "Naman Verma", plan: "Annual strength", amount: 7200, daysLeft: 12, status: "Action needed" },
];

const initialEvents: Event[] = [
  { id: 1, title: "Trial confirmed", detail: "Vihaan Rao · Today at 6:30 pm", time: "10 min ago", tone: "teal" },
  { id: 2, title: "Renewal reminder delivered", detail: "Kabir Singh · WhatsApp test event", time: "26 min ago", tone: "blue" },
  { id: 3, title: "Renewal needs attention", detail: "Riya Sharma · Expires tomorrow", time: "42 min ago", tone: "amber" },
  { id: 4, title: "New website enquiry", detail: "Meera Shah · Group fitness", time: "1 hr ago", tone: "blue" },
  { id: 5, title: "Member joined", detail: "Navya Patel · Strength plan", time: "Yesterday", tone: "teal" },
];

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Today", icon: LayoutDashboard },
  { id: "leads", label: "Trial pipeline", icon: Users },
  { id: "renewals", label: "Renewals", icon: RefreshCw },
  { id: "activity", label: "Activity", icon: Activity },
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function leadStatusTone(status: LeadStatus) {
  if (status === "Won") return "bg-[#dff7ef] text-[#08755a] dark:bg-[#11382f] dark:text-[#76dfc3]";
  if (status === "Lost") return "bg-[#eceef2] text-[#687184] dark:bg-white/[0.06] dark:text-[#929bad]";
  if (status === "Trial complete") return "bg-[#fff1d6] text-[#9b5a00] dark:bg-[#392812] dark:text-[#ffc768]";
  return "bg-[#e8efff] text-[#1e54bb] dark:bg-[#14264d] dark:text-[#8aafff]";
}

function eventDot(tone: Event["tone"]) {
  if (tone === "amber") return "bg-[#f5a524]";
  if (tone === "teal") return "bg-[#14a37f]";
  return "bg-[#2f6fec]";
}

export function TrialToRenewalDemo() {
  const [view, setView] = useState<View>("overview");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [renewals, setRenewals] = useState<Renewal[]>(initialRenewals);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [notice, setNotice] = useState("Demo data is ready. Try booking a trial or sending a renewal reminder.");

  const activeLeads = leads.filter((lead) => !["Won", "Lost"].includes(lead.status));
  const revenueAtRisk = renewals.reduce((sum, renewal) => sum + renewal.amount, 7100);
  const bookedTrials = leads.filter((lead) => lead.status === "Trial booked").length;
  const stageCounts = useMemo(
    () =>
      statusOrder.slice(0, 5).map((status) => ({
        status,
        count: leads.filter((lead) => lead.status === status).length,
      })),
    [leads],
  );

  function addEvent(title: string, detail: string, tone: Event["tone"]) {
    setEvents((current) => [
      { id: Date.now(), title, detail, time: "Just now", tone },
      ...current,
    ]);
  }

  function advanceLead(lead: Lead) {
    const currentIndex = statusOrder.indexOf(lead.status);
    const nextStatus = statusOrder[Math.min(currentIndex + 1, statusOrder.indexOf("Won"))];

    setLeads((current) =>
      current.map((item) =>
        item.id === lead.id
          ? {
              ...item,
              status: nextStatus,
              nextAction:
                nextStatus === "Won"
                  ? "Onboarding ready"
                  : nextStatus === "Trial complete"
                    ? "Decision follow-up"
                    : "Continue follow-up",
            }
          : item,
      ),
    );
    addEvent(
      nextStatus === "Won" ? "Member joined" : `Lead moved to ${nextStatus.toLowerCase()}`,
      `${lead.name} · ${lead.plan}`,
      nextStatus === "Won" ? "teal" : "blue",
    );
    setNotice(`${lead.name} moved to ${nextStatus}.`);
  }

  function sendReminder(renewal: Renewal) {
    setRenewals((current) =>
      current.map((item) =>
        item.id === renewal.id ? { ...item, status: "Reminded" } : item,
      ),
    );
    addEvent(
      "Renewal reminder delivered",
      `${renewal.name} · Simulated WhatsApp event`,
      "blue",
    );
    setNotice(`Reminder sent to ${renewal.name}. This demo does not contact a real number.`);
  }

  function bookTrial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "New lead");
    const plan = String(form.get("plan") || "Strength");
    const slot = String(form.get("slot") || "Tomorrow");
    const phone = String(form.get("phone") || "+91 90000 00000");

    setLeads((current) => [
      {
        id: Date.now(),
        name,
        phone,
        source: "Demo booking",
        plan,
        status: "Trial booked",
        nextAction: slot,
      },
      ...current,
    ]);
    addEvent("Trial confirmed", `${name} · ${slot}`, "teal");
    setNotice(`${name}'s trial is booked for ${slot}.`);
    setBookingOpen(false);
    setView("leads");
  }

  function resetDemo() {
    setLeads(initialLeads);
    setRenewals(initialRenewals);
    setEvents(initialEvents);
    setView("overview");
    setBookingOpen(false);
    setNotice("Demo reset to the original Vortex Athletics sample data.");
  }

  return (
    <div className="min-h-screen bg-[#edf0f5] py-6 text-[#182033] dark:bg-[#080b11] dark:text-[#e8edf5] md:py-10">
      <div className="container-wide">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link
            className="inline-flex items-center gap-2 text-[#687184] transition-colors hover:text-[#182033] dark:text-[#929bad] dark:hover:text-white"
            href="/work/case-studies/trial-to-renewal"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Case study brief
          </Link>
          <p className="text-xs text-[#687184] dark:text-[#929bad]">
            Interactive prototype · Synthetic data · No real messages or payments
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.25rem] border border-[#d8dde7] bg-[#f9fafc] shadow-[0_24px_80px_rgba(36,47,71,0.14)] dark:border-white/10 dark:bg-[#11151d] dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <header className="flex min-h-16 items-center justify-between border-b border-[#dfe3eb] bg-white px-4 dark:border-white/10 dark:bg-[#11151d] md:px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#182033] text-white dark:bg-[#e8edf5] dark:text-[#11151d]">
                <Dumbbell aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-5">Vortex Athletics</p>
                <p className="text-xs text-[#7a8394]">Andheri West · Front desk</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="hidden h-9 items-center gap-2 rounded-lg border border-[#d8dde7] bg-white px-3 text-xs font-medium transition-colors hover:bg-[#f3f5f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6fec] dark:border-white/10 dark:bg-transparent dark:hover:bg-white/[0.05] sm:flex"
                onClick={resetDemo}
                type="button"
              >
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Reset demo
              </button>
              <button
                className="flex h-9 items-center gap-2 rounded-lg bg-[#2f6fec] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#255ecb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6fec] focus-visible:ring-offset-2"
                onClick={() => setBookingOpen(true)}
                type="button"
              >
                <CalendarPlus aria-hidden="true" className="h-4 w-4" />
                Book a trial
              </button>
            </div>
          </header>

          <div className="grid min-h-[760px] lg:grid-cols-[13.5rem_minmax(0,1fr)]">
            <aside className="border-b border-[#dfe3eb] bg-[#f4f6f9] p-3 dark:border-white/10 dark:bg-[#0d1118] lg:border-b-0 lg:border-r lg:p-4">
              <nav aria-label="Demo sections" className="flex gap-1 overflow-x-auto lg:block lg:space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = view === item.id;
                  return (
                    <button
                      className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors lg:w-full ${
                        active
                          ? "bg-white text-[#182033] shadow-sm dark:bg-white/10 dark:text-white"
                          : "text-[#697386] hover:bg-white/65 hover:text-[#182033] dark:text-[#929bad] dark:hover:bg-white/[0.05] dark:hover:text-white"
                      }`}
                      key={item.id}
                      onClick={() => setView(item.id)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 hidden border-t border-[#d8dde7] pt-5 dark:border-white/10 lg:block">
                <p className="text-xs font-medium text-[#697386] dark:text-[#929bad]">Today at a glance</p>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-xs text-[#7a8394]">Trials booked</dt>
                    <dd className="mt-1 text-xl font-semibold tabular-nums">{bookedTrials}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#7a8394]">Active leads</dt>
                    <dd className="mt-1 text-xl font-semibold tabular-nums">{activeLeads.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#7a8394]">Renewal risk</dt>
                    <dd className="mt-1 text-xl font-semibold tabular-nums text-[#b46a00] dark:text-[#ffc768]">
                      {currency.format(revenueAtRisk)}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="border-b border-[#dfe3eb] bg-[#fffdf9] px-4 py-3 dark:border-white/10 dark:bg-[#18160f]">
                <p aria-live="polite" className="flex items-center gap-2 text-xs text-[#71541b] dark:text-[#e5c477]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f5a524]" />
                  {notice}
                </p>
              </div>

              {view === "overview" ? (
                <Overview
                  events={events}
                  leads={leads}
                  renewals={renewals}
                  revenueAtRisk={revenueAtRisk}
                  sendReminder={sendReminder}
                  setView={setView}
                  stageCounts={stageCounts}
                />
              ) : null}

              {view === "leads" ? (
                <DemoSection
                  description="Every enquiry has an owner, a stage, and one visible next action."
                  title="Trial pipeline"
                >
                  <PipelineStrip counts={stageCounts} />
                  <div className="mt-6">
                    <LeadLedger advanceLead={advanceLead} leads={leads} />
                  </div>
                </DemoSection>
              ) : null}

              {view === "renewals" ? (
                <DemoSection
                  description="Prioritise expiring memberships before revenue silently drops out."
                  title="Renewal queue"
                >
                  <RenewalRunway renewals={renewals} revenueAtRisk={revenueAtRisk} />
                  <div className="mt-6">
                    <RenewalLedger renewals={renewals} sendReminder={sendReminder} />
                  </div>
                </DemoSection>
              ) : null}

              {view === "activity" ? (
                <DemoSection
                  description="A readable trail of bookings, reminders, risk signals, and conversions."
                  title="Activity log"
                >
                  <ActivityLog events={events} expanded />
                </DemoSection>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-xs text-[#697386] dark:text-[#929bad] sm:flex-row sm:items-center sm:justify-between">
          <p>Built by Pranav Labs to demonstrate an acquisition-to-retention workflow.</p>
          <Link className="inline-flex items-center gap-1 font-medium text-[#2f6fec]" href="/contact">
            Discuss a workflow like this
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {bookingOpen ? (
        <BookingPanel close={() => setBookingOpen(false)} onSubmit={bookTrial} />
      ) : null}
    </div>
  );
}

type OverviewProps = {
  events: Event[];
  leads: Lead[];
  renewals: Renewal[];
  revenueAtRisk: number;
  sendReminder: (renewal: Renewal) => void;
  setView: (view: View) => void;
  stageCounts: { status: LeadStatus; count: number }[];
};

function Overview({
  events,
  leads,
  renewals,
  revenueAtRisk,
  sendReminder,
  setView,
  stageCounts,
}: OverviewProps) {
  return (
    <div className="p-4 md:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-[#697386] dark:text-[#929bad]">Thursday, 1 October</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.025em] md:text-3xl">Front desk, without the guesswork.</h1>
        </div>
        <p className="text-xs text-[#697386] dark:text-[#929bad]">40 active members · 12 renewals due</p>
      </div>

      <div className="mt-7">
        <RenewalRunway renewals={renewals} revenueAtRisk={revenueAtRisk} />
      </div>

      <div className="mt-6">
        <PipelineStrip counts={stageCounts} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="min-w-0 border-t border-[#d8dde7] pt-5 dark:border-white/10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold">Next trial actions</h2>
              <p className="mt-1 text-xs text-[#7a8394]">Move a lead forward and watch the activity log update.</p>
            </div>
            <button className="text-xs font-medium text-[#2f6fec]" onClick={() => setView("leads")} type="button">
              View all
            </button>
          </div>
          <LeadLedger compact leads={leads} />
        </section>

        <section className="border-t border-[#d8dde7] pt-5 dark:border-white/10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold">Live activity</h2>
            <button className="text-xs font-medium text-[#2f6fec]" onClick={() => setView("activity")} type="button">
              Open log
            </button>
          </div>
          <ActivityLog events={events.slice(0, 5)} />
        </section>
      </div>

      <section className="mt-6 border-t border-[#d8dde7] pt-5 dark:border-white/10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold">Needs attention</h2>
            <p className="mt-1 text-xs text-[#7a8394]">Highest-risk renewals in the next eight days.</p>
          </div>
          <button className="text-xs font-medium text-[#2f6fec]" onClick={() => setView("renewals")} type="button">
            All renewals
          </button>
        </div>
        <RenewalLedger renewals={renewals.slice(0, 5)} sendReminder={sendReminder} />
      </section>
    </div>
  );
}

function DemoSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="p-4 md:p-7">
      <h1 className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#697386] dark:text-[#929bad]">{description}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function RenewalRunway({ renewals, revenueAtRisk }: { renewals: Renewal[]; revenueAtRisk: number }) {
  const dueByDay = new Map(renewals.map((renewal) => [renewal.daysLeft, renewal.amount]));

  return (
    <section className="overflow-hidden rounded-xl border border-[#d8dde7] bg-white dark:border-white/10 dark:bg-[#141923]">
      <div className="flex flex-col gap-4 border-b border-[#e3e6ed] px-5 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Clock3 aria-hidden="true" className="h-4 w-4 text-[#b46a00] dark:text-[#ffc768]" />
            <h2 className="text-sm font-semibold">14-day renewal runway</h2>
          </div>
          <p className="mt-1 text-xs text-[#7a8394]">12 memberships expire · 6 require priority follow-up</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-[#7a8394]">Revenue at risk</p>
          <p className="mt-0.5 text-xl font-semibold tabular-nums text-[#a86100] dark:text-[#ffc768]">
            {currency.format(revenueAtRisk)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 px-5 pb-4 pt-5 sm:grid-cols-14">
        {Array.from({ length: 14 }, (_, index) => index + 1).map((day) => {
          const amount = dueByDay.get(day);
          return (
            <div className="flex min-w-0 flex-col justify-end" key={day}>
              <div
                aria-label={amount ? `Day ${day}: ${currency.format(amount)} due` : `Day ${day}: no priority renewal`}
                className={`min-h-3 rounded-sm ${amount ? "bg-[#f5a524]" : "bg-[#e7eaf0] dark:bg-white/10"}`}
                style={{ height: amount ? `${Math.max(22, Math.min(54, amount / 120))}px` : "12px" }}
              />
              <span className="mt-2 text-center text-[10px] tabular-nums text-[#8b93a2]">{day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PipelineStrip({ counts }: { counts: { status: LeadStatus; count: number }[] }) {
  return (
    <div className="grid overflow-hidden rounded-xl border border-[#d8dde7] bg-white dark:border-white/10 dark:bg-[#141923] sm:grid-cols-5">
      {counts.map((item, index) => (
        <div
          className={`flex items-center justify-between gap-3 border-b border-[#e3e6ed] px-4 py-3 last:border-b-0 dark:border-white/10 sm:block sm:border-b-0 sm:px-4 sm:py-4 ${index > 0 ? "sm:border-l" : ""}`}
          key={item.status}
        >
          <p className="text-xs text-[#727b8d] dark:text-[#929bad]">{item.status}</p>
          <p className="text-lg font-semibold tabular-nums sm:mt-1">{item.count}</p>
        </div>
      ))}
    </div>
  );
}

function LeadLedger({
  advanceLead,
  compact = false,
  leads,
}: {
  advanceLead?: (lead: Lead) => void;
  compact?: boolean;
  leads: Lead[];
}) {
  const visibleLeads = compact
    ? leads.filter((lead) => !["Won", "Lost"].includes(lead.status)).slice(0, 5)
    : leads;

  return (
    <div className="overflow-x-auto rounded-xl border border-[#d8dde7] bg-white dark:border-white/10 dark:bg-[#141923]">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e3e6ed] text-xs text-[#737c8e] dark:border-white/10 dark:text-[#929bad]">
            <th className="px-4 py-3 font-medium">Lead</th>
            <th className="px-4 py-3 font-medium">Interest</th>
            <th className="px-4 py-3 font-medium">Stage</th>
            <th className="px-4 py-3 font-medium">Next action</th>
            {advanceLead ? <th className="px-4 py-3 text-right font-medium">Move</th> : null}
          </tr>
        </thead>
        <tbody>
          {visibleLeads.map((lead) => (
            <tr className="border-b border-[#edf0f4] last:border-b-0 dark:border-white/[0.07]" key={lead.id}>
              <td className="px-4 py-3.5">
                <p className="text-sm font-medium">{lead.name}</p>
                <p className="mt-0.5 text-xs text-[#7a8394]">{lead.source}</p>
              </td>
              <td className="px-4 py-3.5 text-sm text-[#515b6f] dark:text-[#bdc5d2]">{lead.plan}</td>
              <td className="px-4 py-3.5">
                <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${leadStatusTone(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3.5 text-xs text-[#697386] dark:text-[#929bad]">{lead.nextAction}</td>
              {advanceLead ? (
                <td className="px-4 py-3.5 text-right">
                  {!["Won", "Lost"].includes(lead.status) ? (
                    <button
                      aria-label={`Move ${lead.name} to the next stage`}
                      className="inline-grid h-8 w-8 place-items-center rounded-lg border border-[#d8dde7] text-[#2f6fec] transition-colors hover:bg-[#edf3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6fec] dark:border-white/10 dark:hover:bg-[#14264d]"
                      onClick={() => advanceLead(lead)}
                      type="button"
                    >
                      <ChevronRight aria-hidden="true" className="h-4 w-4" />
                    </button>
                  ) : (
                    <Check aria-hidden="true" className="ml-auto h-4 w-4 text-[#14a37f]" />
                  )}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RenewalLedger({
  renewals,
  sendReminder,
}: {
  renewals: Renewal[];
  sendReminder: (renewal: Renewal) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#d8dde7] bg-white dark:border-white/10 dark:bg-[#141923]">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#e3e6ed] text-xs text-[#737c8e] dark:border-white/10 dark:text-[#929bad]">
            <th className="px-4 py-3 font-medium">Member</th>
            <th className="px-4 py-3 font-medium">Expires</th>
            <th className="px-4 py-3 font-medium">Value</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {renewals.map((renewal) => (
            <tr className="border-b border-[#edf0f4] last:border-b-0 dark:border-white/[0.07]" key={renewal.id}>
              <td className="px-4 py-3.5">
                <p className="text-sm font-medium">{renewal.name}</p>
                <p className="mt-0.5 text-xs text-[#7a8394]">{renewal.plan}</p>
              </td>
              <td className="px-4 py-3.5 text-sm tabular-nums">{renewal.daysLeft}d</td>
              <td className="px-4 py-3.5 text-sm font-medium tabular-nums">{currency.format(renewal.amount)}</td>
              <td className="px-4 py-3.5">
                <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${renewal.status === "Action needed" ? "bg-[#fff1d6] text-[#9b5a00] dark:bg-[#392812] dark:text-[#ffc768]" : "bg-[#e8efff] text-[#1e54bb] dark:bg-[#14264d] dark:text-[#8aafff]"}`}>
                  {renewal.status}
                </span>
              </td>
              <td className="px-4 py-3.5 text-right">
                <button
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#d8dde7] px-2.5 text-xs font-medium transition-colors hover:bg-[#edf3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6fec] disabled:cursor-default disabled:opacity-55 dark:border-white/10 dark:hover:bg-[#14264d]"
                  disabled={renewal.status !== "Action needed"}
                  onClick={() => sendReminder(renewal)}
                  type="button"
                >
                  <BellRing aria-hidden="true" className="h-3.5 w-3.5" />
                  {renewal.status === "Action needed"
                    ? "Remind"
                    : renewal.status === "Reminded"
                      ? "Sent"
                      : "Link sent"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActivityLog({ events, expanded = false }: { events: Event[]; expanded?: boolean }) {
  return (
    <div className={expanded ? "max-w-3xl" : ""}>
      {events.map((event, index) => (
        <div className="relative flex gap-3 pb-5 last:pb-0" key={event.id}>
          {index < events.length - 1 ? (
            <span className="absolute bottom-0 left-[5px] top-3 w-px bg-[#d8dde7] dark:bg-white/10" />
          ) : null}
          <span className={`relative mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-white dark:border-[#141923] ${eventDot(event.tone)}`} />
          <div className={expanded ? "grid flex-1 gap-1 sm:grid-cols-[1fr_auto]" : "min-w-0"}>
            <div>
              <p className="text-xs font-medium">{event.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#7a8394]">{event.detail}</p>
            </div>
            <p className="mt-1 shrink-0 text-[11px] text-[#949baa] sm:mt-0">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookingPanel({
  close,
  onSubmit,
}: {
  close: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#101522]/45 backdrop-blur-[2px]" role="presentation">
      <button aria-label="Close booking panel" className="absolute inset-0 cursor-default" onClick={close} type="button" />
      <section
        aria-labelledby="booking-title"
        aria-modal="true"
        className="relative h-full w-full max-w-md overflow-y-auto bg-white p-6 text-[#182033] shadow-2xl dark:bg-[#11151d] dark:text-[#e8edf5] md:p-8"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#2f6fec]">New trial</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]" id="booking-title">
              Book a first session
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#697386] dark:text-[#929bad]">
              This creates a synthetic lead and confirmation event inside the demo.
            </p>
          </div>
          <button
            aria-label="Close booking panel"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#d8dde7] dark:border-white/10"
            onClick={close}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <DemoField label="Full name" name="name" placeholder="e.g. Neel Shah" required />
          <DemoField label="Mobile number" name="phone" placeholder="+91 98XXX XXXXX" required type="tel" />
          <label className="block">
            <span className="text-sm font-medium">Training interest</span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-[#cfd5e0] bg-white px-3 text-sm focus:border-[#2f6fec] focus:outline-none focus:ring-2 focus:ring-[#2f6fec]/20 dark:border-white/15 dark:bg-[#171c26]"
              defaultValue="Strength"
              name="plan"
            >
              <option>Strength</option>
              <option>Group fitness</option>
              <option>Personal training</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium">Trial slot</span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-[#cfd5e0] bg-white px-3 text-sm focus:border-[#2f6fec] focus:outline-none focus:ring-2 focus:ring-[#2f6fec]/20 dark:border-white/15 dark:bg-[#171c26]"
              defaultValue="Tomorrow, 7:00 am"
              name="slot"
            >
              <option>Today, 7:30 pm</option>
              <option>Tomorrow, 7:00 am</option>
              <option>Tomorrow, 6:30 pm</option>
            </select>
          </label>
          <button
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2f6fec] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#255ecb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6fec] focus-visible:ring-offset-2"
            type="submit"
          >
            Confirm trial
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 border-t border-[#dfe3eb] pt-5 text-xs leading-5 text-[#7a8394] dark:border-white/10">
          Production version: WhatsApp confirmation, calendar capacity, consent, and duplicate checking would run through validated server workflows.
        </div>
      </section>
    </div>
  );
}

function DemoField({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="mt-2 h-11 w-full rounded-lg border border-[#cfd5e0] bg-white px-3 text-sm placeholder:text-[#a0a7b4] focus:border-[#2f6fec] focus:outline-none focus:ring-2 focus:ring-[#2f6fec]/20 dark:border-white/15 dark:bg-[#171c26]"
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}
