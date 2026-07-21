import { BookOpen, Compass, Briefcase } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    label: "Learning",
    body: "Market-aligned skills training delivered in-hub and online, spanning education, digital health, STEM, WASH, and workforce tracks co-designed with local partners.",
  },
  {
    icon: Compass,
    label: "Guidance",
    body: "Career navigation, mentorship networks, and enterprise incubation that walk with young people from first skill to first opportunity.",
  },
  {
    icon: Briefcase,
    label: "Opportunity",
    body: "Job placement pipelines, youth-led ventures, employer partnerships, and real-time outcome tracking that turn programs into livelihoods.",
  },
];

export function DeliveryModelSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">How we deliver</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Learning. Guidance. Opportunity.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            One connected pathway from skill to livelihood, delivered through locally led hubs and aligned with the African Union&rsquo;s Agenda 2063 and the UN Sustainable Development Goals.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.label}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{p.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
