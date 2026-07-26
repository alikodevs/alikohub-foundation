import { PageShell } from "@/components/foundation/PageShell";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import { Handshake, HeartHandshake, Newspaper, Heart, ArrowRight } from "lucide-react";

const pathways = [
  {
    icon: Handshake,
    title: "Partner with us",
    body: "Institutions, implementers, and community-based organizations can propose collaborations that advance our shared mission.",
    accent: "hsl(var(--trust-blue))",
    tag: "Institutions",
  },
  {
    icon: HeartHandshake,
    title: "Volunteer skills & mentorship",
    body: "Advisors, mentors, and practitioners can offer time and expertise to strengthen program design and delivery.",
    accent: "hsl(160,55%,42%)",
    tag: "Individuals",
  },
  {
    icon: Heart,
    title: "Donate",
    body: "Support education, WASH, health, and workforce programs. Contributions are tax-deductible to the extent allowed by law.",
    accent: "hsl(var(--amber))",
    tag: "Supporters",
  },
  {
    icon: Newspaper,
    title: "Media & press",
    body: "Journalists and researchers can request interviews, background, or accurate context about the Foundation.",
    accent: "hsl(280,45%,55%)",
    tag: "Media",
  },
];

export default function GetInvolved() {
  return (
    <PageShell
      eyebrow="Get involved"
      title="There is a role for you."
      intro="Choose the pathway that best matches how you can contribute. Every submission is read by a member of the Foundation team."
    >
      <div className="mb-10 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4">
        {[
          { k: "Pathways", v: "4 options" },
          { k: "Tax status", v: "501(c)(3)" },
          { k: "Reply", v: "Personal follow-up" },
          { k: "Priority", v: "Locally-led work" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <section aria-label="Ways to get involved" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pathways.map((p) => (
          <article
            key={p.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="h-1.5 w-full" style={{ background: p.accent }} aria-hidden />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: p.accent }}>
                  <p.icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{p.tag}</span>
              </div>
              <h2 className="mt-4 font-heading text-base font-semibold text-foreground">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: p.accent }}>
                Choose this pathway <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16" aria-labelledby="get-involved-form">
        <div className="rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Tell us more</p>
          <h2 id="get-involved-form" className="mt-2 font-heading text-2xl font-semibold text-foreground">
            How would you like to contribute?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Share a bit about you or your organization and the pathway that fits best. We will follow up personally.
          </p>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <InquiryForm sourcePage="/get-involved" defaultType="volunteer" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
