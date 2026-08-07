import { PageShell } from "@/components/foundation/PageShell";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { EcosystemArchitectureSection } from "@/components/foundation/ProgramSections";
import { foundation, approach } from "@/config/foundation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Wrench, Rocket, LineChart, Move, MapPin, Users } from "lucide-react";

const stageIcons = { Listen: Compass, Equip: Wrench, Implement: Rocket, Measure: LineChart, Scale: Move } as const;

const QUICK_FACTS = [
  { label: "Founded", value: "2026" },
  { label: "HQ", value: "Seattle, WA" },
  { label: "Priority region", value: "Ethiopia" },
  { label: "Program areas", value: "7" },
];

export default function About() {
  return (
    <PageShell
      eyebrow="About"
      title="A foundation built on listening."
      intro="AlikoHub Foundation exists to help communities turn their own resourcefulness into lasting opportunity. We work alongside local leaders, not around them."
      afterContent={<EcosystemArchitectureSection />}
    >
      {/* Split hero: editorial content + documentary photo with stat overlay */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-stretch lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center py-2"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[hsl(var(--amber))]" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--amber))]">
                At a glance
              </p>
            </div>

            <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Turning local{" "}
              <span className="text-[hsl(var(--trust-blue))]">resourcefulness</span>{" "}
              into lasting opportunity.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {foundation.mission}
            </p>
            <p className="mt-4 text-sm italic text-muted-foreground/90">&ldquo;{foundation.tagline}&rdquo;</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--trust-blue))] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
              >
                Explore our programs <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/governance"
                className="group inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[hsl(var(--trust-blue))] hover:text-[hsl(var(--trust-blue))]"
              >
                Meet the board
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative min-h-[340px] overflow-hidden rounded-2xl lg:min-h-[460px]"
          >
            <img
              src="https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?auto=format&fit=crop&w=1400&q=85"
              alt="Community meeting with young African leaders around a table"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))]/90 via-[hsl(var(--navy))]/25 to-transparent" />

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[hsl(var(--navy))]/65 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {QUICK_FACTS.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">{f.label}</dt>
                    <dd className="mt-1 font-heading text-sm font-extrabold leading-tight text-white">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </motion.section>


      {/* Mission / Vision compact */}
      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-[hsl(var(--trust-blue))] p-6 text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Our mission</p>
          <h3 className="mt-2 font-heading text-xl font-bold">Turning resourcefulness into opportunity.</h3>
          <p className="mt-3 text-sm leading-relaxed opacity-95">{foundation.mission}</p>
        </article>
        <article className="rounded-2xl bg-[hsl(var(--amber))] p-6 text-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">Our vision</p>
          <h3 className="mt-2 font-heading text-xl font-bold">A future authored locally.</h3>
          <p className="mt-3 text-sm leading-relaxed opacity-95">{foundation.vision}</p>
        </article>
      </section>

      {/* Compact horizontal stepper */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">How we work</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Listen. Equip. Implement. Measure. Scale.</h2>
          </div>
          <Link to="/programs" className="inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--trust-blue))] hover:underline">
            See it in the programs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ol className="relative mt-8 grid gap-3 md:grid-cols-5">
          <div className="absolute left-4 right-4 top-5 hidden h-px bg-gradient-to-r from-[hsl(var(--trust-blue))] via-[hsl(var(--amber))] to-[hsl(var(--trust-blue))] md:block" aria-hidden />
          {approach.map((s, i) => {
            const Icon = stageIcons[s.stage as keyof typeof stageIcons];
            return (
              <motion.li
                key={s.stage}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-2">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] text-white ring-4 ring-background">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--amber))]">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-foreground">{s.stage}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.meaning}</p>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* Where + Who compact side-by-side */}
      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <Link
          to="/where-we-work"
          className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--trust-blue))] text-white">
            <MapPin className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Where we start</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Seattle, Washington and Ethiopia. Regions expand only when partnerships and permissions are documented.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--trust-blue))]">
              Where we work <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
        <Link
          to="/governance"
          className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--amber))] text-white">
            <Users className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Who governs us</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A founding board of three directors provides oversight and safeguards mission alignment.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[hsl(var(--amber))]">
              Meet the board <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </section>

      <div className="mt-14">
        <LegalSeparationStrip />
      </div>
    </PageShell>
  );
}
