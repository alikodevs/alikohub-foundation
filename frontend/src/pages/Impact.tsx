import { useEffect, useMemo, useRef, useState } from "react";
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
  Layers,
  Handshake,
  CalendarDays,
  GraduationCap,
  UserCheck,
  Building2,
  Globe2,
} from "lucide-react";
import { ScalePrinciplesSection, CostEfficiencySection } from "@/components/foundation/ProgramSections";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = "direct" | "ecosystem";

const outcomeAreas: {
  icon: typeof Users;
  title: string;
  note: string;
  tone: string;
  category: Category;
}[] = [
  { icon: Users, title: "Youth reached", note: "Learners engaged through Foundation-supported programs based in Seattle, Washington and Ethiopia.", tone: "bg-[hsl(var(--trust-blue))]", category: "direct" },
  { icon: Briefcase, title: "Employment & income", note: "Participants moving into jobs, apprenticeships, or youth-led enterprise after a program.", tone: "bg-[hsl(var(--amber))]", category: "direct" },
  { icon: Target, title: "Gender inclusion", note: "A program-wide floor for young women's participation, with equal access to mentorship.", tone: "bg-[hsl(var(--terracotta))]", category: "direct" },
  { icon: TrendingUp, title: "Youth-led ventures", note: "New enterprises incubated with mentorship, seed support, and market access.", tone: "bg-[hsl(var(--sage))]", category: "ecosystem" },
  { icon: HeartHandshake, title: "Community partnerships", note: "Formal partnerships with local institutions, employers, and community leaders.", tone: "bg-[hsl(var(--plum))]", category: "ecosystem" },
];

const outcomeFilters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All areas" },
  { id: "direct", label: "Direct to participants" },
  { id: "ecosystem", label: "Ecosystem building" },
];

const reportingCommitments = [
  {
    icon: GraduationCap,
    short: "Curricula",
    label: "Learning-aligned curricula co-designed with local partners",
    detail:
      "Every curriculum is reviewed with local educators and employers before delivery, then published with the learning outcomes it is designed to produce.",
  },
  {
    icon: UserCheck,
    short: "Mentors",
    label: "Mentors and technical experts engaged each year",
    detail:
      "We report how many mentors and technical experts contributed, the hours they gave, and how mentorship was matched to participants.",
  },
  {
    icon: Briefcase,
    short: "Placements",
    label: "Internships and placements coordinated with employers",
    detail:
      "Placement counts are reconciled with employer records, including the share of participants still in role after six and twelve months.",
  },
  {
    icon: CalendarDays,
    short: "Events",
    label: "Matchmaking and community events hosted",
    detail:
      "Event attendance, participant mix, and the partnerships or placements that resulted are documented for each convening.",
  },
  {
    icon: Building2,
    short: "Partnerships",
    label: "Public-private partnerships formalized annually",
    detail:
      "Each formalized partnership is listed with its scope, the commitments made by both parties, and the outcomes it is accountable for.",
  },
  {
    icon: Globe2,
    short: "SDG mapping",
    label: "Programs mapped to the UN Sustainable Development Goals",
    detail:
      "Programs are mapped to the SDGs they contribute to, with a note on what the mapping does and does not claim.",
  },
];

const principles = [
  { icon: CheckCircle2, title: "Verified before published", body: "Numbers appear here only after they are documented, checked against source records, and validated with community partners.", tone: "bg-[hsl(var(--trust-blue))]" },
  { icon: BookOpenCheck, title: "Methodology in the open", body: "Each figure links to how it was collected, what it does and does not measure, and known limitations.", tone: "bg-[hsl(var(--plum))]" },
  { icon: Users, title: "Community-defined outcomes", body: "The outcomes that matter are chosen with the communities we serve, not imposed from outside.", tone: "bg-[hsl(var(--sage))]" },
  { icon: ShieldCheck, title: "Privacy protected", body: "We collect the minimum data needed, obtain informed consent, and never publish information that could put participants at risk.", tone: "bg-[hsl(var(--amber))]" },
];

const framework = [
  {
    id: "reach",
    label: "Reach",
    icon: Users,
    value: 5,
    suffix: "",
    statLabel: "Outcome areas tracked",
    description:
      "How many young people we engage, where they come from, and how consistently they stay with a program from start to finish.",
  },
  {
    id: "quality",
    label: "Quality",
    icon: Layers,
    value: 7,
    suffix: "",
    statLabel: "Program pillars",
    description:
      "Whether the training holds up: curriculum standards, mentor quality, completion rates, and what participants say about the experience.",
  },
  {
    id: "equity",
    label: "Equity",
    icon: Handshake,
    value: 45,
    prefix: "≥",
    suffix: "%",
    statLabel: "Women's participation floor",
    description:
      "Who gets access. We hold a program-wide floor for young women's participation and track access for underserved communities.",
  },
  {
    id: "mobility",
    label: "Mobility",
    icon: TrendingUp,
    value: 17,
    suffix: "",
    statLabel: "SDGs mapped",
    description:
      "What changes afterwards: jobs, income, enterprise creation, and how those outcomes connect to global development goals.",
  },
] as const;

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
}

function FrameworkTabs() {
  const [active, setActive] = useState(0);
  const item = framework[active];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Framework at a glance</p>
      <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">Reach, quality, equity, mobility.</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Four dimensions guide every metric we publish. Baselines are set with partners on the ground.
      </p>

      <div role="tablist" aria-label="Impact framework" className="mt-5 flex flex-wrap gap-1 rounded-xl border border-border bg-background p-1">
        {framework.map((f, i) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "relative flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm",
              i === active ? "text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {i === active && (
              <motion.span
                layoutId="framework-pill"
                className="absolute inset-0 rounded-lg bg-[hsl(var(--trust-blue))]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-5 flex flex-col gap-4 rounded-xl border border-border bg-background p-5 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--trust-blue))]">
              <item.icon className="h-5 w-5 text-white" aria-hidden />
            </span>
            <div>
              <div className="font-heading text-3xl font-extrabold text-[hsl(var(--trust-blue))]">
                <AnimatedNumber value={item.value} prefix={"prefix" in item ? item.prefix : ""} suffix={item.suffix} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{item.statLabel}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ReportingCycle() {
  const [active, setActive] = useState(0);
  const item = reportingCommitments[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[340px]">
        <div className="absolute inset-6 rounded-full border border-dashed border-border" aria-hidden />
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border bg-card px-3 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Annual cycle</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={item.short}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-1 font-heading text-sm font-bold text-foreground"
            >
              {item.short}
            </motion.span>
          </AnimatePresence>
        </div>

        {reportingCommitments.map((c, i) => {
          const angle = (i / reportingCommitments.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          const isActive = i === active;
          return (
            <button
              key={c.label}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={c.label}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={cn(
                "group absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--trust-blue))]",
                isActive
                  ? "border-transparent bg-[hsl(var(--trust-blue))] scale-110"
                  : "border-border bg-card hover:-translate-y-[calc(50%+2px)]"
              )}
            >
              <c.icon
                className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                  isActive ? "text-white" : "text-[hsl(var(--trust-blue))]"
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Annual reporting</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">What we publish each year.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A predictable rhythm keeps our partners, communities, and board in step. Select a node to see what each commitment covers.
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] text-[10px] font-bold text-white">
                {String(active + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-base font-bold text-foreground">{item.label}</h3>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OutcomeAreas() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const visible = useMemo(
    () => outcomeAreas.filter((o) => filter === "all" || o.category === filter),
    [filter]
  );

  return (
    <section className="mt-14" aria-labelledby="outcome-areas">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="outcome-areas" className="font-heading text-2xl font-semibold text-foreground">Outcome areas</h2>
        <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
          {outcomeFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                filter === f.id ? "text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="outcome-filter-pill"
                  className="absolute inset-0 rounded-lg bg-[hsl(var(--trust-blue))]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((k) => (
            <motion.article
              key={k.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className={`relative h-16 ${k.tone}`}>
                <div className="absolute bottom-2.5 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/25 ring-1 ring-white/40">
                  <k.icon className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" aria-hidden />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-foreground">{k.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{k.note}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

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
      {/* Image-anchored framework band */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-2xl border border-border">
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
        <FrameworkTabs />
      </section>

      <OutcomeAreas />

      {/* Annual reporting cycle */}
      <section className="mt-14" aria-labelledby="annual-reporting">
        <h2 id="annual-reporting" className="sr-only">Annual reporting cycle</h2>
        <ReportingCycle />
      </section>

      {/* Principles */}
      <section className="mt-14" aria-labelledby="how-we-report">
        <h2 id="how-we-report" className="font-heading text-2xl font-semibold text-foreground">How we report</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <article
              key={p.title}
              className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.tone}`}>
                <p.icon className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" aria-hidden />
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
