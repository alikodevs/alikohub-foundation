import { BookOpen, Compass, Briefcase } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    label: "Learning",
    body: "Market-aligned skills training delivered in-hub and online, spanning education, digital health, STEM, WASH, and workforce tracks co-designed with local partners.",
    bg: "bg-[hsl(var(--trust-blue))]",
    fg: "text-white",
    chip: "bg-white/15 text-white",
  },
  {
    icon: Compass,
    label: "Guidance",
    body: "Career navigation, mentorship networks, and enterprise incubation that walk with young people from first skill to first opportunity.",
    bg: "bg-[hsl(var(--amber))]",
    fg: "text-white",
    chip: "bg-white/20 text-white",
  },
  {
    icon: Briefcase,
    label: "Opportunity",
    body: "Job placement pipelines, youth-led ventures, employer partnerships, and real-time outcome tracking that turn programs into livelihoods.",
    bg: "bg-gradient-to-br from-[hsl(var(--trust-blue))] via-[hsl(var(--navy-light))] to-[hsl(var(--amber))]",
    fg: "text-white",
    chip: "bg-white/20 text-white",
  },
];

export function DeliveryModelSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">How we deliver</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Learning. Guidance. Opportunity.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            One connected pathway from skill to livelihood, delivered through locally led hubs and aligned with the African Union&rsquo;s Agenda 2063 and the UN Sustainable Development Goals.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.label}
              className={`${p.bg} ${p.fg} rounded-2xl p-8 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${p.chip}`}>
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold leading-tight">{p.label}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-95">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
