import { PageShell } from "@/components/foundation/PageShell";
import { Users, GraduationCap, Sprout, Mail } from "lucide-react";
import { foundation } from "@/config/foundation";

const themes = [
  {
    icon: Users,
    title: "Field Voices",
    body: "First-person reflections from learners, mentors, and hub leaders shaping the Foundation's work on the ground.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    accent: "hsl(var(--trust-blue))",
  },
  {
    icon: GraduationCap,
    title: "Program Notes",
    body: "Short, practitioner-focused updates on curriculum, pedagogy, and partnerships across our programs.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    accent: "hsl(var(--amber))",
  },
  {
    icon: Sprout,
    title: "Community Impact",
    body: "Case studies from WASH, health, and enterprise programs, documenting what worked, what didn't, and why it mattered.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
    accent: "hsl(160,55%,42%)",
  },
];

export default function Stories() {
  return (
    <PageShell
      eyebrow="Stories & insights"
      title="Human stories. Practical insights."
      intro="Field reports, program notes, and community narratives from across our hubs, published with consent and grounded in evidence."
    >
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-3">
        {[
          { k: "Themes", v: "3 editorial streams" },
          { k: "Publishing", v: "With consent" },
          { k: "Grounded in", v: "Field evidence" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {themes.map((t) => (
          <article
            key={t.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={t.image} alt={t.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 45%, ${t.accent} 130%)`, opacity: 0.6 }} aria-hidden />
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 backdrop-blur">
                <t.icon className="h-5 w-5" style={{ color: t.accent }} aria-hidden />
              </div>
            </div>
            <div className="p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">{t.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--warm-surface))] p-5">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--trust-blue))]" aria-hidden />
        <p className="text-sm text-foreground">
          New stories are published as they are produced with community consent. To be notified,{" "}
          <a href={`mailto:${foundation.contactEmail}?subject=Stories%20updates`} className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
            request updates by email
          </a>.
        </p>
      </div>
    </PageShell>
  );
}
