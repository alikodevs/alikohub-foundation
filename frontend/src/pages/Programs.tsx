import { PageShell } from "@/components/foundation/PageShell";
import { GraduationCap, Heart, Cpu, Briefcase, Droplets, CalendarDays, Leaf, ArrowRight } from "lucide-react";
import {
  ImplementationJourneySection,
  DeliveryPathwaysSection,
  ProgramDesignPrinciplesSection,
} from "@/components/foundation/ProgramSections";
import { usePublicPrograms } from "@/hooks/useCms";
import { getFullMediaUrl } from "@/lib/utils";


type Pillar = {
  icon: typeof GraduationCap;
  title: string;
  description: string;
  bullets: string[];
  image?: string;
  link?: string;
  theme: {
    ring: string;      // header band background
    chip: string;      // small icon chip bg
    chipFg: string;    // icon color
    dot: string;       // bullet dot
    link: string;      // link text color
    border: string;    // card border accent
  };
};

const THEMES = [
  {
    ring: "bg-[hsl(var(--trust-blue))]",
    chip: "bg-white/20",
    chipFg: "text-white",
    dot: "bg-[hsl(var(--trust-blue))]",
    link: "text-[hsl(var(--trust-blue))]",
    border: "border-[hsl(var(--trust-blue)/0.35)]",
  },
  {
    ring: "bg-[hsl(var(--terracotta))]",
    chip: "bg-white/20",
    chipFg: "text-white",
    dot: "bg-[hsl(var(--terracotta))]",
    link: "text-[hsl(var(--terracotta))]",
    border: "border-[hsl(var(--terracotta)/0.35)]",
  },
  {
    ring: "bg-[hsl(var(--plum))]",
    chip: "bg-white/20",
    chipFg: "text-white",
    dot: "bg-[hsl(var(--plum))]",
    link: "text-[hsl(var(--plum))]",
    border: "border-[hsl(var(--plum)/0.35)]",
  },
  {
    ring: "bg-[hsl(var(--amber))]",
    chip: "bg-white/25",
    chipFg: "text-white",
    dot: "bg-[hsl(var(--amber))]",
    link: "text-[hsl(25,90%,32%)]",
    border: "border-[hsl(var(--amber)/0.4)]",
  },
  {
    ring: "bg-[hsl(var(--sky))]",
    chip: "bg-white/20",
    chipFg: "text-white",
    dot: "bg-[hsl(var(--sky))]",
    link: "text-[hsl(var(--sky))]",
    border: "border-[hsl(var(--sky)/0.35)]",
  },
  {
    ring: "bg-[hsl(var(--sage))]",
    chip: "bg-white/25",
    chipFg: "text-white",
    dot: "bg-[hsl(var(--sage))]",
    link: "text-[hsl(var(--sage))]",
    border: "border-[hsl(var(--sage)/0.4)]",
  },
];


export default function Programs() {
  const { data: publicPrograms } = usePublicPrograms();

  const pillars: Pillar[] =
    publicPrograms && publicPrograms.length > 0
      ? publicPrograms.map((item: Record<string, unknown>, idx: number) => {
          const rawImg =
            (item.imageUrl as string) ||
            (item.image_url as string) ||
            (item.image as string);

          let featureList: string[] = [];
          if (Array.isArray(item.features)) {
            featureList = item.features as string[];
          } else if (typeof item.features === "string") {
            try {
              featureList = JSON.parse(item.features);
            } catch {
              featureList = [];
            }
          }

          return {
            icon: GraduationCap,
            title: (item.title as string) || "Untitled Program",
            description: (item.description as string) || "",
            bullets: featureList,
            image: rawImg ? getFullMediaUrl(rawImg) : undefined,
            link: (item.link as string) || undefined,
            theme: THEMES[idx % THEMES.length],
          };
        })
      : [];

  return (
    <PageShell
      eyebrow="Our work"
      title={pillars.length > 0 ? `${pillars.length} program areas. One coherent mission.` : "Program areas. One coherent mission."}
      intro="Integrated pathways across education, health, technology, WASH, and entrepreneurship, delivered through community-designed programs based in Seattle, Washington and Ethiopia."
      afterContent={
        <>
          <DeliveryPathwaysSection />
          <ImplementationJourneySection />
          <ProgramDesignPrinciplesSection />
        </>
      }
    >
      {/* Compact overview strip */}
      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { v: `${pillars.length}`, l: "Program pillars", c: "text-[hsl(var(--trust-blue))]" },
          { v: "3", l: "Delivery pathways", c: "text-[hsl(var(--amber))]" },
          { v: "8", l: "Implementation steps", c: "text-[hsl(var(--terracotta))]" },
          { v: "5", l: "Design principles", c: "text-[hsl(var(--sage))]" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card px-4 py-3 text-center shadow-[var(--shadow-card)]">
            <div className={`font-heading text-2xl font-extrabold ${s.c}`}>{s.v}</div>
            <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>

      {pillars.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className={`group flex flex-col overflow-hidden rounded-2xl border ${p.theme.border} bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]`}
              >
                {/* Header band: image + colored overlay, or solid colored band */}
                <div className={`relative h-36 overflow-hidden ${p.theme.ring}`}>
                  {p.image && (
                    <>
                      <img
                        src={p.image}
                        alt={p.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </>
                  )}
                  <div className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl ${p.theme.chip} backdrop-blur-md ring-1 ring-white/40 shadow-lg`}>
                    <Icon className={`h-4 w-4 ${p.theme.chipFg}`} aria-hidden />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-heading text-base font-bold text-foreground">{p.title}</h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                  <ul className="mt-3 space-y-1">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[11px] leading-snug text-muted-foreground">
                        <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${p.theme.dot}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${p.theme.link} transition-all hover:gap-2.5`}
                    >
                      Visit program <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No programs currently published.
        </div>
      )}
    </PageShell>
  );
}
