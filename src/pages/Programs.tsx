import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { programPillars } from "@/config/foundation";

export default function Programs() {
  return (
    <PageShell
      eyebrow="Our work"
      title="Seven program areas. One coherent mission."
      intro="Our program pillars follow directly from our mission. Each area will roll out only where community partnerships, funding, and safeguards are in place."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programPillars.map((p) => (
          <article
            key={p.slug}
            className="flex flex-col rounded-xl border border-border bg-card p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Program area</p>
            <h2 className="mt-2 font-heading text-lg font-semibold text-foreground">{p.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
            <p className="mt-4 text-xs italic text-muted-foreground">Program design in development.</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <InDevelopmentNote note="Detailed program briefs, target outcomes, delivery partners, and geographic scope will publish here as each program is approved for launch." />
      </div>
    </PageShell>
  );
}
