import { PageShell } from "@/components/foundation/PageShell";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import { VolunteerImpactRibbon, VolunteerRoles } from "@/components/foundation/PartnershipEnhancements";
import { Handshake, HeartHandshake, Newspaper, Heart, ArrowRight, Calendar, Share2, Mail, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
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

      <VolunteerImpactRibbon />
      <VolunteerRoles />

      {/* Simple everyday actions - unique to individuals */}
      <section className="mt-16" aria-labelledby="everyday-actions">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Small actions, real impact</p>
          <h2 id="everyday-actions" className="mt-2 font-heading text-2xl font-semibold text-foreground">
            Ways to help in five minutes or less
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Share2, title: "Share our stories", body: "Amplify learner journeys on your networks to widen our reach.", accent: "hsl(var(--trust-blue))" },
            { icon: Mail, title: "Subscribe to updates", body: "Get quarterly progress notes and cohort milestones by email.", accent: "hsl(var(--amber))" },
            { icon: Calendar, title: "Attend an event", body: "Join a demo day, community convening, or open house.", accent: "hsl(160,55%,42%)" },
            { icon: BookOpen, title: "Read the research", body: "Explore our reports and resources to inform your own work.", accent: "hsl(280,45%,55%)" },
          ].map((a) => (
            <div key={a.title} className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ background: a.accent }}>
                <a.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">{a.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Redirect institutions to Partnership page */}
      <section className="mt-16">
        <div className="rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Representing an organization?</p>
            <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">Institutional partnerships live on a dedicated page.</h3>
            <p className="mt-1 text-sm text-muted-foreground">Explore partnership tiers, principles, and onboarding for foundations, NGOs, and academic partners.</p>
          </div>
          <Link to="/partnership" className="inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--trust-blue))] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
            Visit Partnerships <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
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
