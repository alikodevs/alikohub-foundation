import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { foundation } from "@/config/foundation";

export default function Transparency() {
  const items = [
    { label: "Legal entity", value: `${foundation.legalName} (Washington, USA) — formation pending` },
    { label: "Federal tax status", value: "501(c)(3) recognition pending; tax-deductible receipts not yet available" },
    { label: "Governing board", value: "Founding board of three directors — see Governance" },
    { label: "Separation from AlikoHub LLC", value: "Legally separate; independent governance, finances, and records" },
    { label: "Financial reports", value: "Will be published once audited records are available" },
    { label: "Safeguarding", value: "Policy framework in development" },
  ];
  return (
    <PageShell
      eyebrow="Transparency"
      title="Open by default."
      intro="We disclose our legal status, governance, and policies openly so partners and communities can make informed decisions."
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.label} className="rounded-xl border border-border bg-card p-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-primary">{i.label}</dt>
            <dd className="mt-2 text-sm text-foreground">{i.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10">
        <InDevelopmentNote note="Privacy notice, cookie notice, accessibility statement, and terms of use are being finalized ahead of public launch." />
      </div>
    </PageShell>
  );
}
