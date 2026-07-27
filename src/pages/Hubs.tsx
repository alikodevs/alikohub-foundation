import { PageShell } from "@/components/foundation/PageShell";
import { MapPin, Building2, Users, Cpu, Leaf, GraduationCap, Sparkles } from "lucide-react";
import seattleAsset from "@/assets/seattle-skyline.jpg.asset.json";

const anchors = [
  {
    place: "Seattle, Washington",
    country: "United States",
    role: "Organizational home",
    body: "Governance, diaspora engagement, U.S.-based partnerships, and program coordination for the Foundation's global work.",
    image: seattleAsset.url,

    accent: "hsl(var(--trust-blue))",
  },
  {
    place: "Ethiopia",
    country: "East Africa",
    role: "Priority delivery region",
    body: "Community-designed programs across education, workforce development, digital health, WASH, and STEM with local partners.",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
    accent: "hsl(var(--amber))",
  },
];

const hubModel = [
  { icon: Building2, title: "Physical Delivery Space", body: "Community-anchored space equipped for training, mentorship, and collaboration." },
  { icon: Cpu, title: "Digital Infrastructure", body: "LMS access, connectivity, devices, and technical support powered by shared systems." },
  { icon: GraduationCap, title: "Local Trainers & Mentors", body: "Certified local practitioners deliver programs alongside diaspora advisors." },
  { icon: Users, title: "Employer & Partner Network", body: "Job placement, apprenticeships, and enterprise partnerships anchored to the hub." },
  { icon: Leaf, title: "Community Programs", body: "Health, WASH, and resilience initiatives integrated into hub operations." },
  { icon: MapPin, title: "Governance Alignment", body: "Local ministry, academic, and civil-society partnerships that ground each hub." },
];

export default function Hubs() {
  return (
    <PageShell
      eyebrow="Delivery footprint"
      title="Hubs where community priorities meet capacity."
      intro="The Foundation delivers its programs through community-anchored hubs. Our organizational home is Seattle, Washington and our priority delivery region is Ethiopia. Additional locations will be announced as partnerships are formalized."
    >
      {/* Ribbon */}
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Headquarters", v: "Seattle, WA" },
          { k: "Priority region", v: "Ethiopia" },
          { k: "Delivery model", v: "Community-anchored" },
          { k: "Expansion", v: "Partner-led" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Anchors */}
      <div className="grid gap-6 md:grid-cols-2">
        {anchors.map((a) => (
          <article
            key={a.place}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={a.image} alt={a.place} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, transparent 40%, ${a.accent} 130%)`, opacity: 0.55 }}
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
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--amber))" }}>{a.role}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Hub model */}
      <section className="mt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">The hub model</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">What makes a Foundation hub</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Every hub is built around six components so quality stays consistent as the network grows.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hubModel.map((h) => (
            <article key={h.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                <h.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">{h.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10 flex items-start gap-3 rounded-xl border border-[hsl(var(--amber))]/30 bg-[hsl(var(--amber))]/10 p-5">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--amber))]" aria-hidden />
        <p className="text-sm text-foreground">
          Additional hub locations will be announced as partnerships are formalized. Our expansion is deliberate,
          partner-led, and grounded in community demand.
        </p>
      </div>
    </PageShell>
  );
}
