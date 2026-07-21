import { PageShell } from "@/components/foundation/PageShell";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import { Handshake, HeartHandshake, Newspaper, Heart } from "lucide-react";

const pathways = [
  {
    icon: Handshake,
    title: "Partner with us",
    body: "Institutions, implementers, and community-based organizations can propose collaborations that advance our shared mission.",
  },
  {
    icon: HeartHandshake,
    title: "Volunteer skills & mentorship",
    body: "Advisors, mentors, and practitioners can offer time and expertise to strengthen program design and delivery.",
  },
  {
    icon: Heart,
    title: "Donate",
    body: "Support education, WASH, health, and workforce programs delivered by the Foundation. Contributions are tax-deductible to the extent allowed by law.",
  },
  {
    icon: Newspaper,
    title: "Media & press",
    body: "Journalists and researchers can request interviews, background, or accurate context about the Foundation.",
  },
];

export default function GetInvolved() {
  return (
    <PageShell
      eyebrow="Get involved"
      title="There is a role for you."
      intro="Choose the pathway that best matches how you can contribute. Every submission is read by a member of the Foundation team."
    >
      <section aria-label="Ways to get involved" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pathways.map((p) => (
          <article key={p.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <p.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <h2 className="mt-4 font-heading text-lg font-semibold text-foreground">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-16" aria-labelledby="get-involved-form">
        <h2 id="get-involved-form" className="font-heading text-2xl font-semibold text-foreground">
          Tell us how you would like to contribute.
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Share a bit about you or your organization and the pathway that fits best. We will follow up personally.
        </p>
        <div className="mt-8">
          <InquiryForm sourcePage="/get-involved" defaultType="volunteer" />
        </div>
      </section>
    </PageShell>
  );
}

