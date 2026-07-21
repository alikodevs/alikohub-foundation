import { PageShell } from "@/components/foundation/PageShell";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { EcosystemArchitectureSection } from "@/components/foundation/ProgramSections";
import { foundation, approach } from "@/config/foundation";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <PageShell
      eyebrow="About"
      title="A foundation built on listening."
      intro="AlikoHub Foundation exists to help communities turn their own resourcefulness into lasting opportunity. We work alongside local leaders, not around them."
    >
      <section className="grid gap-10 lg:grid-cols-2">
        <article>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Our mission</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{foundation.mission}</p>
        </article>
        <article>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Our vision</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{foundation.vision}</p>
        </article>
      </section>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold text-foreground">How we work</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A disciplined five-stage approach that keeps community priorities at the center of every decision.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {approach.map((s, i) => (
            <li key={s.stage} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{s.stage}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.meaning}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-secondary/60 p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Where we start</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Our organizational home is Washington State, USA, with priority program focus in Ethiopia. Additional regions will only be added when partnerships and legal permissions are documented.
          </p>
          <Link to="/where-we-work" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Where we work &rarr;
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-secondary/60 p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Who governs us</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A founding board of three directors provides oversight, ensures accountability, and safeguards mission alignment.
          </p>
          <Link to="/governance" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Meet the board &rarr;
          </Link>
        </div>
      </section>

      <div className="mt-16">
        <LegalSeparationStrip />
      </div>
    </PageShell>
  );
}
