import { PageShell } from "@/components/foundation/PageShell";
import { Heart, ShieldCheck, Home, Handshake, Lock, FileText } from "lucide-react";

const principles = [
  { icon: Heart, title: "Respect & Dignity", body: "Every participant, partner, and community member is treated with dignity and fairness. No one is excluded on the basis of gender, background, disability, ethnicity, faith, or location.", accent: "hsl(15,80%,55%)" },
  { icon: Home, title: "Safe Learning Environments", body: "Programs are designed to be free of harassment, discrimination, and exploitation. Concerns can be raised safely and are acted on promptly.", accent: "hsl(var(--trust-blue))" },
  { icon: Lock, title: "Data Responsibility", body: "We collect only what we need, protect it carefully, obtain informed consent, and share it only for legitimate program purposes.", accent: "hsl(280,45%,55%)" },
  { icon: Handshake, title: "Ethical Partnerships", body: "Collaborations with governments, funders, and community organizations are transparent, mission-aligned, and held to the same ethical standards we hold ourselves to.", accent: "hsl(var(--amber))" },
  { icon: ShieldCheck, title: "Safeguarding First", body: "A safeguarding framework covering children, vulnerable adults, staff, and partners guides every program, with trained staff and clear escalation paths.", accent: "hsl(160,55%,42%)" },
  { icon: FileText, title: "Honest Reporting", body: "We report what we can verify. Limitations, setbacks, and lessons learned are published alongside successes.", accent: "hsl(174,60%,45%)" },
];

export default function Ethics() {
  return (
    <PageShell
      eyebrow="Ethics & safeguards"
      title="Integrity is a design choice, not a disclaimer."
      intro="Our commitments to safety, dignity, and honesty shape how we design programs, choose partners, handle data, and communicate results."
    >
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Principles", v: `${principles.length} commitments` },
          { k: "Oversight", v: "Board-approved" },
          { k: "Data", v: "Minimized & consented" },
          { k: "Reporting", v: "Honest & complete" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <article
            key={p.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="h-1.5 w-full" style={{ background: p.accent }} aria-hidden />
            <div className="p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: p.accent }}>
                <p.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
