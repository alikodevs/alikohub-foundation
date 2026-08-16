import { PageShell } from "@/components/foundation/PageShell";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import {
  PartnershipTiers,
  WaysToSupport,
  PartnerVoices,
} from "@/components/foundation/PartnershipEnhancements";
import { foundation } from "@/config/foundation";
import {
  Building2,
  Users,
  Handshake,
  GraduationCap,
  CheckCircle2,
  Mail,
} from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Institutional & Funding Partners",
    body: "Foundations, multilateral agencies, and government programs seeking accountable, locally grounded delivery partners.",
    accent: "hsl(var(--trust-blue))",
  },
  {
    icon: Handshake,
    title: "Implementing Organizations",
    body: "Community-based organizations and NGOs with demonstrated presence in priority regions.",
    accent: "hsl(var(--amber))",
  },
  {
    icon: GraduationCap,
    title: "Academic & Research Partners",
    body: "Universities, research institutes, and evaluators who can strengthen program design and independent learning.",
    accent: "hsl(160,55%,42%)",
  },
  {
    icon: Users,
    title: "Advisors & Volunteers",
    body: "Practitioners, mentors, and diaspora professionals contributing time, expertise, and networks.",
    accent: "hsl(280,45%,55%)",
  },
];

const principles = [
  "Documented, mission-aligned, and conducted on appropriate terms.",
  "Locally led. Community priorities set the agenda.",
  "Transparent about roles, funding, data, and decision-making.",
  "Safeguarding-first, with clear reporting and accountability.",
];

const steps = [
  {
    n: "01",
    title: "Introduce",
    body: "Share a brief about your organization and the collaboration you have in mind.",
  },
  {
    n: "02",
    title: "Explore",
    body: "A short discovery conversation to test alignment and community fit.",
  },
  {
    n: "03",
    title: "Design",
    body: "Co-design scope, roles, safeguarding, and measurement together.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Formalize the partnership with a documented agreement and clear milestones.",
  },
];

export default function Partnership() {
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partner with a foundation that listens first."
      intro="We are building a small number of deep, accountable partnerships rather than many shallow ones. If our missions align, we would like to hear from you."
    >
      <section aria-labelledby="pathways-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Who we work with
        </p>
        <h2
          id="pathways-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          Four partnership pathways
        </h2>

        {/* 2×2 icon-centered card grid — reference style */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {partnerTypes.map((p, i) => (
            <article
              key={p.title}
              className={`group flex flex-col items-start rounded-2xl border border-border p-7 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] ${
                i === 1
                  ? "bg-[hsl(var(--warm-surface))] ring-1 ring-border"
                  : "bg-card"
              }`}
            >
              {/* Icon container — solid accent background, white icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                style={{ background: p.accent }}
              >
                <p.icon className="h-6 w-6" aria-hidden />
              </div>

              {/* Title */}
              <h3 className="mt-5 font-heading text-base font-bold text-foreground">
                {p.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── How it works — process timeline ──────────────────────────────────── */}
      {/* Communicates momentum: Introduce → Explore → Design → Launch */}
      <section className="mt-16" aria-labelledby="process-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          How it works
        </p>
        <h2
          id="process-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          From first conversation to launch
        </h2>

        <div className="relative mt-10">
          {/* Connector line — desktop only, sits behind the numbered circles */}
          <div
            className="absolute left-5 right-5 top-[19px] hidden h-px bg-border lg:block"
            aria-hidden
          />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
              >
                {/* Numbered circle — sits above the connector line via z-10 + ring */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] font-heading text-sm font-bold text-white ring-4 ring-background">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership levels — structured rows (from PartnershipEnhancements) ── */}
      <PartnershipTiers />

      {/* ── Beyond funding — lightweight list (from PartnershipEnhancements) ───── */}
      <WaysToSupport />

      {/* ── Our commitments — trust / governance container ───────────────────── */}
      {/* A single highlighted block that communicates: "here is how we operate." */}
      <section className="mt-16" aria-labelledby="commitments-heading">
        <div className="rounded-xl border border-[hsl(var(--trust-blue))]/20 bg-[hsl(var(--warm-surface))] p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Our commitments
          </p>
          <h2
            id="commitments-heading"
            className="mt-2 font-heading text-2xl font-semibold text-foreground"
          >
            Partnership principles
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            These are the operating principles that govern every partnership we
            enter.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--amber))]"
                  aria-hidden
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Partner voices — editorial testimonials (from PartnershipEnhancements) */}
      <PartnerVoices />

      {/* ── Inquiry — final conversion point ─────────────────────────────────── */}
      <section className="mt-16" aria-labelledby="partnership-inquiry">
        <div className="rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
                Start a conversation
              </p>
              <h2
                id="partnership-inquiry"
                className="mt-2 font-heading text-2xl font-semibold text-foreground"
              >
                Tell us about the partnership you have in mind.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Share a brief about your organization, the community you serve,
                and the collaboration you envision. A member of our team will
                respond personally.
              </p>
              <a
                href={`mailto:${foundation.contactEmail}?subject=Partnership%20Inquiry`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-[hsl(var(--trust-blue))] transition-colors hover:bg-[hsl(var(--trust-blue))] hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {foundation.contactEmail}
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <InquiryForm
                sourcePage="/partnership"
                defaultType="partnership"
                lockType
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <LegalSeparationStrip />
      </div>
    </PageShell>
  );
}
