import {
  Users,
  ClipboardCheck,
  PenTool,
  Coins,
  Rocket,
  ShieldCheck,
  GraduationCap,
  LineChart,
  BookOpen,
  Globe,
  Handshake,
  Award,
  CheckCircle2,
  RefreshCw,
  Zap,
  TrendingUp,
  Heart,
  Wrench,
  Leaf,
  UsersRound,
  Cpu,
  Building2,
  Lock,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  8-Step Implementation Journey                                              */
/* -------------------------------------------------------------------------- */

export function ImplementationJourneySection() {
  const steps = [
    { n: "01", icon: Users, color: "bg-[hsl(var(--trust-blue))]", title: "Needs Identification", body: "Engage communities, employers, youth, and institutions to define skills gaps." },
    { n: "02", icon: ClipboardCheck, color: "bg-[hsl(174,60%,45%)]", title: "Assessment & Feasibility", body: "Evaluate readiness, infrastructure, resources, and regional viability." },
    { n: "03", icon: PenTool, color: "bg-[hsl(160,55%,42%)]", title: "Program Design", body: "Build employer-aligned curricula and practical learning pathways." },
    { n: "04", icon: Coins, color: "bg-[hsl(35,85%,50%)]", title: "Resource Mobilization", body: "Secure funding, partners, government alignment, and employer commitments." },
    { n: "05", icon: Rocket, color: "bg-[hsl(var(--amber))]", title: "Hub Implementation", body: "Deploy physical hubs, LMS access, equipment, and trained staff." },
    { n: "06", icon: ShieldCheck, color: "bg-[hsl(15,80%,55%)]", title: "Quality Assurance", body: "Monitor delivery, standards, certification, and learner outcomes." },
    { n: "07", icon: GraduationCap, color: "bg-[hsl(280,45%,55%)]", title: "Training Delivery", body: "Deliver applied training, mentorship, and real-world project experience." },
    { n: "08", icon: LineChart, color: "bg-[hsl(var(--trust-blue))]", title: "Impact & Placement", body: "Connect learners to jobs, internships, enterprises, and long-term tracking." },
  ];

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Implementation</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The 8-Step Implementation Journey
          </h2>
          <p className="mt-3 text-base text-muted-foreground">From local needs to measurable workforce outcomes.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <article key={s.n} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <div className={`inline-flex items-center justify-center rounded-full ${s.color} px-2.5 py-0.5 text-[10px] font-bold text-white`}>{s.n}</div>
              <div className={`mt-3 inline-flex h-11 w-11 items-center justify-center rounded-lg ${s.color} text-white`}>
                <s.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-[hsl(var(--trust-blue))]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Three Delivery Pathways                                                    */
/* -------------------------------------------------------------------------- */

export function DeliveryPathwaysSection() {
  const pathways = [
    { label: "Short-Term", duration: "3–9 Months", sub: "Immediate Workforce Entry", icon: Zap, tone: "bg-[hsl(var(--amber))] text-white" },
    { label: "Mid-Term", duration: "9–18 Months", sub: "Specialization & Career Growth", icon: TrendingUp, tone: "bg-card text-foreground border border-border" },
    { label: "Advanced Workforce", duration: "6–12 Months", sub: "In-Demand Specializations & Career Mobility", icon: Award, tone: "bg-card text-foreground border border-border" },
  ];

  const tracks = [
    { icon: Cpu, color: "bg-[hsl(var(--trust-blue))]", title: "Technology & Digital Skills", items: ["Digital Literacy & Productivity", "Web Development Fundamentals", "Data Entry & Analytics Assistant", "Cybersecurity Awareness"] },
    { icon: Heart, color: "bg-[hsl(15,75%,55%)]", title: "Health & One Health", items: ["Certified Nursing Assistant (CNA)", "Community Health Worker (CHW)", "Health Data Assistant", "Medical Billing & Coding"] },
    { icon: Wrench, color: "bg-[hsl(174,60%,45%)]", title: "Engineering & STEM", items: ["Construction Site Technician", "Solar PV Installer", "CAD Drafting Assistant", "Industrial Maintenance Basics"] },
    { icon: Building2, color: "bg-[hsl(var(--amber))]", title: "Dignified Work & Labor Systems", items: ["TVET Instructor Foundations", "Workplace Rights & OSH", "HR & Payroll Assistant", "Workforce Compliance Basics"] },
    { icon: Leaf, color: "bg-[hsl(140,45%,45%)]", title: "Green Jobs & Climate Transition", items: ["Climate-Smart Agriculture", "WASH Field Worker", "Waste Management Operator", "Renewable Energy Helper"] },
    { icon: UsersRound, color: "bg-[hsl(260,45%,55%)]", title: "Inclusive Workforce Programs", items: ["Women in Trades Bootcamp", "Refugee Livelihoods Track", "Youth Entrepreneurship 101", "Disability Inclusion at Work"] },
  ];

  return (
    <section className="border-t border-border bg-[hsl(var(--warm-surface))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Choose a Pathway</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Three Delivery Pathways</h2>
          <p className="mt-3 text-base text-muted-foreground">Top programs across six priority tracks, adaptable to local labor markets.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pathways.map((p) => (
            <article key={p.label} className={`rounded-xl p-6 ${p.tone}`}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider opacity-80">{p.duration}</p>
              <h3 className="mt-1 font-heading text-2xl font-bold">{p.label}</h3>
              <p className="mt-2 text-sm opacity-90">{p.sub}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--amber))] px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            Six Priority Tracks
          </span>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t) => (
            <article key={t.title} className="rounded-xl border border-border bg-card p-6">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${t.color} text-white`}>
                <t.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{t.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {t.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--amber))]" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Program Design Principles                                                  */
/* -------------------------------------------------------------------------- */

export function ProgramDesignPrinciplesSection() {
  const principles = [
    { title: "Employer Co-Designed", body: "Every curriculum is developed with hiring partners to ensure market relevance." },
    { title: "Outcome-Validated", body: "Programs continue only when they meet meaningful employment and livelihood outcomes." },
    { title: "Certification Recognized", body: "Credentials are validated by industry bodies and academic partners." },
    { title: "Continuously Updated", body: "Quarterly curriculum reviews keep programs aligned with evolving markets." },
  ];

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-[hsl(var(--trust-blue))]/30 bg-[hsl(var(--warm-surface))] p-10">
          <h2 className="text-center font-heading text-3xl font-bold text-[hsl(var(--trust-blue))]">Program Design Principles</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[hsl(var(--trust-blue))]" />
                <div>
                  <h3 className="font-heading text-base font-semibold text-[hsl(var(--trust-blue))]">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecosystem Architecture                                                     */
/* -------------------------------------------------------------------------- */

export function EcosystemArchitectureSection() {
  const inner = [
    { label: "Aliko Academy", role: "Train" },
    { label: "Aliko LMS", role: "Deliver at Scale" },
    { label: "Aliko Consultancy", role: "Guide" },
    { label: "Aliko Events", role: "Connect" },
    { label: "Career Portal", role: "Match to Jobs" },
    { label: "AlikoTech", role: "Digital Infrastructure" },
    { label: "AlikoWash", role: "Social Impact" },
  ];
  const outer = [
    { label: "Ecosystem Partners", role: "Proposed Strategy Alignment" },
    { label: "Technology & AI Capacity", role: "Applied research and tooling" },
    { label: "Government Agencies", role: "Policy Alignment" },
    { label: "Academic Institutions", role: "Curriculum & Research" },
    { label: "Employers / Private Sector", role: "Job Placement & Demand" },
    { label: "Development Partners", role: "Funding & Scale" },
    { label: "Worker / Employer Organizations", role: "Multi-stakeholder Governance" },
  ];

  return (
    <section className="border-t border-border bg-[hsl(var(--warm-surface))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Ecosystem Architecture</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The AlikoHub Ecosystem Architecture
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A central resourcefulness ecosystem surrounded by delivery brands and partner institutions that enable scale.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))] text-white">
                <Globe className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">Inner Ring</p>
                <h3 className="font-heading text-lg font-semibold text-foreground">Delivery Brands</h3>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {inner.map((i) => (
                <li key={i.label} className="rounded-lg border border-border bg-[hsl(var(--warm-surface))] p-3">
                  <p className="font-heading text-sm font-semibold text-[hsl(var(--trust-blue))]">{i.label}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-[hsl(var(--amber))]">{i.role}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--amber))] text-white">
                <Handshake className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">Outer Ring</p>
                <h3 className="font-heading text-lg font-semibold text-foreground">Partner Institutions</h3>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {outer.map((i) => (
                <li key={i.label} className="rounded-lg border border-border bg-[hsl(var(--warm-surface))] p-3">
                  <p className="font-heading text-sm font-semibold text-foreground">{i.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Five Principles That Enable Scale                                          */
/* -------------------------------------------------------------------------- */

export function ScalePrinciplesSection() {
  const principles = [
    { icon: BookOpen, title: "Standardized Curriculum with Local Adaptation", body: "Core competency frameworks ensure quality consistency across the network. Local teams adapt content to regional labor markets, languages, and cultural contexts." },
    { icon: Globe, title: "Shared Digital Platform Lowers Cost per Hub", body: "Aliko LMS and AlikoTech power every program site through one core system, reducing per-hub technology costs and enabling real-time data aggregation." },
    { icon: RefreshCw, title: "Cross-Site Learning Loops", body: "Monthly virtual exchanges connect hub managers. Quarterly regional convenings share innovations. Annual documentation captures what works." },
    { icon: Handshake, title: "Embedded Partner Ecosystem", body: "Employers and institutions don't just support, they co-govern and co-deliver. Government, private sector, academia, and development partners are integrated into delivery." },
    { icon: Award, title: "Pathway to Centers of Excellence", body: "AlikoHub is designed to earn Centers of Excellence recognition for flagship hubs, anchoring the network as durable workforce infrastructure." },
  ];

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Scale Architecture</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Five Principles That Enable Scale
          </h2>
          <p className="mt-3 text-base text-muted-foreground">How the Foundation holds quality constant while expanding delivery capacity.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <article key={p.title} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--amber))]/15 text-[hsl(var(--amber))]">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-[hsl(var(--trust-blue))]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cost Efficiency Strategy                                                   */
/* -------------------------------------------------------------------------- */

export function CostEfficiencySection() {
  const levers = [
    { icon: GraduationCap, title: "Local Trainer Development", body: "Reduce expat trainer costs through local recruitment and certification. Year 1 relies more on external experts; by Year 3+ delivery is fully local." },
    { icon: Cpu, title: "Shared Digital Infrastructure", body: "Economies of scale across the network. Per-hub technology costs decrease as the network grows from one to many hubs." },
    { icon: Building2, title: "Government Facility Partnerships", body: "Reduce real-estate costs through partnerships with existing government training centers, universities, and community spaces." },
    { icon: Lock, title: "Open-Source Platform Tools", body: "Aliko LMS and MEL systems built on open-source frameworks, reducing licensing fees and enabling local customization." },
  ];

  return (
    <section className="border-t border-border bg-[hsl(var(--warm-surface))] py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Operating Efficiency</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Cost Efficiency Strategy</h2>
          <p className="mt-3 text-base text-muted-foreground">Four levers that reduce per-youth operating costs as hubs mature and the network scales.</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border-2 border-[hsl(var(--trust-blue))]/25 bg-card p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {levers.map((l) => (
              <div key={l.title} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                  <l.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-[hsl(var(--trust-blue))]">{l.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-[hsl(140,45%,45%)]/30 bg-[hsl(140,45%,45%)]/10 px-5 py-3 text-center">
            <p className="text-sm font-semibold text-[hsl(140,55%,30%)]">
              Combined effect: a meaningful decrease in per-youth operating costs as hubs mature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
