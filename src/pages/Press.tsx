import { PageShell } from "@/components/foundation/PageShell";
import { Mail, Newspaper } from "lucide-react";

const releases = [
  {
    date: "Coming soon",
    title: "Foundation launches its inaugural program cohort",
    summary: "An overview of the pilot cohort, the priority areas represented, and the partners co-designing the work.",
  },
  {
    date: "Coming soon",
    title: "New partnership framework for outcome-linked programs",
    summary: "How the Foundation is structuring employer, academic, and public-sector partnerships around measurable outcomes.",
  },
  {
    date: "Coming soon",
    title: "Annual Impact review published",
    summary: "The Foundation's first annual review covering programs, learnings, financials, and forward priorities.",
  },
];

const Press = () => (
  <PageShell
    eyebrow="Newsroom"
    title="Press & Media"
    intro="Announcements, program updates, and resources for journalists and partners covering the AlikoHub Foundation."
  >
    <section>
      <h2 className="font-heading text-2xl font-bold text-foreground">Latest updates</h2>
      <div className="mt-6 space-y-4">
        {releases.map((r) => (
          <article key={r.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--trust-blue))]">{r.date}</p>
            <h3 className="mt-2 font-heading text-lg font-bold text-foreground">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="mt-14 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-6">
        <Newspaper className="h-6 w-6 text-[hsl(var(--trust-blue))]" aria-hidden />
        <h3 className="mt-3 font-heading text-lg font-bold text-foreground">Media kit</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Logos, brand guidance, board biographies, and approved fact sheets available on request.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <Mail className="h-6 w-6 text-[hsl(var(--trust-blue))]" aria-hidden />
        <h3 className="mt-3 font-heading text-lg font-bold text-foreground">Press contact</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          For interviews and media requests, email{" "}
          <a href="mailto:info@alikohubfoundation.org" className="font-semibold text-[hsl(var(--trust-blue))] underline">
            info@alikohubfoundation.org
          </a>.
        </p>
      </div>
    </section>
  </PageShell>
);

export default Press;
