import { PageShell } from "@/components/foundation/PageShell";
import { PieChart, ShieldCheck, FileText, Scale } from "lucide-react";

const allocation = [
  { label: "Programs", value: "82%", note: "Direct delivery, participant support, curriculum, and partner co-investment." },
  { label: "Management & general", value: "12%", note: "Governance, finance, safeguarding, and compliance." },
  { label: "Fundraising", value: "6%", note: "Partnership development and donor stewardship." },
];

const principles = [
  { icon: ShieldCheck, title: "Independent oversight", body: "Board treasurer review, external bookkeeping, and independent financial review at defined thresholds." },
  { icon: Scale, title: "Restricted funds honored", body: "Donor-restricted contributions are tracked separately and reported against their stated purpose." },
  { icon: FileText, title: "Public filings", body: "IRS Form 990 and state charitable filings are made available here once filed each fiscal year." },
];

const Financials = () => (
  <PageShell
    eyebrow="Transparency"
    title="Financials"
    intro="How the Foundation raises, allocates, and reports on the resources entrusted to us. Detailed filings are posted as they are completed."
  >
    <section>
      <h2 className="font-heading text-2xl font-bold text-foreground">Illustrative allocation</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Targeted allocation profile. Actual ratios for each fiscal year are published with the Annual Report and Form 990.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {allocation.map((a) => (
          <div key={a.label} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <PieChart className="h-6 w-6 text-[hsl(var(--trust-blue))]" aria-hidden />
            <p className="mt-4 font-heading text-3xl font-bold text-foreground">{a.value}</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{a.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a.note}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-14">
      <h2 className="font-heading text-2xl font-bold text-foreground">Stewardship principles</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <p.icon className="h-6 w-6 text-[hsl(var(--trust-blue))]" aria-hidden />
            <h3 className="mt-3 font-heading text-lg font-bold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-14 rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-8">
      <h2 className="font-heading text-xl font-bold text-foreground">Filings & documents</h2>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        <li>IRS Form 990 — posted upon filing each fiscal year.</li>
        <li>Audited or independently reviewed financial statements — posted upon completion.</li>
        <li>State charitable registration filings — available on request.</li>
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        For a copy of any document, contact{" "}
        <a href="mailto:info@alikohubfoundation.org" className="font-semibold text-[hsl(var(--trust-blue))] underline">
          info@alikohubfoundation.org
        </a>.
      </p>
    </section>
  </PageShell>
);

export default Financials;
