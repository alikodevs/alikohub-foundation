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
      afterContent={<EcosystemArchitectureSection />}
    >

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl bg-[hsl(var(--trust-blue))] p-8 text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Our mission</p>
          <h2 className="mt-3 font-heading text-2xl font-bold">Turning resourcefulness into opportunity.</h2>
          <p className="mt-4 text-sm leading-relaxed opacity-95">{foundation.mission}</p>
        </article>
        <article className="rounded-2xl bg-[hsl(var(--amber))] p-8 text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">Our vision</p>
          <h2 className="mt-3 font-heading text-2xl font-bold">A future authored locally.</h2>
          <p className="mt-4 text-sm leading-relaxed opacity-95">{foundation.vision}</p>
        </article>
      </section>

      <section className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">How we work</p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Listen. Equip. Implement. Measure. Scale.</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A disciplined five-stage approach that keeps community priorities at the center of every decision.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {approach.map((s, i) => {
            const palette = [
              "bg-[hsl(var(--trust-blue))] text-white",
              "bg-[hsl(var(--amber))] text-white",
              "bg-gradient-to-br from-[hsl(var(--trust-blue))] to-[hsl(var(--navy-light))] text-white",
              "bg-[hsl(var(--trust-blue))] text-white",
              "bg-[hsl(var(--amber))] text-white",
            ];
            return (
              <li
                key={s.stage}
                className={`${palette[i]} rounded-2xl p-5 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Step {i + 1}</p>
                <h3 className="mt-2 font-heading text-lg font-bold">{s.stage}</h3>
                <p className="mt-2 text-sm opacity-95">{s.meaning}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-[hsl(var(--trust-blue))] p-8 text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
          <h2 className="font-heading text-lg font-bold">Where we start</h2>
          <p className="mt-2 text-sm leading-relaxed opacity-95">
            Our organizational home is Washington State, USA, with priority program focus in Ethiopia. Additional regions will only be added when partnerships and legal permissions are documented.
          </p>
          <Link to="/where-we-work" className="mt-4 inline-flex items-center text-sm font-semibold text-white underline-offset-4 hover:underline">
            Where we work &rarr;
          </Link>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-[hsl(var(--trust-blue))] via-[hsl(var(--navy-light))] to-[hsl(var(--amber))] p-8 text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
          <h2 className="font-heading text-lg font-bold">Who governs us</h2>
          <p className="mt-2 text-sm leading-relaxed opacity-95">
            A founding board of three directors provides oversight, ensures accountability, and safeguards mission alignment.
          </p>
          <Link to="/governance" className="mt-4 inline-flex items-center text-sm font-semibold text-white underline-offset-4 hover:underline">
            Meet the board &rarr;
          </Link>
        </div>
      </section>

      <div className="mt-16">
        <LegalSeparationStrip />
      </div>
    </PageShell>
    <EcosystemArchitectureSection />
    </>
  );
}
