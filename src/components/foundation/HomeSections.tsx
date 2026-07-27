import { approach, programPillars, foundation } from "@/config/foundation";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Wrench, Rocket, LineChart, Move } from "lucide-react";

const stageIcons = {
  Listen: Compass,
  Equip: Wrench,
  Implement: Rocket,
  Measure: LineChart,
  Scale: Move,
} as const;

export function MissionBand() {
  return (
    <section className="border-b border-border bg-secondary py-14 sm:py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Our mission</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Locally grounded programs, global partnerships.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {foundation.mission}
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground">
              &ldquo;{foundation.tagline}&rdquo;
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Our approach</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">
              Listen. Equip. Implement. Measure. Scale.
            </h3>
            <ol className="mt-6 space-y-3">
              {approach.map((s) => {
                const Icon = stageIcons[s.stage as keyof typeof stageIcons];
                return (
                  <li
                    key={s.stage}
                    className="flex items-start gap-4 rounded-lg border border-border bg-background p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.stage}</p>
                      <p className="text-sm text-muted-foreground">{s.meaning}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProgramPillarsSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Program areas</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Seven interconnected pillars.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Seven interconnected program areas advancing our mission across education,
              health, technology, WASH, and community resilience.
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all programs
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programPillars.map((p, i) => {
            const cycle = [
              { bg: "bg-[hsl(var(--trust-blue))]", fg: "text-white" },
              { bg: "bg-[hsl(var(--amber))]", fg: "text-white" },
              { bg: "bg-gradient-to-br from-[hsl(var(--trust-blue))] via-[hsl(var(--navy-light))] to-[hsl(var(--amber))]", fg: "text-white" },
            ];
            const s = cycle[i % 3];
            return (
              <article
                key={p.slug}
                className={`${s.bg} ${s.fg} group rounded-2xl p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]`}
              >
                <h3 className="font-heading text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-95">{p.summary}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhereWeWorkPreview() {
  return (
    <section
      className="border-b border-border py-20"
      style={{ background: "var(--gradient-navy)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Where we work
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Rooted in place. Connected globally.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/85">
              Based in Seattle, Washington, with priority delivery in Ethiopia. Every program is locally led and community-designed, built to travel as partnerships grow.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                place: "Seattle, Washington · USA",
                role: "Organizational home, governance, diaspora engagement, and U.S.-based partnerships.",
              },
              {
                place: "Ethiopia",
                role: "Priority region for community-designed programs across education, WASH, and workforce development.",
              },
            ].map((r) => (
              <div key={r.place} className="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="font-heading text-lg font-semibold text-white">
                  {r.place}
                </h3>
                <p className="mt-2 text-sm text-white/85">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TransparencyBand() {
  return (
    <section className="border-b border-border bg-secondary py-20">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Trust & transparency
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Credibility we build, not claim.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We publish our legal status, governing board, safeguarding commitments,
              policies, and annual financial reports openly so partners and communities
              can make informed decisions.
            </p>
            <Link
              to="/transparency"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View transparency
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "501(c)(3) public charity",
              "Board of directors listed",
              "Independent nonprofit governance",
              "Safeguarding framework in force",
              "Privacy & accessibility notices",
              "Annual audited financials",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Build lasting opportunity with us.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Whether you represent an institution, a community, or bring skills and mentorship,
            there is a role for you in the Foundation&rsquo;s next chapter.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/partnership"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition hover:brightness-110"
            >
              Partner With Us
            </Link>
            <Link
              to="/programs"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              See What We Deliver
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
