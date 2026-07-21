import {
  Globe,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Ban,
  Briefcase,
  GraduationCap,
  MapPin,
  Users,
  Sparkles,
  Leaf,
  Building2,
  Target,
  Compass,
  BarChart3,
  Handshake,
  CheckCircle2,
  XCircle,
  ArrowRight,
  CircleCheck,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Who We Are — Resourcefulness Ecosystem (navy / amber / gradient trio)      */
/* -------------------------------------------------------------------------- */

export function ResourcefulnessEcosystemSection() {
  const cards = [
    {
      icon: Globe,
      title: "Global Youth Mandate",
      body:
        "Headquartered in SeaTac, Washington with a regional office in Addis Ababa. Designed to serve youth at global scale through a borderless delivery model.",
      bg: "bg-[hsl(var(--trust-blue))]",
      fg: "text-white",
    },
    {
      icon: Layers,
      title: "Multi-Domain Ecosystem",
      body:
        "Academy, learning platforms, advisory, events, technology, and health & WASH programming, coordinated as one resourcefulness platform.",
      bg: "bg-[hsl(var(--amber))]",
      fg: "text-white",
    },
    {
      icon: ShieldCheck,
      title: "Globally Aligned by Design",
      body:
        "Built around national youth strategies, the AlikoHub delivery process, and Africa's regional workforce priorities.",
      bg: "bg-gradient-to-br from-[hsl(var(--trust-blue))] via-[hsl(var(--navy-light))] to-[hsl(var(--amber))]",
      fg: "text-white",
    },
  ];

  return (
    <section className="border-b border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Who we are
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            A Resourcefulness Ecosystem for Youth
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            AlikoHub Foundation builds the one-window workforce platform that connects
            learning, guidance, technology, partnerships, and opportunity into measurable
            outcomes for young people.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className={`${c.bg} ${c.fg} rounded-2xl p-8 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15">
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold leading-tight">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-95">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  The Data — Scale of the Gap (KPIs on soft surface)                        */
/* -------------------------------------------------------------------------- */

export function ScaleOfTheGapSection() {
  const stats = [
    { icon: Globe, value: "402M", label: "Global jobs gap", tone: "navy" },
    { icon: AlertTriangle, value: "13%", label: "Global youth unemployment", tone: "amber" },
    { icon: Ban, value: "4B+", label: "Without social protection", tone: "navy" },
    { icon: Briefcase, value: "2/3", label: "Informal workforce", tone: "amber" },
  ] as const;

  return (
    <section className="border-b border-border bg-[hsl(var(--secondary))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            The data
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Scale of the Gap
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            The challenge is both global and deeply concentrated across youth workforces.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const color =
              s.tone === "amber"
                ? "text-[hsl(var(--amber))]"
                : "text-[hsl(var(--trust-blue))]";
            return (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]"
              >
                <s.icon className={`mx-auto h-6 w-6 ${color}`} aria-hidden />
                <div className={`mt-4 font-heading text-4xl font-extrabold ${color}`}>
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  Source: World Bank, AfDB
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm font-medium text-foreground">
          The gap is not talent.{" "}
          <span className="text-[hsl(var(--amber))]">
            The gap is the system that connects talent to work.
          </span>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Structural Barriers — Six Systemic Barriers                                */
/* -------------------------------------------------------------------------- */

export function SystemicBarriersSection() {
  const barriers = [
    {
      icon: GraduationCap,
      tone: "blue",
      title: "Education–Labor Market Disconnect",
      body: "Graduates gain credentials without practical, employer-aligned experience.",
      response:
        "Market-aligned curricula, applied projects, and employer-linked pathways.",
    },
    {
      icon: MapPin,
      tone: "amber",
      title: "Unequal Access to Quality Education",
      body: "Opportunity remains concentrated in urban centers, excluding rural youth.",
      response: "Hybrid hubs, LMS access, scholarships, and community-based delivery.",
    },
    {
      icon: Users,
      tone: "blue",
      title: "Gender Inequality in STEM & Innovation",
      body:
        "Young women remain underrepresented in technology and innovation leadership.",
      response: "≥45% female participation, mentorship, and leadership pipelines.",
    },
    {
      icon: Sparkles,
      tone: "blue",
      title: "Fragmented Innovation Ecosystems",
      body:
        "Mentorship, financing, research, and scaling support operate in silos.",
      response:
        "One-window ecosystem linking training, advisory, events, and partners.",
    },
    {
      icon: Leaf,
      tone: "amber",
      title: "Limited One Health & Climate Integration",
      body:
        "Health, climate, and workforce programs are addressed separately.",
      response: "Digital health, One Health, WASH, and climate-linked workforce tracks.",
    },
    {
      icon: Building2,
      tone: "blue",
      title: "Youth Unemployment & Underemployment",
      body:
        "Effort does not translate into jobs, income, or enterprise opportunities.",
      response:
        "Placement pipelines, entrepreneurship incubation, and income tracking.",
    },
  ] as const;

  return (
    <section className="border-b border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Structural barriers
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Six Systemic Barriers Blocking Youth Employment
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Each barrier reinforces the others, requiring an integrated workforce response.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {barriers.map((b) => {
            const isAmber = b.tone === "amber";
            const badge = isAmber
              ? "bg-[hsl(var(--amber))] text-white"
              : "bg-[hsl(var(--trust-blue))] text-white";
            const heading = isAmber
              ? "text-[hsl(var(--amber))]"
              : "text-[hsl(var(--trust-blue))]";
            return (
              <article
                key={b.title}
                className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${badge}`}>
                  <b.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className={`mt-5 font-heading text-base font-bold leading-snug ${heading}`}>
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
                <div className="mt-4 border-t border-border pt-4 text-sm">
                  <span className="font-semibold text-foreground">Response: </span>
                  <span className="text-muted-foreground">{b.response}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gaps in Today's Response — Why Current Approaches Fall Short              */
/* -------------------------------------------------------------------------- */

export function CurrentApproachesGapSection() {
  const gaps = [
    {
      icon: Target,
      tone: "amber",
      title: "Training Without Placement",
      body: "Programs measure completion, not employment outcomes.",
      relates: "Relates to Priority 1: Decent Jobs",
    },
    {
      icon: Compass,
      tone: "blue",
      title: "Siloed Delivery",
      body: "Education, jobs, entrepreneurship, and finance are disconnected.",
      relates: "Relates to Priority 2: Skills & Technology",
    },
    {
      icon: Building2,
      tone: "blue",
      title: "Weak Employer Integration",
      body:
        "Skills are not consistently shaped by real labor market demand.",
      relates: "Relates to Priority 4: Sustainable Enterprises",
    },
    {
      icon: BarChart3,
      tone: "amber",
      title: "Limited Tracking",
      body: "Few programs monitor income, placement, and long-term mobility.",
      relates: "Relates to Priority 6: Social Protection",
    },
  ] as const;

  return (
    <section className="border-b border-border bg-[hsl(var(--secondary))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Gaps in today's response
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Current Approaches Fall Short
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Training alone does not create employment when systems remain disconnected.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gaps.map((g) => {
            const isAmber = g.tone === "amber";
            const wash = isAmber
              ? "bg-[hsl(var(--amber)/0.08)] border-[hsl(var(--amber)/0.35)]"
              : "bg-[hsl(var(--trust-blue)/0.08)] border-[hsl(var(--trust-blue)/0.35)]";
            const chip = isAmber
              ? "bg-[hsl(var(--amber))] text-white"
              : "bg-[hsl(var(--trust-blue))] text-white";
            const head = isAmber
              ? "text-[hsl(var(--amber))]"
              : "text-[hsl(var(--trust-blue))]";
            return (
              <article
                key={g.title}
                className={`rounded-xl border p-6 ${wash}`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${chip}`}>
                  <g.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className={`mt-5 font-heading text-base font-bold ${head}`}>
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {g.body}
                </p>
                <p className={`mt-4 text-xs italic ${head}`}>{g.relates}</p>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center font-heading text-lg font-semibold text-[hsl(var(--trust-blue))]">
          The gap is not talent. The gap is the system that connects talent to work.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Global Strategic Context — Seven Global Priority Areas                     */
/* -------------------------------------------------------------------------- */

export function SevenPrioritiesSection() {
  const priorities = [
    "Decent jobs for Africa",
    "Improved skills and technology",
    "Inclusive transformation",
    "Sustainable enterprises",
    "Tripartism and social dialogue",
    "Social and labour protection for all",
    "Labour standards and gender equality",
  ];

  return (
    <section className="border-b border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[hsl(var(--trust-blue)/0.25)] bg-[hsl(var(--trust-blue)/0.06)] p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--trust-blue))]">
            Global strategic context
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Seven Global Priority Areas for Youth{" "}
            <span className="text-[hsl(var(--trust-blue))]">(2026–2029)</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Global development actors have identified seven priority areas for youth:
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {priorities.map((p, i) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{p}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 border-t border-[hsl(var(--trust-blue)/0.2)] pt-6 text-sm font-semibold text-foreground">
            AlikoHub's model addresses all seven priorities through integrated workforce
            delivery systems.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Implementation Partner + Ecosystem at a Glance                            */
/* -------------------------------------------------------------------------- */

export function ImplementationPartnerSection() {
  const eco = [
    {
      icon: GraduationCap,
      title: "Learning",
      body:
        "Market-aligned skills training. Digital and physical delivery across priority tracks.",
      tone: "blue",
    },
    {
      icon: Compass,
      title: "Guidance",
      body:
        "Career navigation, mentorship networks, employer connections, and enterprise incubation.",
      tone: "blue",
    },
    {
      icon: Sparkles,
      title: "Opportunity",
      body:
        "Job placement pipelines, youth-led enterprises, employer partnerships, and outcomes tracking.",
      tone: "amber",
    },
  ] as const;

  return (
    <section className="border-b border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-xl border-l-4 border-[hsl(var(--trust-blue))] bg-[hsl(var(--trust-blue)/0.06)] p-6 sm:p-8">
          <h3 className="font-heading text-lg font-bold text-[hsl(var(--trust-blue))]">
            Implementation Partner, Not Program Duplication
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            AlikoHub Foundation is a delivery organization that builds the infrastructure,
            digital platforms, physical innovation hubs, employer networks, and real-time
            monitoring systems, that translate global Dignified and Fulfilling Work
            priorities into measurable youth employment outcomes at scale.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The AlikoHub Ecosystem at a Glance
          </h2>
        </div>

        <div className="relative mt-10 grid gap-6 md:grid-cols-3">
          {eco.map((e) => {
            const isAmber = e.tone === "amber";
            const chip = isAmber
              ? "bg-[hsl(var(--amber)/0.15)] text-[hsl(var(--amber))]"
              : "bg-[hsl(var(--trust-blue)/0.12)] text-[hsl(var(--trust-blue))]";
            return (
              <article
                key={e.title}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]"
              >
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-lg ${chip}`}
                >
                  <e.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {e.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why This Partnership — Global Partners × AlikoHub                          */
/* -------------------------------------------------------------------------- */

export function WhyPartnershipSection() {
  const partners = [
    "Global labor standards & Dignified and Fulfilling Work framework",
    "Country-level policy influence & government relationships",
    "Multi-stakeholder ecosystem governance expertise",
    "Technical expertise in skills development & social protection",
    "Multilateral credibility & international advocacy",
    "Strategic Plan 2026–2029 priorities",
  ];
  const aliko = [
    "Scalable delivery infrastructure (digital platform + physical hubs)",
    "Direct employer partnerships & job placement pipelines",
    "Youth-centered co-design & enterprise incubation systems",
    "Real-time monitoring systems & outcome-based accountability",
    "Local execution capacity & community-embedded delivery",
    "Operational translation into measurable workforce outcomes",
  ];

  return (
    <section className="border-b border-border bg-[hsl(var(--secondary))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Why this partnership
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why AlikoHub?
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A complementary pairing: global frameworks meet ground-level delivery
            infrastructure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[hsl(var(--trust-blue)/0.25)] bg-card p-8 shadow-[var(--shadow-card)]">
            <span className="inline-flex rounded-full bg-[hsl(var(--trust-blue)/0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--trust-blue))]">
              Global Partners
            </span>
            <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">
              What Global Partners Bring
            </h3>
            <ul className="mt-6 space-y-3">
              {partners.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[hsl(var(--trust-blue))]" />
                  {p}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-[hsl(var(--amber)/0.35)] bg-card p-8 shadow-[var(--shadow-card)]">
            <span className="inline-flex rounded-full bg-[hsl(var(--amber)/0.15)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--amber))]">
              AlikoHub
            </span>
            <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">
              What AlikoHub Will Bring
            </h3>
            <ul className="mt-6 space-y-3">
              {aliko.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[hsl(var(--amber))]" />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-semibold text-foreground">
          Together: policy frameworks meet practical implementation. Global standards meet
          local delivery. Strategic priorities meet measurable outcomes.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Systemic Challenges → Systemic Solutions (navy hero band)                  */
/* -------------------------------------------------------------------------- */

export function SystemicSolutionsBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--trust-blue))] via-[hsl(var(--navy-light))] to-[hsl(var(--navy))] py-24 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
            <Handshake className="h-3.5 w-3.5" aria-hidden />
            The AlikoHub Model
          </span>
          <h2 className="mt-6 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            Systemic Challenges Require{" "}
            <span className="block">Systemic Solutions</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            AlikoHub Foundation transforms fragmented systems into one integrated platform
            delivering skills, jobs, and enterprise pathways.
          </p>
          <a
            href="/programs"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[hsl(var(--amber))] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
          >
            Explore the AlikoHub Model →
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Solution — Not Duplication. Implementation.                                */
/* -------------------------------------------------------------------------- */

export function SolutionPositioningSection() {
  const cards = [
    {
      icon: Layers,
      title: "Integrated Platform",
      body:
        "One-window ecosystem connecting learning, guidance, employer networks, and opportunities through unified digital and physical infrastructure.",
      tone: "blue",
    },
    {
      icon: Globe,
      title: "Local + Scalable",
      body:
        "Physical innovation hubs paired with digital reach. A standardized core model with local adaptation for cost-efficient delivery.",
      tone: "amber",
    },
    {
      icon: Target,
      title: "Outcome-Driven",
      body:
        "Employment-linked targets, real-time monitoring, and third-party evaluation aligned with international standards.",
      tone: "blue",
    },
  ] as const;

  return (
    <section className="border-b border-border bg-[hsl(var(--secondary))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Solution
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AlikoHub turns fragmented access into coordinated pathways.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Skills, jobs, and enterprise, connected through one workforce platform.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[hsl(var(--trust-blue)/0.25)] bg-card p-8 shadow-[var(--shadow-card)]">
          <span className="inline-flex rounded-full bg-[hsl(var(--amber)/0.15)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--amber))]">
            Positioning
          </span>
          <h3 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Not Duplication.{" "}
            <span className="text-[hsl(var(--amber))]">Implementation.</span>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            AlikoHub is a delivery organization that translates global youth-development
            frameworks into practical, locally owned systems with direct employment
            outcomes. Our role is to build the infrastructure, digital platforms,
            innovation hubs, employer networks, and MEL systems, that operationalize
            Dignified and Fulfilling Work priorities at scale.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const isAmber = c.tone === "amber";
            const wash = isAmber
              ? "bg-[hsl(var(--amber)/0.08)] border-[hsl(var(--amber)/0.35)]"
              : "bg-[hsl(var(--trust-blue)/0.08)] border-[hsl(var(--trust-blue)/0.35)]";
            const chip = isAmber
              ? "bg-[hsl(var(--amber)/0.15)] text-[hsl(var(--amber))]"
              : "bg-[hsl(var(--trust-blue)/0.12)] text-[hsl(var(--trust-blue))]";
            const head = isAmber
              ? "text-[hsl(var(--amber))]"
              : "text-[hsl(var(--trust-blue))]";
            return (
              <article key={c.title} className={`rounded-xl border p-6 ${wash}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${chip}`}>
                  <c.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className={`mt-5 font-heading text-lg font-bold ${head}`}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  The Flow — Global Framework → Translation → Delivery → Outcomes            */
/* -------------------------------------------------------------------------- */

export function OperationalizingFlowSection() {
  const steps = [
    {
      title: "Global Framework",
      body: "Strategic priorities. Technical standards. Policy frameworks. National youth strategies alignment.",
    },
    {
      title: "AlikoHub Translation",
      body: "Program design. Curriculum development. Hub infrastructure. Partner mobilization.",
    },
    {
      title: "Local Delivery",
      body: "Market-aligned training. Job placement. Enterprise incubation. Outcome tracking.",
    },
    {
      title: "Measurable Outcomes",
      body: "Youth employed. Enterprises created. Skills certified. Data reported.",
    },
  ];

  return (
    <section className="border-b border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            The flow
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How AlikoHub Operationalizes Global Youth Priorities
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            From global frameworks to measurable outcomes, a four-step delivery flow.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <article className="h-full rounded-xl border border-[hsl(var(--trust-blue)/0.35)] bg-card p-6 shadow-[var(--shadow-card)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--trust-blue))]">
                  {s.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </article>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-[hsl(var(--amber))] md:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Comparison — The Partnership Model (Traditional vs Integrated)             */
/* -------------------------------------------------------------------------- */

export function PartnershipModelComparisonSection() {
  const traditional = [
    "Fragmented programs operating in isolation",
    "Training without guaranteed placement pathways",
    "Limited employer engagement in design",
    "Weak data systems and outcome tracking",
    "Donor dependency without sustainability plan",
    "Generic curricula not aligned with local markets",
  ];
  const integrated = [
    "Integrated ecosystem with coordinated delivery",
    "Employer-linked pipelines with employment outcomes",
    "Employers co-design curricula and commit to hiring",
    "Real-time MEL with third-party evaluation",
    "Blended finance model with local ownership",
    "Market-responsive programs with local adaptation",
  ];

  return (
    <section className="border-b border-border bg-[hsl(var(--secondary))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Comparison
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Partnership Model
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            What the integrated AlikoHub approach changes versus business as usual.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-[hsl(0_75%_55%/0.35)] bg-[hsl(0_75%_55%/0.06)] p-8">
            <h3 className="font-heading text-xl font-bold text-[hsl(0_65%_45%)]">
              Traditional Approach
            </h3>
            <ul className="mt-6 space-y-3">
              {traditional.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <XCircle className="mt-0.5 h-4 w-4 flex-none text-[hsl(0_65%_50%)]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-[hsl(var(--trust-blue)/0.35)] bg-[hsl(var(--trust-blue)/0.06)] p-8">
            <h3 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">
              AlikoHub Integrated Approach
            </h3>
            <ul className="mt-6 space-y-3">
              {integrated.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CircleCheck className="mt-0.5 h-4 w-4 flex-none text-[hsl(var(--trust-blue))]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-xl bg-[hsl(var(--trust-blue)/0.08)] p-6 text-center">
          <p className="font-heading text-base font-semibold text-[hsl(var(--trust-blue))] sm:text-lg">
            From global frameworks to local impact. From policy priorities to youth
            employment. This is how global strategies become measurable outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Structural Differentiation — Why AlikoHub Will Be Different                */
/* -------------------------------------------------------------------------- */

export function WhyDifferentSection() {
  const cards = [
    {
      icon: Layers,
      title: "One-Window Ecosystem",
      body: "Single access point to training, mentorship, jobs, and enterprise pathways.",
      tone: "blue",
    },
    {
      icon: Building2,
      title: "Physical + Digital Infrastructure",
      body: "Regional hubs and an LMS platform enabling scale and inclusion.",
      tone: "amber",
    },
    {
      icon: CheckCircle2,
      title: "Outcome-Linked Design",
      body: "Programs designed backward from employment and enterprise outcomes.",
      tone: "blue",
    },
  ] as const;

  return (
    <section className="border-b border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
            Structural differentiation
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why AlikoHub Will Be Different
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Unlike fragmented interventions, AlikoHub operates as an integrated ecosystem
            where each component reinforces the others.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const isAmber = c.tone === "amber";
            const wash = isAmber
              ? "bg-[hsl(var(--amber)/0.08)] border-[hsl(var(--amber)/0.35)]"
              : "bg-[hsl(var(--trust-blue)/0.08)] border-[hsl(var(--trust-blue)/0.35)]";
            const chip = isAmber
              ? "bg-[hsl(var(--amber)/0.15)] text-[hsl(var(--amber))]"
              : "bg-[hsl(var(--trust-blue)/0.12)] text-[hsl(var(--trust-blue))]";
            const head = isAmber
              ? "text-[hsl(var(--amber))]"
              : "text-[hsl(var(--trust-blue))]";
            return (
              <article key={c.title} className={`rounded-xl border p-6 ${wash}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${chip}`}>
                  <c.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className={`mt-5 font-heading text-lg font-bold ${head}`}>
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
