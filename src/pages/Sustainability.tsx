import { PageShell } from "@/components/foundation/PageShell";
import { Handshake, Award, Briefcase, BookOpen, Users, RefreshCw } from "lucide-react";

const models = [
  {
    icon: Handshake,
    title: "Public–Private Partnerships",
    body: "Co-financing of innovation hubs and training programs, reducing reliance on any single donor and building continuous capacity.",
  },
  {
    icon: Award,
    title: "Advanced Certifications",
    body: "Specialized, high-value professional development that generates program income while expanding access to industry-recognized credentials.",
  },
  {
    icon: Briefcase,
    title: "Mission-Aligned Consulting",
    body: "Technical expertise offered to industry, government, and development partners, with proceeds reinvested into program delivery.",
  },
  {
    icon: BookOpen,
    title: "Advisory & Placement Services",
    body: "International placement support and global exposure for learners, generating revenue through career advisory services.",
  },
  {
    icon: Users,
    title: "Alumni Network",
    body: "Graduates contribute through mentorship, peer support, and giving, strengthening community ownership and long-term continuity.",
  },
  {
    icon: RefreshCw,
    title: "Incubation Reinvestment",
    body: "Revenue from youth-founded ventures is reinvested into future cohorts, creating a self-reinforcing cycle of empowerment.",
  },
];

export default function Sustainability() {
  return (
    <PageShell
      eyebrow="Sustainability"
      title="Built to last, not just to launch."
      intro="A model designed to thrive beyond initial grant funding, ensuring long-term continuity, financial independence, and community-driven growth."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <article key={m.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <m.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
