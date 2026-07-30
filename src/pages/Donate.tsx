import { PageShell } from "@/components/foundation/PageShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  ShieldCheck,
  Receipt,
  Users,
  GraduationCap,
  Stethoscope,
  Droplets,
  Handshake,
  Mail,
  ArrowRight,
  FileText,
  BarChart3,
  Eye,
} from "lucide-react";
import { foundation } from "@/config/foundation";
import { Link } from "react-router-dom";

const suggestedGifts = [
  { amount: "$25", impact: "Learning materials for one student for a term." },
  { amount: "$75", impact: "One month of digital-skills coaching for a young learner." },
  { amount: "$250", impact: "A community health worker's field kit and training stipend." },
  { amount: "$1,000", impact: "A cohort seat in a workforce-readiness program." },
];

const designations = [
  { icon: GraduationCap, title: "Education & Learning", body: "Curriculum, teacher support, and open learning resources." },
  { icon: Users, title: "Workforce & Livelihoods", body: "Training, apprenticeships, and employer matchmaking." },
  { icon: Stethoscope, title: "Public & Digital Health", body: "Community health workforce and mobile health tools." },
  { icon: Droplets, title: "Water, Sanitation & Hygiene", body: "WASH infrastructure and hygiene education." },
];

const ways = [
  { icon: Heart, title: "One-time or monthly gift", body: "Give securely online. Recurring gifts help us plan multi-year programs." },
  { icon: Handshake, title: "Donor-advised funds & stock", body: "Recommend a grant from your DAF or transfer appreciated securities." },
  { icon: Receipt, title: "Employer matching", body: "Many employers match charitable gifts. Ask your HR team about matching AlikoHub Foundation." },
  { icon: Mail, title: "Checks & wire transfers", body: `Contact ${foundation.contactEmail} for mailing address and wire instructions.` },
];

export default function Donate() {
  return (
    <PageShell
      eyebrow="Support Our Mission"
      title="Donate to AlikoHub Foundation"
      intro="Your gift funds community-designed programs in education, workforce, health, and WASH across Washington State and Ethiopia. Every contribution is stewarded with transparency and measured against real outcomes."
      seo={{
        title: "Donate — AlikoHub Foundation",
        description:
          "Support AlikoHub Foundation with a one-time or recurring gift. 501(c)(3) tax-deductible donations fund education, workforce, health, and WASH programs.",
      }}
    >
      {/* Trust ribbon */}
      <section className="mb-12 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-[hsl(var(--trust-blue))]" aria-hidden />
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">501(c)(3) organization</p>
            <p className="mt-1 text-xs text-muted-foreground">Gifts are tax-deductible to the extent allowed by U.S. law.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Receipt className="mt-0.5 h-5 w-5 text-[hsl(var(--trust-blue))]" aria-hidden />
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">Receipt on every gift</p>
            <p className="mt-1 text-xs text-muted-foreground">You'll receive an acknowledgment for your records.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-5 w-5 text-[hsl(var(--trust-blue))]" aria-hidden />
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">Independent governance</p>
            <p className="mt-1 text-xs text-muted-foreground">Board-approved policies keep programs accountable.</p>
          </div>
        </div>
      </section>

      {/* Suggested gifts */}
      <section className="mb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Suggested Gifts</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">Choose an amount that fits</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            These examples illustrate typical program costs. Any gift, at any level, helps.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {suggestedGifts.map((g) => (
            <Card key={g.amount} className="border-t-4 border-t-[hsl(var(--amber))] p-5">
              <p className="font-heading text-3xl font-bold text-[hsl(var(--trust-blue))]">{g.amount}</p>
              <p className="mt-2 text-sm text-muted-foreground">{g.impact}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <a href={`mailto:${foundation.contactEmail}?subject=Donation%20inquiry`}>
              <Heart className="mr-2 h-4 w-4" aria-hidden /> Give now
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={`mailto:${foundation.contactEmail}?subject=Monthly%20giving`}>Set up monthly giving</a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Our secure online giving platform is being finalized. In the meantime, contact us to arrange your gift.
        </p>
      </section>

      {/* Designations */}
      <section className="mb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Designate Your Gift</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">Where your gift can go</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {designations.map((d) => (
            <Card key={d.title} className="p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))] text-white">
                <d.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{d.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{d.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Other ways to give */}
      <section className="mb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">More Ways to Give</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">Ways to support the Foundation</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ways.map((w) => (
            <div key={w.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--warm-surface))] text-[hsl(var(--trust-blue))]">
                  <w.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{w.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparency */}
      <section className="rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-8">
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Where your dollars go</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The Foundation publishes annual reports, financial summaries, and Form 990 filings on our transparency pages.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link to="/annual-report" className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
            Annual Report →
          </Link>
          <Link to="/financials" className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
            Financials →
          </Link>
          <Link to="/transparency" className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
            Transparency →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
