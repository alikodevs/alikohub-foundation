import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { Leaf, Users, Recycle, Scale, Sprout, Compass } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    title: "Locally Led Design",
    body: "Programs are shaped by the communities they serve, so continuity does not depend on our permanent presence.",
  },
  {
    icon: Users,
    title: "Diversified Support",
    body: "We plan to combine grants, partnerships, and in-kind support so no single funder or channel is a single point of failure.",
  },
  {
    icon: Sprout,
    title: "Capacity Transfer",
    body: "Skills, systems, and knowledge are intentionally transferred to local staff and partners as programs mature.",
  },
  {
    icon: Recycle,
    title: "Reinvestment Discipline",
    body: "Any surplus is directed back into mission-aligned programs, safeguards, and community priorities.",
  },
  {
    icon: Scale,
    title: "Right-Sized Growth",
    body: "We scale only what has been shown to work, and only at a pace we can safeguard, staff, and evaluate.",
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    body: "Program design considers climate, natural resources, and community environmental priorities.",
  },
];

export default function Sustainability() {
  return (
    <PageShell
      eyebrow="Sustainability"
      title="Built to last, not just to launch."
      intro="A nonprofit is only useful if it can keep serving its community over time. Our sustainability approach protects the mission from over-dependence on any single funder, partner, or moment."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <p.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <InDevelopmentNote note="Financial policies, reserves policy, and long-term funding strategy will publish here once approved by the board." />
      </div>
    </PageShell>
  );
}
