import { PageShell } from "@/components/foundation/PageShell";
import { FileText, TrendingUp, Users, Globe } from "lucide-react";

const highlights = [
  { icon: Users, label: "Youth reached", value: "Program cohorts across Seattle and Ethiopia" },
  { icon: Globe, label: "Delivery pathways", value: "Short-term, mid-term, and advanced tracks" },
  { icon: TrendingUp, label: "Partnerships", value: "Employer, academic, and public-sector co-design" },
];

const sections = [
  {
    title: "Letter from the President",
    body: "A reflection from Boni Aliko on the Foundation's founding year, the design principles guiding our programs, and the communities shaping our work.",
  },
  {
    title: "Programs & Outcomes",
    body: "How we translated the seven priority areas into measurable pathways, and what we learned from early cohorts.",
  },
  {
    title: "Financial Summary",
    body: "Revenue, expenses by program area, operating reserves, and independent review status. Detailed financials are published on the Financials page.",
  },
  {
    title: "Governance & Safeguarding",
    body: "Board activity, safeguarding practices, and how we protect community data and participant dignity.",
  },
  {
    title: "Looking Ahead",
    body: "The commitments, partnerships, and program expansions the Foundation is preparing for the coming year.",
  },
];

const AnnualReport = () => (
  <PageShell
    eyebrow="Transparency"
    title="Annual Report"
    intro="A yearly account of what we set out to do, what we delivered, what we learned, and how we stewarded the resources entrusted to us."
  >
    <div className="grid gap-4 sm:grid-cols-3">
      {highlights.map((h) => (
        <div key={h.label} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h.icon className="h-6 w-6 text-[hsl(var(--trust-blue))]" aria-hidden />
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h.label}</p>
          <p className="mt-1 text-sm text-foreground">{h.value}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 space-y-6">
      {sections.map((s) => (
        <article key={s.title} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h2 className="font-heading text-2xl font-bold text-foreground">{s.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </article>
      ))}
    </div>

    <div className="mt-12 rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-8 text-center">
      <FileText className="mx-auto h-8 w-8 text-[hsl(var(--trust-blue))]" aria-hidden />
      <h3 className="mt-3 font-heading text-xl font-bold text-foreground">Full report</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        The complete annual report will be published here for download. Request an advance copy at{" "}
        <a href="mailto:info@alikohubfoundation.org" className="font-semibold text-[hsl(var(--trust-blue))] underline">
          info@alikohubfoundation.org
        </a>.
      </p>
    </div>
  </PageShell>
);

export default AnnualReport;
