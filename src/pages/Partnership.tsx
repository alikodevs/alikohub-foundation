import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { foundation } from "@/config/foundation";
import { Building2, Users, Handshake, GraduationCap } from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Institutional & Funding Partners",
    body: "Foundations, multilateral agencies, and government programs seeking accountable, locally grounded delivery partners.",
  },
  {
    icon: Handshake,
    title: "Implementing Organizations",
    body: "Community-based organizations and NGOs with demonstrated presence in priority regions.",
  },
  {
    icon: GraduationCap,
    title: "Academic & Research Partners",
    body: "Universities, research institutes, and evaluators who can strengthen program design and independent learning.",
  },
  {
    icon: Users,
    title: "Advisors & Volunteers",
    body: "Practitioners, mentors, and diaspora professionals contributing time, expertise, and networks.",
  },
];

const principles = [
  "Documented, mission-aligned, and conducted on appropriate terms.",
  "Locally led. Community priorities set the agenda.",
  "Transparent about roles, funding, data, and decision-making.",
  "Safeguarding-first, with clear reporting and accountability.",
];

export default function Partnership() {
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partner with a foundation that listens first."
      intro="We are building a small number of deep, accountable partnerships rather than many shallow ones. If our missions align, we would like to hear from you."
    >
      <section>
        <h2 className="font-heading text-2xl font-semibold text-foreground">Who we partner with</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {partnerTypes.map((p) => (
            <article key={p.title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Our partnership principles</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p} className="rounded-lg border border-border bg-secondary/60 p-4 text-sm text-foreground">
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-secondary/60 p-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Start a conversation</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          A structured partnership inquiry form is being finalized alongside our accessibility and privacy review. Until then, reach us directly by email and we will respond personally.
        </p>
        <a
          href={`mailto:${foundation.contactEmail}?subject=Partnership%20Inquiry`}
          className="mt-5 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Email {foundation.contactEmail}
        </a>
      </section>

      <div className="mt-12">
        <InDevelopmentNote note="Standard partnership templates, MOUs, and due-diligence materials are in preparation and will be linked here once approved." />
      </div>

      <div className="mt-16">
        <LegalSeparationStrip />
      </div>
    </PageShell>
  );
}
