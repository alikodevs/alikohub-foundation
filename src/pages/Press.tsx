import { PageShell } from "@/components/foundation/PageShell";
import { Mail, Newspaper, Download, Calendar } from "lucide-react";
import { foundation } from "@/config/foundation";

const releases = [
  {
    date: "Founding release",
    title: "AlikoHub Foundation launches to advance a youth resourcefulness ecosystem",
    summary:
      "The Foundation formalizes its nonprofit mandate to expand equitable access to education, workforce development, digital and public health, WASH, and community resilience, anchored in Seattle and Ethiopia.",
    accent: "hsl(var(--trust-blue))",
  },
  {
    date: "Program note",
    title: "Partnership framework built around Train, Guide, Connect, Scale",
    summary:
      "How the Foundation structures employer, academic, and public-sector partnerships around the four-stage learning-to-leadership pathway that guides every cohort.",
    accent: "hsl(var(--amber))",
  },
  {
    date: "Ecosystem update",
    title: "Foundation aligns with the seven priority-area program pillars",
    summary:
      "A summary of how the Foundation's programs advance Education, Workforce, Technology, Public and Digital Health, WASH, Entrepreneurship, and Community Resilience with local partners.",
    accent: "hsl(160,55%,42%)",
  },
];

export default function Press() {
  return (
    <PageShell
      eyebrow="Newsroom"
      title="Press & Media"
      intro="Announcements, program updates, and resources for journalists and partners covering the AlikoHub Foundation."
    >
      <div className="mb-10 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4">
        {[
          { k: "Releases", v: `${releases.length} published` },
          { k: "Media kit", v: "On request" },
          { k: "Interviews", v: "Board & President" },
          { k: "Response", v: "Priority routing" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>


      <section>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Announcements</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Latest updates</h2>
        </div>
        <div className="mt-6 space-y-4">
          {releases.map((r) => (
            <article
              key={r.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex">
                <div className="w-1.5 shrink-0" style={{ background: r.accent }} aria-hidden />
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[hsl(var(--amber))]" aria-hidden />
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: r.accent }}>{r.date}</p>
                  </div>
                  <h3 className="mt-2 font-heading text-lg font-bold text-foreground">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="h-1.5 w-full bg-[hsl(var(--trust-blue))]" aria-hidden />
          <div className="p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
              <Newspaper className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-3 font-heading text-base font-semibold text-foreground">Media kit</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Logos, brand guidance, board biographies, and approved fact sheets available on request.
            </p>
            <a
              href={`mailto:${foundation.contactEmail}?subject=Media%20kit%20request`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--trust-blue))] hover:underline"
            >
              Request media kit <Download className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="h-1.5 w-full bg-[hsl(var(--amber))]" aria-hidden />
          <div className="p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--amber))]/15 text-[hsl(var(--amber))]">
              <Mail className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-3 font-heading text-base font-semibold text-foreground">Press contact</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              For interviews and media requests, email{" "}
              <a href={`mailto:${foundation.contactEmail}`} className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
                {foundation.contactEmail}
              </a>.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
