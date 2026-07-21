import { PageShell } from "@/components/foundation/PageShell";
import { MapPin } from "lucide-react";

const anchors = [
  {
    place: "Seattle, Washington · USA",
    role: "Organizational home. Governance, diaspora engagement, U.S.-based partnerships, and program coordination.",
  },
  {
    place: "Ethiopia",
    role: "Priority delivery region. Community-designed programs across education, workforce development, digital health, WASH, and STEM.",
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
          <article key={a.place} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="font-heading text-lg font-semibold text-foreground">{a.place}</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{a.role}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Additional regions will be announced as partnerships are formalized. Our work is aligned with national youth strategies, the African Union&rsquo;s Agenda 2063, and the UN Sustainable Development Goals.
      </p>
    </PageShell>
  );
}
