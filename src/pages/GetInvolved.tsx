import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";
import { Link } from "react-router-dom";
import { foundationStatus } from "@/config/foundation";

export default function GetInvolved() {
  const pathways = [
    {
      title: "Partner with us",
      body: "Institutions, implementers, and community-based organizations can propose collaborations that advance our shared mission.",
      href: "/partnership",
      cta: "Explore partnership",
    },
    {
      title: "Volunteer skills & mentorship",
      body: "Advisors, mentors, and practitioners can offer time and expertise to strengthen program design and delivery.",
      href: "/contact",
      cta: "Get in touch",
    },
    {
      title: "Stay informed",
      body: "Receive occasional updates about the Foundation once our newsletter workflow is approved.",
      href: "/contact",
      cta: "Contact us",
    },
  ];
  return (
    <PageShell
      eyebrow="Get involved"
      title="There is a role for you."
      intro="Choose the pathway that best matches how you can contribute."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {pathways.map((p) => (
          <article key={p.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.body}</p>
            <Link
              to={p.href}
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              {p.cta} &rarr;
            </Link>
          </article>
        ))}
      </div>
      {!foundationStatus.donationsEnabled && (
        <div className="mt-10 rounded-xl border border-border bg-secondary p-6 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Donations:</span> We are not currently
            accepting donations. Financial giving will be enabled only after Washington nonprofit
            registration and 501(c)(3) recognition are confirmed and the appropriate compliance
            workflows are in place.
          </p>
        </div>
      )}
      <div className="mt-10">
        <InDevelopmentNote note="Structured volunteer intake and partnership application forms will be added once accessible-form patterns are approved." />
      </div>
    </PageShell>
  );
}
