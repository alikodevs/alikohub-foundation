import { PageShell } from "@/components/foundation/PageShell";
import { Users, Briefcase, Target, TrendingUp, CheckCircle2, BookOpenCheck, ShieldCheck, HeartHandshake } from "lucide-react";
import { ScalePrinciplesSection, CostEfficiencySection } from "@/components/foundation/ProgramSections";

const outcomeAreas = [
  { icon: Users, title: "Youth reached", note: "Learners engaged through Foundation-supported programs based in Seattle, Washington and Ethiopia." },
  { icon: Briefcase, title: "Employment & income pathways", note: "Participants moving into jobs, apprenticeships, or youth-led enterprise after completing a program." },
  { icon: Target, title: "Gender inclusion", note: "A program-wide floor for young women's participation, with equal access to mentorship and opportunity." },
  { icon: TrendingUp, title: "Youth-led ventures", note: "New enterprises incubated with mentorship, seed support, and market access." },
  { icon: HeartHandshake, title: "Community partnerships", note: "Formal partnerships with local institutions, employers, and community leaders." },
];

const reportingCommitments = [
  { label: "Learning-aligned curricula co-designed with local partners" },
  { label: "Mentors and technical experts engaged each year" },
  { label: "Internships and placements coordinated with employers" },
  { label: "Matchmaking and community events hosted" },
  { label: "Public-private partnerships formalized annually" },
  { label: "Programs mapped to the UN Sustainable Development Goals" },
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
      title="What we measure, and how."
      intro="A performance framework designed to measure reach, quality, equity, and long-term impact across the communities we serve. Baseline numbers will be published once independently verified."
      afterContent={
        <>
          <ScalePrinciplesSection />
          <CostEfficiencySection />
        </>
      }
    >

      <section aria-labelledby="outcome-areas">
        <h2 id="outcome-areas" className="font-heading text-2xl font-semibold text-foreground">Outcome areas</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {outcomeAreas.map((k) => (
            <article key={k.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <k.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{k.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{k.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="commitments">
        <h2 id="commitments" className="font-heading text-2xl font-semibold text-foreground">Annual reporting commitments</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportingCommitments.map((k) => (
            <article key={k.label} className="rounded-xl border border-border bg-secondary/60 p-5">
              <p className="text-sm text-foreground">{k.label}</p>
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
    <ScalePrinciplesSection />
    <CostEfficiencySection />
    </>
  );
}
