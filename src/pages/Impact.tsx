import { PageShell } from "@/components/foundation/PageShell";
import { Users, Briefcase, Building2, Target, TrendingUp, CheckCircle2, BookOpenCheck, ShieldCheck } from "lucide-react";

const outcomeKPIs = [
  { label: "Youth reached (five-year target)", endline: "50,000", icon: Users, note: "Cumulative youth served across ten hub countries." },
  { label: "Employment outcome rate", endline: "75–85%", icon: Briefcase, note: "Learners moving into jobs, apprenticeships, or enterprise." },
  { label: "Female participation rate", endline: "≥45%", icon: Target, note: "Program-wide floor for gender inclusion." },
  { label: "Youth-led enterprises", endline: "25–40", icon: TrendingUp, note: "New ventures incubated through our hubs." },
  { label: "Innovation hubs operational", endline: "10+", icon: Building2, note: "Regional hubs across Africa, Europe, and the Middle East." },
];

const outputKPIs = [
  { label: "Training programs delivered", target: "12–20 per year" },
  { label: "Mentors & experts engaged", target: "100+ annually" },
  { label: "Internships & placements", target: "1,500–8,000 per year" },
  { label: "Matchmaking events", target: "8+ per year" },
  { label: "Public-private partnerships formalized", target: "8–15 per year" },
  { label: "Programs aligned with SDGs", target: "100% annually" },
];

const principles = [
  { icon: CheckCircle2, title: "Verified before published", body: "Numbers appear here only after they are documented, checked against source records, and validated with community partners." },
  { icon: BookOpenCheck, title: "Methodology in the open", body: "Each figure links to how it was collected, what it does and does not measure, and known limitations." },
  { icon: Users, title: "Community-defined outcomes", body: "The outcomes that matter are chosen with the communities we serve, not imposed from outside." },
  { icon: ShieldCheck, title: "Privacy protected", body: "We collect the minimum data needed, obtain informed consent, and never publish information that could put participants at risk." },
];

export default function Impact() {
  return (
    <PageShell
      eyebrow="Impact"
      title="Five-year outcome targets."
      intro="A performance framework designed to measure reach, quality, equity, and long-term impact across the ten hub countries we serve."
    >
      <section aria-labelledby="outcome-kpis">
        <h2 id="outcome-kpis" className="font-heading text-2xl font-semibold text-foreground">Outcome targets</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {outcomeKPIs.map((k) => (
            <article key={k.label} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <k.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <p className="mt-4 font-heading text-3xl font-bold text-primary">{k.endline}</p>
              <h3 className="mt-1 font-heading text-sm font-semibold text-foreground">{k.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{k.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="output-kpis">
        <h2 id="output-kpis" className="font-heading text-2xl font-semibold text-foreground">Annual output targets</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outputKPIs.map((k) => (
            <article key={k.label} className="rounded-xl border border-border bg-secondary/60 p-5 text-center">
              <p className="font-heading text-xl font-bold text-primary">{k.target}</p>
              <p className="mt-1 text-sm text-muted-foreground">{k.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="how-we-report">
        <h2 id="how-we-report" className="font-heading text-2xl font-semibold text-foreground">How we report</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {principles.map((p) => (
            <article key={p.title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
