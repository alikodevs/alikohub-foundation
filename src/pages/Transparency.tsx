import { PageShell } from "@/components/foundation/PageShell";
import { foundation } from "@/config/foundation";

export default function Transparency() {
  const items = [
    { label: "Legal entity", value: `${foundation.legalName}, a Washington State nonprofit corporation.` },
    { label: "Federal tax status", value: "Recognized as a 501(c)(3) tax-exempt public charity. Contributions are tax-deductible to the extent allowed by law." },
    { label: "Governing board", value: "Board of three directors overseeing strategy, finances, and safeguarding. See Governance for details." },
    { label: "Relationship to AlikoHub LLC", value: "AlikoHub Foundation is the nonprofit arm of the AlikoHub ecosystem, with independent governance, finances, and program accountability." },
    { label: "Financial reports", value: "Annual audited financials and Form 990 are published on this page as they are completed." },
    { label: "Safeguarding", value: "Safeguarding, code of conduct, conflict-of-interest, and data-protection policies are approved by the board and enforced across programs." },
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
    </PageShell>
  );
}
