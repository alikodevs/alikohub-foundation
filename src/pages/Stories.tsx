import { PageShell } from "@/components/foundation/PageShell";
import { Users, GraduationCap, Sprout } from "lucide-react";

const themes = [
  {
    icon: Users,
    title: "Field Voices",
    body: "First-person reflections from learners, mentors, and hub leaders shaping the Foundation's work on the ground.",
  },
  {
    icon: GraduationCap,
    title: "Program Notes",
    body: "Short, practitioner-focused updates on curriculum, pedagogy, and partnerships across Aliko Academy and our hubs.",
  },
  {
    icon: Sprout,
    title: "Community Impact",
    body: "Case studies from WASH, health, and enterprise programs, documenting what worked, what didn't, and why it mattered.",
  },
];

export default function Stories() {
  return (
    <PageShell
      eyebrow="Stories & insights"
      title="Human stories. Practical insights."
      intro="Field reports, program notes, and community narratives from across our hubs, published with consent and grounded in evidence."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {themes.map((t) => (
          <article key={t.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <t.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        New stories are published as they are produced with community consent. Sign up for updates on the Get Involved page.
      </p>
    </PageShell>
  );
}
