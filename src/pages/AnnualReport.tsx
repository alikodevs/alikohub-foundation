import { PageShell } from "@/components/foundation/PageShell";
import { FileText, TrendingUp, Users, Globe, Download } from "lucide-react";
import { foundation } from "@/config/foundation";

const highlights = [
  { icon: Users, label: "Youth reached", value: "Program cohorts across Seattle and Ethiopia", accent: "hsl(var(--trust-blue))" },
  { icon: Globe, label: "Delivery pathways", value: "Short-term, mid-term, and advanced tracks", accent: "hsl(var(--amber))" },
  { icon: TrendingUp, label: "Partnerships", value: "Employer, academic, and public-sector co-design", accent: "hsl(160,55%,42%)" },
];

const sections = [
  { n: "01", title: "Letter from the President", body: "A reflection from Boni Aliko on the Foundation's founding year, the design principles guiding our programs, and the communities shaping our work." },
  { n: "02", title: "Programs & Outcomes", body: "How we translated the seven priority areas into measurable pathways, and what we learned from early cohorts." },
  { n: "03", title: "Financial Summary", body: "Revenue, expenses by program area, operating reserves, and independent review status. Detailed financials are published on the Financials page." },
  { n: "04", title: "Governance & Safeguarding", body: "Board activity, safeguarding practices, and how we protect community data and participant dignity." },
  { n: "05", title: "Looking Ahead", body: "The commitments, partnerships, and program expansions the Foundation is preparing for the coming year." },
];

export default function AnnualReport() {
  return (
    <PageShell
      eyebrow="Transparency"
      title="Annual Report"
      intro="A yearly account of what we set out to do, what we delivered, what we learned, and how we stewarded the resources entrusted to us."
    >
      <div className="mb-10 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4">
        {[
          { k: "Format", v: "Narrative + data" },
          { k: "Cadence", v: "Annual" },
          { k: "Sections", v: `${sections.length} chapters` },
          { k: "Availability", v: "Coming soon" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <section>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">At a glance</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Founding-year highlights</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {highlights.map((h) => (
            <article key={h.label} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="h-1.5 w-full" style={{ background: h.accent }} aria-hidden />
              <div className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ background: h.accent }}>
                  <h.icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: h.accent }}>{h.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{h.value}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Contents</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Inside the report</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <article key={s.title} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <span className="inline-flex items-center rounded-full bg-[hsl(var(--trust-blue))] px-2.5 py-0.5 text-[10px] font-bold text-white">{s.n}</span>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-6 w-6 shrink-0 text-[hsl(var(--trust-blue))]" aria-hidden />
          <div>
            <h3 className="font-heading text-base font-semibold text-foreground">Full report</h3>
            <p className="mt-1 text-sm text-muted-foreground">The complete annual report will be published here for download.</p>
          </div>
        </div>
        <a
          href={`mailto:${foundation.contactEmail}?subject=Annual%20Report%20advance%20copy`}
          className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--trust-blue))] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--navy-light))]"
        >
          <Download className="h-4 w-4" aria-hidden /> Request advance copy
        </a>
      </div>
    </PageShell>
  );
}
