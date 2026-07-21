import { PageShell } from "@/components/foundation/PageShell";
import { GraduationCap, Heart, Cpu, Briefcase, Droplets, CalendarDays, Leaf, ArrowRight } from "lucide-react";
import {
  ImplementationJourneySection,
  DeliveryPathwaysSection,
  ProgramDesignPrinciplesSection,
} from "@/components/foundation/ProgramSections";

const pillars = [
  {
    icon: GraduationCap,
    title: "Aliko Academy",
    description: "Career-driven learning powered by a purpose-built LMS, delivering market-aligned training across technology, business, and STEM.",
    bullets: [
      "AI, Machine Learning, Data Analytics, Cloud Computing",
      "Software Development, Databases, Testing",
      "Finance, Accounting, Design, Marketing",
      "Academic preparation and language learning",
    ],
  },
  {
    icon: Heart,
    title: "Digital Health & One Health",
    description: "Strengthening public health systems and climate resilience by preparing youth for emerging roles in health technology and surveillance.",
    bullets: [
      "Public health workforce pipelines",
      "Mobile health for prevention and behavior change",
      "Health data analytics and population health",
      "Climate-linked and zoonotic disease monitoring",
    ],
  },
  {
    icon: Cpu,
    title: "STEM & Engineering",
    description: "Preparing youth for roles in infrastructure, energy, construction technology, and sustainable development with industry-standard tools.",
    bullets: [
      "Engineering fundamentals and digital design",
      "Modeling, simulation, and GIS",
      "Civil, electrical, mechanical, and architectural fields",
      "Applied problem-solving aligned with employer expectations",
    ],
  },
  {
    icon: Briefcase,
    title: "Consultancy & Career Services",
    description: "Guiding youth through personalized career pathways and connecting them to employers, investors, and public sector partners.",
    bullets: [
      "Career advice, skill assessment, resume building",
      "Employer and talent matchmaking",
      "Investor forums and innovation challenges",
      "Government and private sector partnership spaces",
    ],
  },
  {
    icon: CalendarDays,
    title: "Events & Ecosystem Building",
    description: "Industry matchmaking, innovation forums, and ecosystem-building engagements that connect learners to real opportunity.",
    bullets: [
      "Investor forums and innovation challenges",
      "Industry matchmaking events",
      "Ecosystem-building engagements",
      "Government and private sector partnership spaces",
    ],
  },
  {
    icon: Droplets,
    title: "Aliko WASH",
    description: "Water, sanitation, and hygiene solutions driving public health impact and community resilience across Africa.",
    bullets: [
      "Clean water access and infrastructure",
      "Sanitation systems and hygiene education",
      "Community health and disease prevention",
      "Sustainable WASH technology solutions",
    ],
    link: "https://alikowash.lovable.app/",
  },
  {
    icon: Leaf,
    title: "Community Resilience",
    description: "Climate adaptation, food security, and social cohesion programs that help communities adapt, recover, and thrive.",
    bullets: [
      "Climate-smart agriculture and food systems",
      "Local disaster preparedness and response",
      "Youth leadership and civic participation",
      "Cross-sector partnerships with governments and NGOs",
    ],
  },
];

export default function Programs() {
  return (
    <PageShell
      eyebrow="Our work"
      title="Seven program areas. One coherent mission."
      intro="Integrated pathways across education, health, technology, WASH, and entrepreneurship, delivered through community-designed programs based in Seattle, Washington and Ethiopia."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <p.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <ul className="mt-4 space-y-1.5">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Visit program <ArrowRight className="h-3.5 w-3.5" />
              </a>
            )}
          </article>
        ))}
      </div>
    </PageShell>
      <DeliveryPathwaysSection />
      <ImplementationJourneySection />
      <ProgramDesignPrinciplesSection />
    </>
  );
}
