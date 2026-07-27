import { PageShell } from "@/components/foundation/PageShell";
import { MapPin, Building2, Users, Compass, Globe2, Sparkles } from "lucide-react";

const anchors = [
  {
    place: "Seattle, Washington",
    country: "United States",
    role: "Organizational home",
    body: "Governance, diaspora engagement, U.S.-based partnerships, and program coordination for the Foundation's global work.",
    image:
      "https://images.unsplash.com/photo-1502175353174-a7a1a9308ff2?auto=format&fit=crop&w=1600&q=80",
    accent: "hsl(var(--trust-blue))",
    facts: [
      { k: "Headquarters", v: "Seattle, WA" },
      { k: "Focus", v: "Governance & Partnerships" },
    ],
  },
  {
    place: "Ethiopia",
    country: "East Africa",
    role: "Priority delivery region",
    body: "Community-designed programs across education, workforce development, digital health, WASH, and STEM, delivered with local partners.",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
    accent: "hsl(var(--amber))",
    facts: [
      { k: "Delivery focus", v: "Youth & workforce" },
      { k: "Model", v: "Locally led" },
    ],
  },
];

const principles = [
  { icon: Users, title: "Locally led", body: "Community priorities set the agenda. Programs are designed with, not for, the people they serve." },
  { icon: Compass, title: "Rooted in place", body: "Each initiative respects local culture, language, and existing institutions." },
  { icon: Building2, title: "Partnership-first", body: "We work through accountable public, private, and community partners in every region." },
  { icon: Globe2, title: "Built to travel", body: "A common delivery model that scales responsibly as new partnerships take shape." },
];

export default function WhereWeWork() {
  return (
    <PageShell
      eyebrow="Where we work"
      title="Rooted in place. Connected globally."
      intro="The Foundation is based in Seattle, Washington and delivers priority programs in Ethiopia. Every initiative is locally led and community-designed, with a delivery model built to travel as partnerships grow."
    >
      {/* Compact footprint ribbon */}
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Headquarters", v: "Seattle, WA" },
          { k: "Priority region", v: "Ethiopia" },
          { k: "Delivery model", v: "Locally led" },
          { k: "Alignment", v: "AU 2063 · UN SDGs" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Image-anchored anchors */}
      <div className="grid gap-6 md:grid-cols-2">
        {anchors.map((a) => (
          <article
            key={a.place}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={a.image}
                alt={a.place}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 40%, ${a.accent} 130%)`,
                  opacity: 0.55,
                }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-90">{a.country}</p>
                </div>
                <h2 className="mt-2 font-heading text-2xl font-bold">{a.place}</h2>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--amber))" }}>
                  {a.role}
                </p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {a.facts.map((f) => (
                  <div key={f.k} className="rounded-lg border border-border bg-[hsl(var(--warm-surface))] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{f.k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{f.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* How we choose where we work */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Our approach</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">How we choose where we work</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <article key={p.title} className="rounded-xl border border-border bg-card p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-[hsl(var(--trust-blue))]">{p.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Expansion note */}
      <div className="mt-10 flex items-start gap-3 rounded-xl border border-[hsl(var(--amber))]/30 bg-[hsl(var(--amber))]/10 p-5">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--amber))]" aria-hidden />
        <p className="text-sm text-foreground">
          Additional regions will be announced as partnerships are formalized. Our work is aligned with national youth
          strategies, the African Union&rsquo;s Agenda 2063, and the UN Sustainable Development Goals.
        </p>
      </div>
    </PageShell>
  );
}
