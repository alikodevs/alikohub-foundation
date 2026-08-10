import { PageShell } from "@/components/foundation/PageShell";
import { foundation } from "@/config/foundation";
import {
  Scale,
  BadgeCheck,
  Users,
  Building2,
  FileText,
  Shield,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    icon: Scale,
    label: "Legal entity",
    value: `${foundation.legalName}, a Washington State nonprofit corporation.`,
    accent: "hsl(var(--trust-blue))",
  },
  {
    icon: BadgeCheck,
    label: "Federal tax status",
    value:
      "Recognized as a 501(c)(3) tax-exempt public charity. Contributions are tax-deductible to the extent allowed by law.",
    accent: "hsl(var(--amber))",
  },
  {
    icon: Users,
    label: "Governing board",
    value: "Board of three directors overseeing strategy, finances, and safeguarding.",
    accent: "hsl(160,55%,42%)",
    link: { to: "/governance", label: "See Governance" },
  },
  {
    icon: Building2,
    label: "Relationship to AlikoHub LLC",
    value: foundation.separationStatement,
    accent: "hsl(280,45%,55%)",
  },
  {
    icon: FileText,
    label: "Financial reports",
    value: "Annual audited financials and Form 990 are published as they are completed.",
    accent: "hsl(15,80%,55%)",
    link: { to: "/financials", label: "View Financials" },
  },
  {
    icon: Shield,
    label: "Safeguarding & policies",
    value:
      "Safeguarding, code of conduct, conflict-of-interest, and data-protection policies are approved by the board and enforced across programs.",
    accent: "hsl(174,60%,45%)",
  },
];

const documents = [
  { title: "Articles of Incorporation", meta: "Washington State · Nonprofit", href: "#" },
  { title: "IRS Determination Letter", meta: "501(c)(3) recognition", href: "#" },
  { title: "Bylaws", meta: "Board-approved", href: "#" },
  { title: "Conflict of Interest Policy", meta: "Annual disclosure", href: "#" },
];

export default function Transparency() {
  return (
    <PageShell
      eyebrow="Transparency"
      title="Open by default."
      intro="We disclose our legal status, governance, and policies openly so partners and communities can make informed decisions."
    >
      {/* Compact ribbon */}
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Legal form", v: "WA Nonprofit" },
          { k: "Tax status", v: "501(c)(3)" },
          { k: "Board", v: "3 Directors" },
          { k: "Policies", v: "Board-approved" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Disclosure grid */}
      <section>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Disclosures</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">What we publish</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <article
              key={i.label}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="h-1 w-full" style={{ background: i.accent }} aria-hidden />
              <div className="p-5">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ background: i.accent }}
                >
                  <i.icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: i.accent }}>
                  {i.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{i.value}</p>
                {i.link && (
                  <Link
                    to={i.link.to}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--trust-blue))] hover:underline"
                  >
                    {i.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Public documents */}
      <section className="mt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Public record</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Documents & policies</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Foundational documents are available on request while our public records portal is being finalized.
          </p>
        </div>
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {documents.map((d) => (
            <a
              key={d.title}
              href={d.href}
              className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[hsl(var(--warm-surface))]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                  <FileText className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.meta}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--amber))] opacity-0 transition-opacity group-hover:opacity-100">
                Request <Download className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
