import { PageShell } from "@/components/foundation/PageShell";
import { Crown, Settings, MapPin, GraduationCap, BarChart3, DollarSign, Users } from "lucide-react";
import { board } from "@/config/foundation";

const levels = [
  { icon: Crown, title: "Board of Directors", role: "Strategic Oversight", description: "Sets vision and strategy, approves policy, oversees the President, and safeguards mission alignment." },
  { icon: Settings, title: "Program Management Unit", role: "Central Coordination", description: "Monitoring & evaluation oversight, curriculum management, financial controls, and reporting." },
  { icon: MapPin, title: "Country Hub Leads", role: "National Implementation", description: "Local partnerships, hub operations, youth recruitment, and government alignment." },
  { icon: GraduationCap, title: "Technical Experts & Trainers", role: "Program Delivery", description: "Training, mentorship, curriculum execution, and innovation challenge facilitation." },
  { icon: BarChart3, title: "Monitoring & Learning Officers", role: "Data & Reporting", description: "Monitoring, evaluation, data quality assurance, and tracer studies." },
  { icon: DollarSign, title: "Finance & Operations", role: "Compliance & Administration", description: "Procurement, budgeting, HR, logistics, and operational support." },
  { icon: Users, title: "Advisory Council", role: "Strategic Guidance", description: "Sector expertise, industry alignment, innovation direction, and public-private partnership support." },
];

export default function Governance() {
  return (
    <PageShell
      eyebrow="Governance"
      title="Accountable by design."
      intro="AlikoHub Foundation is governed by a board of directors and a multi-layered operational structure that pairs centralized leadership with strong local ownership."
    >
      <section aria-labelledby="board">
        <h2 id="board" className="font-heading text-2xl font-semibold text-foreground">Board of Directors</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((m) => (
            <article key={m.name} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{m.role}</p>
              <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="structure">
        <h2 id="structure" className="font-heading text-2xl font-semibold text-foreground">Operational structure</h2>
        <div className="mt-6 mx-auto max-w-2xl space-y-4">
          {levels.map((level, i) => (
            <div key={level.title}>
              <article className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <level.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{level.title}</h3>
                  <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {level.role}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">{level.description}</p>
                </div>
              </article>
              {i < levels.length - 1 && <div className="ml-[1.4rem] h-4 w-px bg-primary/30" aria-hidden />}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 rounded-xl border border-border bg-secondary p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">Legal identity</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {foundation.separationStatement}
        </p>
      </div>
    </PageShell>
  );
}
