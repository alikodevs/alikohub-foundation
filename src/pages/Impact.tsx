import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { CheckCircle2, Users, BookOpenCheck, ShieldCheck } from "lucide-react";

const principles = [
  {
    icon: CheckCircle2,
    title: "Verified before published",
    body: "Numbers appear here only after they are documented, checked against source records, and validated with community partners.",
  },
  {
    icon: BookOpenCheck,
    title: "Methodology in the open",
    body: "Each figure will link to how it was collected, what it does and does not measure, and known limitations.",
  },
  {
    icon: Users,
    title: "Community-defined outcomes",
    body: "The outcomes that matter are chosen with the communities we serve, not imposed from outside.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy protected",
    body: "We collect the minimum data needed, obtain consent, and never publish information that could put participants at risk.",
  },
];

export default function Impact() {
  return (
    <PageShell
      eyebrow="Impact"
      title="We report what we can verify."
      intro="No invented counters. No unverified claims. Impact figures publish here only when they are grounded in documented, community-validated results."
    >
      <div className="grid gap-6 md:grid-cols-2">
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

      <div className="mt-12">
        <InDevelopmentNote note="Once pilot programs are underway, this page will publish outcomes, methodology, learning notes, and honest limitations." />
      </div>
    </PageShell>
  );
}
