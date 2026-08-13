import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Globe,
  GraduationCap,
  Handshake,
  Layers,
  Leaf,
  MapPin,
  Sparkles,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { getFullMediaUrl } from "@/lib/utils";


/**
 * HomeStorySection
 * ----------------
 * Space-saving, tabbed narrative that consolidates seven homepage sections
 * (Scale of the Gap, Systemic Barriers, Current Approaches, Seven Priorities,
 * Solution Positioning, Operationalizing Flow, Partnership Comparison) into
 * one high-density, image-anchored, interactive module.
 *
 * Every tab keeps the same visual chrome (image column + content column)
 * so scanning between "Challenge → Response → Partnership" feels like turning
 * pages in a briefing deck.
 */

type Tone = "blue" | "amber";

const toneClasses: Record<Tone, { chip: string; head: string; dot: string; wash: string; border: string }> = {
  blue: {
    chip: "bg-[hsl(var(--trust-blue)/0.12)] text-[hsl(var(--trust-blue))]",
    head: "text-[hsl(var(--trust-blue))]",
    dot: "bg-[hsl(var(--trust-blue))]",
    wash: "bg-[hsl(var(--trust-blue)/0.06)]",
    border: "border-[hsl(var(--trust-blue)/0.25)]",
  },
  amber: {
    chip: "bg-[hsl(var(--amber)/0.15)] text-[hsl(var(--amber))]",
    head: "text-[hsl(var(--amber))]",
    dot: "bg-[hsl(var(--amber))]",
    wash: "bg-[hsl(var(--amber)/0.08)]",
    border: "border-[hsl(var(--amber)/0.35)]",
  },
};

const STATS = [
  { icon: Globe, value: "402M", label: "Global jobs gap" },
  { icon: AlertTriangle, value: "13%", label: "Youth unemployment" },
  { icon: Users, value: "4B+", label: "Without social protection" },
  { icon: Building2, value: "2/3", label: "In informal workforce" },
] as const;

const BARRIERS = [
  { icon: GraduationCap, tone: "blue" as Tone, title: "Education–Labor Disconnect", body: "Credentials without employer-aligned experience." },
  { icon: MapPin, tone: "amber" as Tone, title: "Unequal Access", body: "Opportunity concentrated in urban centers." },
  { icon: Users, tone: "blue" as Tone, title: "Gender Gap in STEM", body: "Women underrepresented in innovation leadership." },
  { icon: Sparkles, tone: "amber" as Tone, title: "Fragmented Ecosystems", body: "Mentorship, finance, and scale operate in silos." },
  { icon: Leaf, tone: "blue" as Tone, title: "Missing Climate + Health Link", body: "Health, climate, workforce addressed separately." },
  { icon: Target, tone: "amber" as Tone, title: "Training Without Placement", body: "Programs measure completion, not employment." },
];

const PRIORITIES = [
  "Decent jobs",
  "Skills & technology",
  "Inclusive transformation",
  "Sustainable enterprises",
  "Tripartism & social dialogue",
  "Social & labour protection",
  "Standards & gender equality",
];

const FLOW = [
  { title: "Global Framework", body: "Strategic priorities. Technical standards. National youth strategies." },
  { title: "AlikoHub Translation", body: "Program design. Curriculum. Hub infrastructure. Partner mobilization." },
  { title: "Local Delivery", body: "Market-aligned training. Placement. Enterprise incubation." },
  { title: "Measurable Outcomes", body: "Youth employed. Enterprises created. Skills certified." },
];

const RESPONSE_CARDS = [
  { icon: Layers, tone: "blue" as Tone, title: "Integrated Platform", body: "One window across learning, guidance, employers, and opportunity." },
  { icon: Globe, tone: "amber" as Tone, title: "Local + Scalable", body: "Physical hubs paired with digital reach and standardized delivery." },
  { icon: Target, tone: "blue" as Tone, title: "Outcome-Driven", body: "Employment-linked targets, live monitoring, third-party evaluation." },
];

const TRADITIONAL = [
  "Fragmented programs in isolation",
  "Training without placement pathways",
  "Limited employer engagement in design",
  "Weak data and outcome tracking",
  "Donor dependency without sustainability",
];

const INTEGRATED = [
  "Coordinated ecosystem delivery",
  "Employer-linked employment pipelines",
  "Employers co-design and commit to hire",
  "Real-time MEL with third-party evaluation",
  "Blended finance with local ownership",
];

const DIFFERENTIATORS = [
  { icon: Layers, title: "One-Window Ecosystem", body: "Single access point to training, mentorship, jobs, and enterprise." },
  { icon: Building2, title: "Physical + Digital", body: "Regional hubs plus an LMS platform enabling scale and inclusion." },
  { icon: CheckCircle2, title: "Outcome-Linked", body: "Programs designed backward from employment and enterprise outcomes." },
];

const TABS = [
  {
    id: "challenge",
    label: "The Challenge",
    eyebrow: "The scale of the gap",
    heading: "The gap isn't talent. It's the system.",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80",
    alt: "Young students in a classroom raising their hands",
    caption: "402M jobs short — a systemic, not individual, failure.",
  },
  {
    id: "response",
    label: "Our Response",
    eyebrow: "The AlikoHub model",
    heading: "One coordinated pathway. Seven global priorities.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    alt: "Young professionals collaborating around a laptop",
    caption: "Global frameworks translated into local, measurable delivery.",
  },
  {
    id: "partnership",
    label: "The Partnership",
    eyebrow: "Why AlikoHub is different",
    heading: "Traditional programs stop at training. We finish at outcomes.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80",
    alt: "Two young African women working together on a project",
    caption: "Integrated ecosystem: policy meets delivery, standards meet outcomes.",
  },
] as const;

export function HomeStorySection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("challenge");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section
      className="relative overflow-hidden border-b border-border bg-background py-20"
      aria-labelledby="story-heading"
    >
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 10% 0%, hsl(var(--trust-blue) / 0.06), transparent 45%), radial-gradient(circle at 90% 100%, hsl(var(--amber) / 0.06), transparent 45%)",
        }}
      />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            The briefing
          </p>
          <h2
            id="story-heading"
            className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Challenge. Response. Partnership.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A three-minute read of the systemic gap, the AlikoHub model, and how partners plug in.
          </p>
        </div>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as typeof tab)}
          className="mt-10"
        >
          <TabsList className="mx-auto grid h-auto w-full max-w-2xl grid-cols-3 gap-1 rounded-full border border-border bg-card p-1 shadow-[var(--shadow-card)]">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="rounded-full py-2.5 text-sm font-semibold data-[state=active]:bg-[hsl(var(--trust-blue))] data-[state=active]:text-white data-[state=active]:shadow"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
            {/* Image column — sticky on desktop */}
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card-hover)]"
                >
                  <img
                    src={getFullMediaUrl(active.image)}
                    alt={active.alt}

                    className="aspect-[4/5] h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy))]/85 via-[hsl(var(--navy))]/25 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
                      {active.eyebrow}
                    </p>
                    <p className="mt-2 font-heading text-xl font-bold leading-tight text-white">
                      {active.heading}
                    </p>
                    <p className="mt-2 text-sm text-white/85">{active.caption}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Content column */}
            <div>
              <TabsContent value="challenge" className="mt-0 space-y-6 focus-visible:outline-none">
                <StatRow />
                <BarrierGrid />
                <Callout tone="amber">
                  Each barrier reinforces the others. Fixing one at a time never closes the gap.
                </Callout>
              </TabsContent>

              <TabsContent value="response" className="mt-0 space-y-6 focus-visible:outline-none">
                <PriorityStack />
                <FlowStrip />
                <ResponseCards />
              </TabsContent>

              <TabsContent value="partnership" className="mt-0 space-y-6 focus-visible:outline-none">
                <ComparisonBlock />
                <DifferentiatorGrid />
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/partnership"
                    className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--amber))] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
                  >
                    <Handshake className="h-4 w-4" aria-hidden />
                    Partner with us
                  </Link>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
                  >
                    Explore the model
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

/* -------------------------- Sub-blocks ---------------------------------- */

function StatRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-xl border border-border bg-card p-4 text-center"
        >
          <s.icon
            className={`mx-auto h-5 w-5 ${
              i % 2 === 0 ? "text-[hsl(var(--trust-blue))]" : "text-[hsl(var(--amber))]"
            }`}
            aria-hidden
          />
          <div
            className={`mt-2 font-heading text-2xl font-extrabold ${
              i % 2 === 0 ? "text-[hsl(var(--trust-blue))]" : "text-[hsl(var(--amber))]"
            }`}
          >
            {s.value}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function BarrierGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {BARRIERS.map((b) => {
        const t = toneClasses[b.tone];
        return (
          <article
            key={b.title}
            className="group flex gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.chip}`}>
              <b.icon className="h-4 w-4" aria-hidden />
            </div>
            <div>
              <h4 className={`font-heading text-sm font-bold ${t.head}`}>{b.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PriorityStack() {
  return (
    <div className="rounded-2xl border border-[hsl(var(--trust-blue)/0.25)] bg-[hsl(var(--trust-blue)/0.06)] p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--trust-blue))]">
        Seven global priorities · 2026–2029
      </p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">
        {PRIORITIES.map((p, i) => (
          <li key={p} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] text-[10px] font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm text-foreground">{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FlowStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {FLOW.map((s, i) => (
        <div
          key={s.title}
          className="relative rounded-xl border border-[hsl(var(--trust-blue)/0.25)] bg-card p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--trust-blue))]">
            0{i + 1} · {s.title}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
          {i < FLOW.length - 1 && (
            <ArrowRight
              className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[hsl(var(--amber))] lg:block"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ResponseCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {RESPONSE_CARDS.map((c) => {
        const t = toneClasses[c.tone];
        return (
          <article
            key={c.title}
            className={`rounded-xl border ${t.border} ${t.wash} p-5`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.chip}`}>
              <c.icon className="h-4 w-4" aria-hidden />
            </div>
            <h4 className={`mt-4 font-heading text-sm font-bold ${t.head}`}>{c.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.body}</p>
          </article>
        );
      })}
    </div>
  );
}

function ComparisonBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-xl border border-[hsl(0_65%_55%/0.3)] bg-[hsl(0_65%_55%/0.05)] p-5">
        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[hsl(0_60%_45%)]">
          Traditional
        </h4>
        <ul className="mt-4 space-y-2.5">
          {TRADITIONAL.map((t) => (
            <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
              <XCircle className="mt-0.5 h-3.5 w-3.5 flex-none text-[hsl(0_60%_50%)]" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-xl border border-[hsl(var(--trust-blue)/0.35)] bg-[hsl(var(--trust-blue)/0.06)] p-5">
        <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[hsl(var(--trust-blue))]">
          AlikoHub Integrated
        </h4>
        <ul className="mt-4 space-y-2.5">
          {INTEGRATED.map((t) => (
            <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-[hsl(var(--trust-blue))]" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function DifferentiatorGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {DIFFERENTIATORS.map((d) => (
        <article
          key={d.title}
          className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--amber)/0.15)] text-[hsl(var(--amber))]">
            <d.icon className="h-4 w-4" aria-hidden />
          </div>
          <h4 className="mt-4 font-heading text-sm font-bold text-foreground">{d.title}</h4>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d.body}</p>
        </article>
      ))}
    </div>
  );
}

function Callout({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  const t = toneClasses[tone];
  return (
    <div className={`rounded-xl border ${t.border} ${t.wash} p-4 text-center`}>
      <p className={`font-heading text-sm font-semibold ${t.head}`}>{children}</p>
    </div>
  );
}
