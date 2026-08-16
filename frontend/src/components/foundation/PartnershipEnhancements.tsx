import {
  Award,
  Medal,
  Shield,
  HandCoins,
  Package,
  GraduationCap,
  CalendarHeart,
  Quote,
  Sparkles,
} from "lucide-react";

// Sponsorship tiers inspired by leading nonprofit partner programs,
// adapted to AlikoHub Foundation's workforce + education mission.
const tiers = [
  {
    name: "Founding Partner",
    range: "$100k+ annually",
    icon: Award,
    accent: "hsl(var(--amber))",
    perks: [
      "Named co-design of a program cohort",
      "Quarterly executive briefings",
      "Featured recognition across Foundation channels",
      "Site visits in Seattle and Ethiopia",
    ],
  },
  {
    name: "Program Partner",
    range: "$25k – $100k",
    icon: Medal,
    accent: "hsl(var(--trust-blue))",
    perks: [
      "Sponsor a pillar cohort or certification track",
      "Semi-annual impact reports",
      "Logo placement on program materials",
      "Invitations to convenings and demo days",
    ],
  },
  {
    name: "Community Partner",
    range: "Up to $25k or in-kind",
    icon: Shield,
    accent: "hsl(160,55%,42%)",
    perks: [
      "Fund materials, stipends, or mentorship hours",
      "Annual acknowledgment on partners page",
      "Volunteer and mentorship pathways for staff",
      "Access to community events and stories",
    ],
  },
];

const waysToSupport = [
  {
    icon: HandCoins,
    title: "Monetary contributions",
    body: "Unrestricted or program-specific funding that lets us move quickly where communities need us most.",
  },
  {
    icon: GraduationCap,
    title: "Sponsor certifications",
    body: "Cover the cost of industry certifications and credentials that unlock formal employment for learners.",
  },
  {
    icon: Package,
    title: "In-kind materials",
    body: "Devices, learning kits, tools, and workspace resources that reduce our delivery cost per learner.",
  },
  {
    icon: CalendarHeart,
    title: "Event sponsorship",
    body: "Underwrite cohort launches, demo days, and community convenings across Seattle and Ethiopia.",
  },
];

const testimonials = [
  {
    quote:
      "A rare partner that listens first, then builds. Their programs turn out learners who are ready to contribute from day one.",
    name: "Program Director",
    org: "Workforce partner, Seattle",
    accent: "hsl(var(--trust-blue))",
  },
  {
    quote:
      "AlikoHub Foundation invests where it is hardest and most needed. The measurement discipline is what sets them apart.",
    name: "Grants Lead",
    org: "Institutional funder",
    accent: "hsl(var(--amber))",
  },
  {
    quote:
      "The collaboration model respects local leadership. It is a template for how cross-border partnerships should work.",
    name: "Executive Director",
    org: "Community-based partner, Ethiopia",
    accent: "hsl(160,55%,42%)",
  },
];

// ── PartnershipTiers ────────────────────────────────────────────────────────
// Structured horizontal rows — NOT pricing cards.
// Each tier: identity (icon + name + range) on the left, perks grid on the right.
export function PartnershipTiers() {
  return (
    <section className="mt-16" aria-labelledby="tiers-heading">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Ways to partner
        </p>
        <h2
          id="tiers-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          Partnership levels
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every partnership is co-designed. These levels are a starting point,
          not a menu. We tailor scope, recognition, and reporting to what your
          organization needs.
        </p>
      </div>
      <div className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="flex flex-col gap-5 bg-card p-6 sm:flex-row sm:gap-8 sm:p-7"
          >
            {/* Identity: icon + name + range */}
            <div className="flex items-start gap-4 sm:w-52 sm:shrink-0">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ background: t.accent }}
              >
                <t.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">
                  {t.name}
                </h3>
                <p
                  className="mt-0.5 text-xs font-semibold"
                  style={{ color: t.accent }}
                >
                  {t.range}
                </p>
              </div>
            </div>
            {/* Perks */}
            <ul className="grid flex-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {t.perks.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: t.accent }}
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── WaysToSupport ────────────────────────────────────────────────────────────
// Lightweight divide-y list rows — NOT a card grid.
// Communicates: "partnership isn't only about writing a check."
export function WaysToSupport() {
  return (
    <section className="mt-16" aria-labelledby="ways-heading">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Beyond funding
        </p>
        <h2
          id="ways-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          We also welcome
        </h2>
      </div>
      <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {waysToSupport.map((w) => (
          <div
            key={w.title}
            className="flex items-start gap-4 bg-card px-5 py-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
              <w.icon className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold text-foreground">
                {w.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {w.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PartnerVoices ────────────────────────────────────────────────────────────
// Three-card grid — the original design preserved as requested.
export function PartnerVoices() {
  return (
    <section className="mt-16" aria-labelledby="voices-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Why partners work with us
          </p>
          <h2
            id="voices-heading"
            className="mt-2 font-heading text-2xl font-semibold text-foreground"
          >
            In their words
          </h2>
        </div>
        <Sparkles
          className="hidden h-5 w-5 text-[hsl(var(--amber))] sm:block"
          aria-hidden
        />
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative rounded-2xl border border-border bg-card p-6"
          >
            <Quote
              className="h-6 w-6"
              style={{ color: t.accent }}
              aria-hidden
            />
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 border-t border-border pt-3">
              <p className="font-heading text-sm font-semibold text-foreground">
                {t.name}
              </p>
              <p className="text-xs text-muted-foreground">{t.org}</p>
            </figcaption>
            <div
              className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl"
              style={{ background: t.accent }}
              aria-hidden
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

// ── Volunteer components (used by GetInvolved page) ─────────────────────────

const volunteerImpact = [
  {
    k: "Mentorship hours",
    v: "1,200+",
    note: "Delivered by advisors across cohorts",
  },
  {
    k: "Skill areas",
    v: "12",
    note: "From curriculum design to career coaching",
  },
  {
    k: "Locations",
    v: "Seattle & Ethiopia",
    note: "Remote-friendly for most roles",
  },
  {
    k: "Time commitment",
    v: "Flexible",
    note: "One-time projects to multi-month engagements",
  },
];

const volunteerRoles = [
  {
    title: "Mentors & coaches",
    body: "Guide learners one-on-one through career planning, portfolio reviews, and interview readiness.",
    accent: "hsl(var(--trust-blue))",
  },
  {
    title: "Curriculum advisors",
    body: "Shape learning tracks in tech, health, workforce, and entrepreneurship alongside our program leads.",
    accent: "hsl(var(--amber))",
  },
  {
    title: "Industry connectors",
    body: "Open doors to apprenticeships, employers, and networks that help learners land dignified work.",
    accent: "hsl(160,55%,42%)",
  },
  {
    title: "Skills-based volunteers",
    body: "Contribute legal, design, data, communications, or operations expertise to strengthen delivery.",
    accent: "hsl(280,45%,55%)",
  },
];

export function VolunteerImpactRibbon() {
  return (
    <div
      className="mt-8 flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0"
      aria-label="Volunteer impact statistics"
    >
      {volunteerImpact.map((s) => (
        <div
          key={s.k}
          className="flex-1 px-5 py-4 first:pl-0 last:pr-0 sm:first:pl-0 sm:last:pr-0"
        >
          <p className="font-heading text-2xl font-bold text-foreground">{s.v}</p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">
            {s.k}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
            {s.note}
          </p>
        </div>
      ))}
    </div>
  );
}

export function VolunteerRoles() {
  return (
    <div className="mt-10" aria-labelledby="roles-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
        Roles that make a difference
      </p>
      <h2
        id="roles-heading"
        className="mt-2 font-heading text-xl font-semibold text-foreground"
      >
        Where volunteers plug in
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {volunteerRoles.map((r) => (
          <div
            key={r.title}
            className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-[hsl(var(--warm-surface))]"
          >
            <div
              className="mt-1 w-0.5 shrink-0 self-stretch rounded-full"
              style={{ background: r.accent }}
              aria-hidden
            />
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                {r.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {r.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
