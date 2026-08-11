import { PageShell } from "@/components/foundation/PageShell";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { EcosystemArchitectureSection } from "@/components/foundation/ProgramSections";
import { foundation, approach, leadership as defaultLeadership } from "@/config/foundation";
import { LeadershipCarousel, Leader } from "@/components/foundation/LeadershipCarousel";
import { usePublicTeam } from "@/hooks/useCms";
import { getFullMediaUrl } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Wrench, Rocket, LineChart, Move, MapPin, Users } from "lucide-react";

const stageIcons = { Listen: Compass, Equip: Wrench, Implement: Rocket, Measure: LineChart, Scale: Move } as const;

const QUICK_FACTS = [
  { label: "Founded", value: "2026" },
  { label: "HQ", value: "Seattle, WA" },
  { label: "Priority region", value: "Ethiopia" },
  { label: "Focus areas", value: "7 core pillars" },
];

export default function About() {
  const { data: publicTeam } = usePublicTeam();

  const leadershipPeople: Leader[] =
    publicTeam && publicTeam.length > 0
      ? publicTeam.map((item: Record<string, unknown>, index: number) => {
          const defaultFallback = defaultLeadership[index % defaultLeadership.length];
          const rawImg =
            (item.imageUrl as string) ||
            (item.image_url as string) ||
            (item.image as string) ||
            (item.photo as string);

          return {
            name: (item.name as string) || defaultFallback.name,
            role: (item.role as string) || defaultFallback.role,
            bio: (item.bio as string) || defaultFallback.bio,
            photo: rawImg ? getFullMediaUrl(rawImg) : defaultFallback.photo,
          };
        })
      : (defaultLeadership as readonly Leader[]);

  return (
    <PageShell
      eyebrow="About AlikoHub Foundation"
      title="Rooted locally. Accountable globally."
      intro="AlikoHub Foundation is a mission-driven nonprofit committed to expanding equitable access to education, workforce development, technology, public health, WASH, entrepreneurship, and community resilience."
    >
      {/* Quick-fact bar */}
      <div className="mb-12 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {QUICK_FACTS.map((fact) => (
          <div key={fact.label} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{fact.label}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground sm:text-base">{fact.value}</p>
          </div>
        ))}
      </div>

      {/* Identity & separation notice */}
      <section className="rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--trust-blue))]">
              Organizational Identity
            </span>
            <h2 className="mt-1 font-heading text-xl font-bold text-foreground sm:text-2xl">
              Independent Governance & Mission Integrity
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {foundation.separationStatement}
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/governance"
              className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--trust-blue))] px-5 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              Explore Governance & Board <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision grid */}
      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Our Mission</span>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Why We Exist</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{foundation.mission}</p>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--trust-blue))]">Our Vision</span>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Where We Are Going</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{foundation.vision}</p>
        </article>
      </section>

      {/* Ecosystem Architecture */}
      <div className="mt-16">
        <EcosystemArchitectureSection />
      </div>

      {/* 5-Stage Approach */}
      <section className="mt-16" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Operating Model</span>
          <h2 id="approach-heading" className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Our 5-Stage Approach
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A practical methodology designed for accountable community outcomes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {approach.map((step, idx) => {
            const Icon = stageIcons[step.stage as keyof typeof stageIcons] || Compass;
            return (
              <div
                key={step.stage}
                className="relative rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--amber))]">
                    0{idx + 1}
                  </span>
                  <Icon className="h-5 w-5 text-[hsl(var(--trust-blue))]" />
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-foreground">{step.stage}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.meaning}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where We Work preview banner */}
      <section className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">
              <MapPin className="h-3.5 w-3.5" /> Global & Local Presence
            </span>
            <h2 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">
              From Seattle to Local Communities in Ethiopia
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AlikoHub Foundation combines international nonprofit standards with deep local operational roots in Ethiopia, pairing global donor accountability with authentic community ownership.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link
              to="/where-we-work"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-xs font-bold text-foreground transition-colors hover:bg-muted"
            >
              Where We Work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--trust-blue))] px-5 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              View Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Governance CTA */}
      <section className="mt-16">
        <Link
          to="/governance"
          className="group block rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-6 sm:p-8 transition-colors hover:border-[hsl(var(--amber))]/50"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--trust-blue))]">
                <Users className="h-3.5 w-3.5" /> Governance & Leadership
              </span>
              <h3 className="mt-1 font-heading text-lg font-bold text-foreground sm:text-xl">
                Meet our Board of Directors and Leadership Team
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Independent board oversight, executive leadership bios, and compliance safeguards.
              </p>
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--amber))]">
              Meet the board <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      <div className="mt-14">
        <LeadershipCarousel eyebrow="Our people" title="Leadership Team" people={leadershipPeople} />
      </div>

      <div className="mt-14">
        <LegalSeparationStrip />
      </div>
    </PageShell>
  );
}
