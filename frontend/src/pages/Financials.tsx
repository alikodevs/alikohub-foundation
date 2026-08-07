import { PageShell } from "@/components/foundation/PageShell";
import { PieChart, ShieldCheck, FileText, Scale, Download } from "lucide-react";
import { foundation } from "@/config/foundation";

const allocation = [
  { label: "Programs", value: 82, note: "Direct delivery, participant support, curriculum, and partner co-investment.", accent: "hsl(var(--trust-blue))" },
  { label: "Management & general", value: 12, note: "Governance, finance, safeguarding, and compliance.", accent: "hsl(var(--amber))" },
  { label: "Fundraising", value: 6, note: "Partnership development and donor stewardship.", accent: "hsl(160,55%,42%)" },
];

const principles = [
  { icon: ShieldCheck, title: "Independent oversight", body: "Board treasurer review, external bookkeeping, and independent financial review at defined thresholds.", accent: "hsl(var(--trust-blue))" },
  { icon: Scale, title: "Restricted funds honored", body: "Donor-restricted contributions are tracked separately and reported against their stated purpose.", accent: "hsl(var(--amber))" },
  { icon: FileText, title: "Public filings", body: "IRS Form 990 and state charitable filings are made available here once filed each fiscal year.", accent: "hsl(160,55%,42%)" },
];

const filings = [
  { title: "IRS Form 990", meta: "Posted upon filing each fiscal year" },
  { title: "Audited / reviewed financial statements", meta: "Posted upon completion" },
  { title: "State charitable registration filings", meta: "Available on request" },
];

export default function Financials() {
  return (
    <PageShell
      eyebrow="Transparency"
      title="Financials"
      intro="How the Foundation raises, allocates, and reports on the resources entrusted to us. Detailed filings are posted as they are completed."
    >
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Program ratio", v: "82% target" },
          { k: "Oversight", v: "Board treasurer" },
          { k: "Review", v: "Independent" },
          { k: "Filings", v: "Public 990" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <section>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">How we allocate</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Illustrative allocation</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Targeted allocation profile. Actual ratios for each fiscal year are published with the Annual Report and Form 990.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {allocation.map((a) => (
            <article key={a.label} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="h-1.5 w-full" style={{ background: a.accent }} aria-hidden />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <PieChart className="h-5 w-5" style={{ color: a.accent }} aria-hidden />
                  <span className="font-heading text-3xl font-extrabold" style={{ color: a.accent }}>{a.value}%</span>
                </div>
                <p className="mt-3 font-heading text-base font-semibold text-foreground">{a.label}</p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[hsl(var(--warm-surface))]">
                  <div className="h-full rounded-full" style={{ width: `${a.value}%`, background: a.accent }} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{a.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Stewardship</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">How we steward funds</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {principles.map((p) => (
            <article key={p.title} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="h-1.5 w-full" style={{ background: p.accent }} aria-hidden />
              <div className="p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ background: p.accent }}>
                  <p.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Public record</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Filings & documents</h2>
        </div>
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {filings.map((f) => (
            <div key={f.title} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                  <FileText className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.meta}</p>
                </div>
              </div>
              <a
                href={`mailto:${foundation.contactEmail}?subject=${encodeURIComponent(`Request: ${f.title}`)}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--amber))] hover:underline"
              >
                Request <Download className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
