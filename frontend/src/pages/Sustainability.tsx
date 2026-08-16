import { PageShell } from "@/components/foundation/PageShell";
import { Handshake, Award, Briefcase, BookOpen, Users, RefreshCw } from "lucide-react";

const models = [
  { icon: Handshake, title: "Public–Private Partnerships", body: "Co-financing of programs to reduce reliance on any single donor and build continuous capacity.", accent: "hsl(var(--trust-blue))" },
  { icon: Award, title: "Advanced Certifications", body: "Specialized professional development that generates program income while expanding access to industry-recognized credentials.", accent: "hsl(var(--amber))" },
  { icon: Briefcase, title: "Mission-Aligned Consulting", body: "Technical expertise offered to industry, government, and development partners, with proceeds reinvested into program delivery.", accent: "hsl(160,55%,42%)" },
  { icon: BookOpen, title: "Advisory & Placement Services", body: "International placement support and global exposure for learners, generating revenue through career advisory services.", accent: "hsl(280,45%,55%)" },
  { icon: Users, title: "Alumni Network", body: "Graduates contribute through mentorship, peer support, and giving, strengthening community ownership and long-term continuity.", accent: "hsl(15,80%,55%)" },
  { icon: RefreshCw, title: "Incubation Reinvestment", body: "Revenue from youth-founded ventures is reinvested into future cohorts, creating a self-reinforcing cycle of empowerment.", accent: "hsl(174,60%,45%)" },
];

export default function Sustainability() {
  return (
    <PageShell
      eyebrow="Sustainability"
      title="Built to last, not just to launch."
      intro="A model designed to thrive beyond initial grant funding, ensuring long-term continuity, financial independence, and community-driven growth."
    >

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <article
            key={m.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="h-1.5 w-full" style={{ background: m.accent }} aria-hidden />
            <div className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: m.accent }}>
                <m.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
