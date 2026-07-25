import { PageShell } from "@/components/foundation/PageShell";
import { MapPin } from "lucide-react";

const anchors = [
  {
    place: "Seattle, Washington · USA",
    role: "Organizational home. Governance, diaspora engagement, U.S.-based partnerships, and program coordination.",
    bg: "bg-[hsl(var(--trust-blue))]",
  },
  {
    place: "Ethiopia",
    role: "Priority delivery region. Community-designed programs across education, workforce development, digital health, WASH, and STEM.",
    bg: "bg-[hsl(var(--amber))]",
  },
];

export default function WhereWeWork() {
  return (
    <PageShell
      eyebrow="Where we work"
      title="Rooted in place. Connected globally."
      intro="The Foundation is based in Seattle, Washington and delivers priority programs in Ethiopia. Every initiative is locally led and community-designed, with a delivery model built to travel as partnerships grow."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {anchors.map((a) => (
          <article
            key={a.place}
            className={`${a.bg} text-white rounded-2xl p-8 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="font-heading text-xl font-bold">{a.place}</h2>
            </div>
            <p className="mt-5 text-sm leading-relaxed opacity-95">{a.role}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Additional regions will be announced as partnerships are formalized. Our work is aligned with national youth strategies, the African Union&rsquo;s Agenda 2063, and the UN Sustainable Development Goals.
      </p>
    </PageShell>
  );
}
