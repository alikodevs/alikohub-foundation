import { PageShell } from "@/components/foundation/PageShell";
import {
  Users,
  Briefcase,
  Target,
  TrendingUp,
  CheckCircle2,
  BookOpenCheck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { ScalePrinciplesSection, CostEfficiencySection } from "@/components/foundation/ProgramSections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const outcomeAreas = [
  { icon: Users, title: "Youth reached", note: "Learners engaged through Foundation-supported programs based in Seattle, Washington and Ethiopia.", tone: "bg-[hsl(var(--trust-blue))]" },
  { icon: Briefcase, title: "Employment & income", note: "Participants moving into jobs, apprenticeships, or youth-led enterprise after a program.", tone: "bg-[hsl(var(--amber))]" },
  { icon: Target, title: "Gender inclusion", note: "A program-wide floor for young women's participation, with equal access to mentorship.", tone: "bg-[hsl(var(--terracotta))]" },
  { icon: TrendingUp, title: "Youth-led ventures", note: "New enterprises incubated with mentorship, seed support, and market access.", tone: "bg-[hsl(var(--sage))]" },
  { icon: HeartHandshake, title: "Community partnerships", note: "Formal partnerships with local institutions, employers, and community leaders.", tone: "bg-gradient-to-br from-[hsl(var(--trust-blue))] to-[hsl(var(--amber))]" },
];

const reportingCommitments = [
  "Learning-aligned curricula co-designed with local partners",
  "Mentors and technical experts engaged each year",
  "Internships and placements coordinated with employers",
  "Matchmaking and community events hosted",
  "Public-private partnerships formalized annually",
  "Programs mapped to the UN Sustainable Development Goals",
];

const principles = [
  { icon: CheckCircle2, title: "Verified before published", body: "Numbers appear here only after they are documented, checked against source records, and validated with community partners.", tone: "bg-[hsl(var(--trust-blue))]" },
  { icon: BookOpenCheck, title: "Methodology in the open", body: "Each figure links to how it was collected, what it does and does not measure, and known limitations.", tone: "bg-[hsl(var(--plum))]" },
  { icon: Users, title: "Community-defined outcomes", body: "The outcomes that matter are chosen with the communities we serve, not imposed from outside.", tone: "bg-[hsl(var(--sage))]" },
  { icon: ShieldCheck, title: "Privacy protected", body: "We collect the minimum data needed, obtain informed consent, and never publish information that could put participants at risk.", tone: "bg-[hsl(var(--amber))]" },
];

const HEADLINE_STATS = [
  { value: "5", label: "Outcome areas tracked" },
  { value: "7", label: "Program pillars" },
  { value: "≥45%", label: "Women's participation floor" },
  { value: "17", label: "SDGs mapped" },
];

export default function Impact() {
  return (
    <PageShell
      eyebrow="Impact"
      title="What we measure, and how."
      intro="A performance framework designed to measure reach, quality, equity, and long-term impact across the communities we serve. Baseline numbers will be published once independently verified."
      afterContent={
        <>
          <ScalePrinciplesSection />
          <CostEfficiencySection />
        </>
      }
    >
      {/* Image-anchored KPI band */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card-hover)]">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85"
            alt="Diverse team of young professionals reviewing data together"
            className="h-full min-h-[240px] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))]/85 via-[hsl(var(--navy))]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Measured, not claimed</p>
            <p className="mt-1 font-heading text-xl font-bold leading-tight">Credibility we build.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Framework at a glance</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Reach, quality, equity, mobility.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Four dimensions guide every metric we publish. Baselines are set with partners on the ground.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {HEADLINE_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border border-border bg-background px-3 py-3 text-center"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{s.label}</dt>
                <dd className={`mt-1 font-heading text-xl font-extrabold ${i % 2 === 0 ? "text-[hsl(var(--trust-blue))]" : "text-[hsl(var(--amber))]"}`}>
                  {s.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* Outcome areas — tighter cards */}
      <section className="mt-14" aria-labelledby="outcome-areas">
        <h2 id="outcome-areas" className="font-heading text-2xl font-semibold text-foreground">Outcome areas</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomeAreas.map((k) => (
            <article
              key={k.title}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className={`relative h-16 ${k.tone}`}>
                <div className="absolute bottom-2.5 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/25 ring-1 ring-white/40 backdrop-blur-md">
                  <k.icon className="h-4 w-4 text-white" aria-hidden />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-foreground">{k.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{k.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reporting commitments — accordion (space saving) */}
      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Annual reporting</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">What we publish each year.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A predictable rhythm keeps our partners, communities, and board in step. Tap any item to see the intent.
          </p>
        </div>
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4 shadow-[var(--shadow-card)]">
          {reportingCommitments.map((label, i) => (
            <AccordionItem key={label} value={`item-${i}`} className="border-b last:border-b-0">
              <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline">
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] text-[10px] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-9 text-xs leading-relaxed text-muted-foreground">
                Published in the annual report with source data, methodology notes, and community sign-off.
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Principles */}
      <section className="mt-14" aria-labelledby="how-we-report">
        <h2 id="how-we-report" className="font-heading text-2xl font-semibold text-foreground">How we report</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <article
              key={p.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.tone} shadow-md ring-1 ring-white/30`}>
                <p.icon className="h-5 w-5 text-white" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
