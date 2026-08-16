import { PageShell } from "@/components/foundation/PageShell";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import {
  VolunteerImpactRibbon,
  VolunteerRoles,
} from "@/components/foundation/PartnershipEnhancements";
import {
  Handshake,
  HeartHandshake,
  Newspaper,
  Heart,
  ArrowRight,
  Calendar,
  Share2,
  Mail,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function GetInvolved() {
  return (
    <PageShell
      eyebrow="Get involved"
      title="There is a role for you."
      intro="Choose the pathway that best matches how you can contribute. Every submission is read by a member of the Foundation team."
    >
      <section aria-labelledby="primary-ways-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Ways to get involved
        </p>
        <h2
          id="primary-ways-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          How you can support us
        </h2>

        {/* All four pathways — 2×2 grid, same card style */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* Volunteer */}
          <div className="relative overflow-hidden rounded-2xl bg-[hsl(160,55%,42%)]/8 border border-[hsl(160,55%,42%)]/25 p-7">
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: "hsl(160,55%,42%)" }}
              >
                <HeartHandshake className="h-6 w-6" aria-hidden />
              </div>
              <span className="rounded-full bg-[hsl(160,55%,42%)]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(160,55%,42%)]">
                Individuals
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
              Volunteer skills &amp; mentorship
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Advisors, mentors, and practitioners can offer time and expertise
              to strengthen program design and delivery.
            </p>
            <a
              href="#get-involved-form"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(160,55%,42%)] hover:underline focus-visible:underline"
            >
              Volunteer with us <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          {/* Donate */}
          <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--amber))]/8 border border-[hsl(var(--amber))]/25 p-7">
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: "hsl(var(--amber))" }}
              >
                <Heart className="h-6 w-6" aria-hidden />
              </div>
              <span className="rounded-full bg-[hsl(var(--amber))]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--amber))]">
                Supporters
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
              Donate
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Support education, WASH, health, and workforce programs.
              Contributions are tax-deductible to the extent allowed by law.
            </p>
            <a
              href="#get-involved-form"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--amber))] hover:underline focus-visible:underline"
            >
              Make a contribution <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          {/* Media & Press */}
          <div className="relative overflow-hidden rounded-2xl bg-[hsl(280,45%,55%)]/8 border border-[hsl(280,45%,55%)]/25 p-7">
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: "hsl(280,45%,55%)" }}
              >
                <Newspaper className="h-6 w-6" aria-hidden />
              </div>
              <span className="rounded-full bg-[hsl(280,45%,55%)]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(280,45%,55%)]">
                Media
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
              Media &amp; press
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Journalists and researchers can request interviews, background, or
              accurate context about the Foundation.
            </p>
            <a
              href="#get-involved-form"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(280,45%,55%)] hover:underline focus-visible:underline"
            >
              Reach out <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          {/* Partner with us */}
          <div className="relative overflow-hidden rounded-2xl bg-[hsl(var(--trust-blue))]/8 border border-[hsl(var(--trust-blue))]/25 p-7">
            <div className="flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ background: "hsl(var(--trust-blue))" }}
              >
                <Handshake className="h-6 w-6" aria-hidden />
              </div>
              <span className="rounded-full bg-[hsl(var(--trust-blue))]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--trust-blue))]">
                Institutions
              </span>
            </div>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
              Partner with us
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Institutions, implementers, and community-based organizations can
              propose collaborations that advance our shared mission.
            </p>
            <Link
              to="/partnership"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--trust-blue))] hover:underline focus-visible:underline"
            >
              Explore partnerships{" "}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Partnership redirect — early separation of individual vs organizational ── */}
      <div
        className="mt-10 flex flex-col gap-4 rounded-xl border border-border bg-[hsl(var(--warm-surface))] px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        role="complementary"
        aria-label="Partnership information"
      >
        <div className="flex items-start gap-3">
          <Handshake
            className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--trust-blue))]"
            aria-hidden
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
              Representing an organization?
            </p>
            <p className="mt-1 text-sm text-foreground font-medium">
              Institutional partnerships live on a dedicated page.
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Explore partnership tiers, principles, and onboarding for
              foundations, NGOs, and academic partners.
            </p>
          </div>
        </div>
        <Link
          to="/partnership"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--trust-blue))]/40 px-4 py-2 text-sm font-semibold text-[hsl(var(--trust-blue))] hover:bg-[hsl(var(--trust-blue))]/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--trust-blue))]"
        >
          Visit Partnerships <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      {/* ── Volunteer section — unified, cohesive ─────────────────────────────── */}
      <section className="mt-16" aria-labelledby="volunteer-section-heading">
        {/* Section header */}
        <div className="border-b border-border pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Volunteer with us
          </p>
          <h2
            id="volunteer-section-heading"
            className="mt-2 font-heading text-2xl font-semibold text-foreground"
          >
            Share your skills, shape a future
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Advisors and mentors have contributed thousands of hours to our
            learner community. Every skill area is welcome — one-time projects
            or multi-month engagements.
          </p>
        </div>

        {/* Impact strip — numbers as focal point, feels like proof */}
        <VolunteerImpactRibbon />

        {/* Role list — lightweight, not more large cards */}
        <VolunteerRoles />
      </section>

      {/* ── Small actions ─────────────────────────────────────────────────────── */}
      <section className="mt-16" aria-labelledby="everyday-actions">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Small actions, real impact
        </p>
        <h2
          id="everyday-actions"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          Ways to help in five minutes or less
        </h2>

        <div className="mt-6 divide-y divide-border rounded-xl border border-border overflow-hidden">
          {[
            {
              icon: Share2,
              title: "Share our stories",
              body: "Amplify learner journeys on your networks to widen our reach.",
              accent: "hsl(var(--trust-blue))",
            },
            {
              icon: Mail,
              title: "Subscribe to updates",
              body: "Get quarterly progress notes and cohort milestones by email.",
              accent: "hsl(var(--amber))",
            },
            {
              icon: Calendar,
              title: "Attend an event",
              body: "Join a demo day, community convening, or open house.",
              accent: "hsl(160,55%,42%)",
            },
            {
              icon: BookOpen,
              title: "Read the research",
              body: "Explore our reports and resources to inform your own work.",
              accent: "hsl(280,45%,55%)",
            },
          ].map((a) => (
            <a
              key={a.title}
              href="#get-involved-form"
              className="group flex items-center gap-4 bg-card px-5 py-4 transition-colors hover:bg-[hsl(var(--warm-surface))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[hsl(var(--trust-blue))]"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ background: a.accent }}
              >
                <a.icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {a.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {a.body}
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>

      {/* ── Contribution form — final conversion point ────────────────────────── */}
      <section className="mt-16" aria-labelledby="get-involved-form">
        <div className="rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Tell us more
          </p>
          <h2
            id="get-involved-form"
            className="mt-2 font-heading text-2xl font-semibold text-foreground"
          >
            How would you like to contribute?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Share a bit about you or your organization and the pathway that fits
            best. We will follow up personally.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <InquiryForm sourcePage="/get-involved" defaultType="volunteer" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
