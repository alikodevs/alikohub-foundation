import { PageShell } from "@/components/foundation/PageShell";
import { foundation } from "@/config/foundation";

export default function WhereWeWork() {
  return (
    <PageShell
      eyebrow="Where we work"
      title="Rooted in place. Connected globally."
      intro={`We begin in ${foundation.primaryLocations.join(" and ")}. Additional regions will only appear here once formal partnerships and legal permissions are documented.`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold text-foreground">Washington State, USA</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Organizational home, governance, diaspora engagement, and U.S.-based partnerships.
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-xl font-semibold text-foreground">Ethiopia</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Priority region for community-designed programs across education, WASH, workforce
            development, and public health.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
