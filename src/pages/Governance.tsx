import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { foundation, board } from "@/config/foundation";

export default function Governance() {
  return (
    <PageShell
      eyebrow="Governance"
      title="Board of Directors"
      intro="AlikoHub Foundation is governed by a founding board committed to transparent, accountable, mission-aligned decision-making."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {board.map((m) => (
          <article key={m.name} className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">{m.name}</h2>
            <p className="mt-1 text-sm font-medium text-primary">{m.role}</p>
            <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
          </article>
        ))}
      </div>
      <div className="mt-12 rounded-xl border border-border bg-secondary p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">Legal identity</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {foundation.separationStatement}
        </p>
      </div>
      <div className="mt-8">
        <InDevelopmentNote note="Bylaws, conflict-of-interest policy, meeting cadence, and safeguarding framework will be published as the board approves them." />
      </div>
    </PageShell>
  );
}
