import { PageShell } from "@/components/foundation/PageShell";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import { foundation } from "@/config/foundation";
import { Building2, Users, Handshake, GraduationCap, CheckCircle2, Mail, ArrowRight } from "lucide-react";

const partnerTypes = [
  {
    icon: Building2,
    title: "Institutional & Funding Partners",
    body: "Foundations, multilateral agencies, and government programs seeking accountable, locally grounded delivery partners.",
    accent: "hsl(var(--trust-blue))",
  },
  {
    icon: Handshake,
    title: "Implementing Organizations",
    body: "Community-based organizations and NGOs with demonstrated presence in priority regions.",
    accent: "hsl(var(--amber))",
  },
  {
    icon: GraduationCap,
    title: "Academic & Research Partners",
    body: "Universities, research institutes, and evaluators who can strengthen program design and independent learning.",
    accent: "hsl(160,55%,42%)",
  },
  {
    icon: Users,
    title: "Advisors & Volunteers",
    body: "Practitioners, mentors, and diaspora professionals contributing time, expertise, and networks.",
    accent: "hsl(280,45%,55%)",
  },
];

const principles = [
  "Documented, mission-aligned, and conducted on appropriate terms.",
  "Locally led. Community priorities set the agenda.",
  "Transparent about roles, funding, data, and decision-making.",
  "Safeguarding-first, with clear reporting and accountability.",
];

const steps = [
  { n: "01", title: "Introduce", body: "Share a brief about your organization and the collaboration you have in mind." },
  { n: "02", title: "Explore", body: "A short discovery conversation to test alignment and community fit." },
  { n: "03", title: "Design", body: "Co-design scope, roles, safeguarding, and measurement together." },
  { n: "04", title: "Launch", body: "Formalize the partnership with a documented agreement and clear milestones." },
];

export default function Partnership() {
  return (
    <PageShell
      eyebrow="Partnerships"
      title="Partner with a foundation that listens first."
      intro="We are building a small number of deep, accountable partnerships rather than many shallow ones. If our missions align, we would like to hear from you."
    >
      {/* Compact ribbon */}
      <div className="mb-10 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4">
        {[
          { k: "Partner types", v: "4 pathways" },
          { k: "Model", v: "Deep, not shallow" },
          { k: "Onboarding", v: "4-step process" },
          { k: "Response", v: "Personal reply" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Who we partner with */}
      <section>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Who we work with</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Four partnership pathways</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {partnerTypes.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="h-1.5 w-full" style={{ background: p.accent }} aria-hidden />
              <div className="flex gap-4 p-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ background: p.accent }}
                >
                  <p.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Onboarding steps */}
      <section className="mt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">How it works</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">From first conversation to launch</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--trust-blue))] px-2.5 py-0.5 text-[10px] font-bold text-white">
                  {s.n}
                </span>
                <h3 className="font-heading text-sm font-semibold text-foreground">{s.title}</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[hsl(var(--amber))] lg:block" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Our commitments</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Partnership principles</h2>
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {principles.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--amber))]" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Inquiry */}
      <section className="mt-16" aria-labelledby="partnership-inquiry">
        <div className="rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Start a conversation</p>
              <h2 id="partnership-inquiry" className="mt-2 font-heading text-2xl font-semibold text-foreground">
                Tell us about the partnership you have in mind.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Share a brief about your organization, the community you serve, and the collaboration you envision. A
                member of our team will respond personally.
              </p>
              <a
                href={`mailto:${foundation.contactEmail}?subject=Partnership%20Inquiry`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-[hsl(var(--trust-blue))] transition-colors hover:bg-[hsl(var(--trust-blue))] hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {foundation.contactEmail}
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <InquiryForm sourcePage="/partnership" defaultType="partnership" lockType />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <LegalSeparationStrip />
      </div>
    </PageShell>
  );
}
