import { PageShell } from "@/components/foundation/PageShell";
import {
  Crown,
  Settings,
  MapPin,
  GraduationCap,
  BarChart3,
  DollarSign,
  Users,
  Shield,
  FileCheck,
  Scale,
} from "lucide-react";
import { board } from "@/config/foundation";
import { LeadershipCarousel } from "@/components/foundation/LeadershipCarousel";


const levels = [
  { icon: Crown, title: "Board of Directors", role: "Strategic Oversight", description: "Sets vision and strategy, approves policy, oversees the President, and safeguards mission alignment." },
  { icon: Settings, title: "Program Management Unit", role: "Central Coordination", description: "Monitoring & evaluation oversight, curriculum management, financial controls, and reporting." },
  { icon: MapPin, title: "Country Hub Leads", role: "National Implementation", description: "Local partnerships, hub operations, youth recruitment, and government alignment." },
  { icon: GraduationCap, title: "Technical Experts & Trainers", role: "Program Delivery", description: "Training, mentorship, curriculum execution, and innovation challenge facilitation." },
  { icon: BarChart3, title: "Monitoring & Learning Officers", role: "Data & Reporting", description: "Monitoring, evaluation, data quality assurance, and tracer studies." },
  { icon: DollarSign, title: "Finance & Operations", role: "Compliance & Administration", description: "Procurement, budgeting, HR, logistics, and operational support." },
  { icon: Users, title: "Advisory Council", role: "Strategic Guidance", description: "Sector expertise, industry alignment, innovation direction, and public-private partnership support." },
];

const safeguards = [
  { icon: Shield, title: "Safeguarding", body: "Board-approved safeguarding policy across every program and partner engagement." },
  { icon: Scale, title: "Conflict of Interest", body: "Annual disclosures and recusal protocols for directors, officers, and staff." },
  { icon: FileCheck, title: "Financial Controls", body: "Segregation of duties, dual approvals, and independent oversight of expenditures." },
];

export default function Governance() {
  return (
    <PageShell
      eyebrow="Governance"
      title="Accountable by design."
      intro="AlikoHub Foundation is governed by a board of directors and a multi-layered operational structure that pairs centralized leadership with strong local ownership."
    >
      {/* Compact governance ribbon */}
      <div className="mb-10 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4">
        {[
          { k: "Directors", v: `${board.length} on Board` },
          { k: "Structure", v: `${levels.length} Layers` },
          { k: "Safeguards", v: "Board-approved" },
          { k: "Reporting", v: "Annual disclosure" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Board */}
      <LeadershipCarousel eyebrow="Leadership" title="Chair and Governing Board" people={board} />


      {/* Operational structure */}
      <section className="mt-16" aria-labelledby="structure">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Operating model</p>
          <h2 id="structure" className="mt-2 font-heading text-2xl font-semibold text-foreground">Operational structure</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            A seven-layer structure that pairs board oversight with local delivery accountability.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level, i) => (
            <article
              key={level.title}
              className="relative rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="absolute right-4 top-4 text-[10px] font-bold text-muted-foreground/60">
                0{i + 1}
              </div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                <level.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">{level.title}</h3>
              <span className="mt-1 inline-block rounded-full bg-[hsl(var(--amber))]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--amber))]">
                {level.role}
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{level.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Safeguards */}
      <section className="mt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Integrity</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Safeguards & controls</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {safeguards.map((s) => (
            <article key={s.title} className="rounded-xl border border-border bg-card p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--amber))]/15 text-[hsl(var(--amber))]">
                <s.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-[hsl(var(--trust-blue))]">{s.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
