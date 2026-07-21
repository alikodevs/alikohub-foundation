import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { Heart, ShieldCheck, Home, Handshake, Lock, FileText } from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Respect & Dignity",
    body: "Every participant, partner, and community member is treated with dignity and fairness. No one is excluded on the basis of gender, background, disability, ethnicity, faith, or location.",
  },
  {
    icon: Home,
    title: "Safe Environments",
    body: "Our programs are designed to be free of harassment, discrimination, and exploitation. Concerns can be raised safely and are acted on promptly.",
  },
  {
    icon: Lock,
    title: "Data Responsibility",
    body: "We collect only the information we need, protect it carefully, obtain informed consent, and share it only for legitimate program purposes.",
  },
  {
    icon: Handshake,
    title: "Ethical Partnerships",
    body: "Collaborations with governments, funders, and community organizations are transparent, mission-aligned, and held to the same ethical standards we hold ourselves to.",
  },
  {
    icon: ShieldCheck,
    title: "Safeguarding First",
    body: "A safeguarding framework covering children, vulnerable adults, staff, and partners is under active development and will be approved by the board before program delivery.",
  },
  {
    icon: FileText,
    title: "Honest Reporting",
    body: "We report what we can verify. Limitations, setbacks, and lessons learned are published alongside successes.",
  },
];

export default function Ethics() {
  return (
    <PageShell
      eyebrow="Ethics & safeguards"
      title="Integrity is a design choice, not a disclaimer."
      intro="Our commitments to safety, dignity, and honesty shape how we design programs, choose partners, handle data, and communicate results."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <article key={p.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <p.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <InDevelopmentNote note="Formal safeguarding, code of conduct, conflict-of-interest, whistleblower, and data-protection policies are being drafted and will be published once approved by the board." />
      </div>
    </PageShell>
  );
}
