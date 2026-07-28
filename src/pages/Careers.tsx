import { PageShell } from "@/components/foundation/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, HeartHandshake, Globe2, Sparkles, Scale, GraduationCap, Mail, ArrowUpRight, Search, UserCheck } from "lucide-react";
import { foundation } from "@/config/foundation";
import logoCareer from "@/assets/brands/aliko-career-portal.png";

const CAREER_PORTAL_URL = "https://career.alikohub.com/";


const values = [
  { icon: HeartHandshake, title: "Community-first", body: "We design with communities, not for them, and we hire people who share that commitment." },
  { icon: Scale, title: "Equity & safeguarding", body: "We uphold rigorous safeguarding, non-discrimination, and inclusion standards across every role." },
  { icon: Globe2, title: "Locally grounded, globally connected", body: "We operate across Washington State and Ethiopia and partner globally." },
  { icon: Sparkles, title: "Learning organization", body: "We invest in staff growth, mentorship, and honest reflection on what works." },
];

const benefits = [
  "Mission-driven work with measurable community outcomes",
  "Flexible, hybrid work arrangements where roles allow",
  "Professional development and mentorship budget",
  "Safeguarding, ethics, and DEI training for all staff",
  "Paid time off, holidays, and wellness support",
  "Inclusive parental leave and caregiving support",
];

export default function Careers() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Work with AlikoHub Foundation"
      intro="Build a career that turns resourcefulness into lasting opportunity. We hire practitioners who bring humility, rigor, and community accountability to every program we deliver."
      seo={{
        title: "Careers — AlikoHub Foundation",
        description:
          "Explore careers at AlikoHub Foundation. Join a team advancing education, workforce, health, and WASH programs across Washington State and Ethiopia.",
      }}
    >
      {/* Career Portal */}
      <section className="mb-14">
        <Card className="overflow-hidden border-0 bg-[hsl(var(--trust-blue))] p-0 text-white">
          <div className="grid items-center gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">AlikoHub Career Portal</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                One portal for every opportunity across the AlikoHub ecosystem
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
                Foundation roles, internships, fellowships, and openings across all AlikoHub ventures are published and managed
                on our shared Career Portal. Create one profile, apply once, and track your application status end to end.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-[hsl(var(--amber))] text-[hsl(var(--deep-navy))] hover:bg-[hsl(var(--amber))]/90">
                  <a href={CAREER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                    Browse & apply on the Career Portal
                    <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <a href={`mailto:${foundation.contactEmail}?subject=Expression%20of%20interest`}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden />
                    Send an expression of interest
                  </a>
                </Button>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Search, label: "Search roles", body: "All ventures, one listing feed" },
                  { icon: UserCheck, label: "One profile", body: "Reusable candidate account" },
                  { icon: Briefcase, label: "Track status", body: "Follow every application" },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl border border-white/20 bg-white/10 p-3">
                    <f.icon className="h-4 w-4 text-[hsl(var(--amber))]" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-white">{f.label}</p>
                    <p className="text-xs text-white/75">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={CAREER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto flex w-full max-w-[420px] items-center justify-center rounded-3xl bg-white/98 p-7 shadow-2xl shadow-black/10 ring-1 ring-white/60 transition-all hover:scale-[1.02] hover:bg-white hover:shadow-2xl hover:shadow-black/15"
              aria-label="Open AlikoHub Career Portal"
            >
              <img
                src={logoCareer}
                alt="AlikoHub Career Portal"
                className="h-auto w-full object-contain drop-shadow-sm"
                loading="lazy"
              />
            </a>
          </div>
        </Card>
      </section>

      {/* Current openings */}
      <section className="mb-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Open Roles</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">Current openings</h2>
          </div>
          <Button asChild variant="outline">
            <a href={CAREER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              View all openings
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>

        <Card className="mt-6 border-dashed p-8 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--warm-surface))] text-[hsl(var(--trust-blue))]">
            <Briefcase className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">Openings are published on the Career Portal</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            We are actively scaling programs in Washington State and Ethiopia, with roles in program delivery, partnerships,
            monitoring & evaluation, and operations. Live vacancies for the Foundation and every AlikoHub venture are listed on
            the portal.
          </p>
          <div className="mt-5">
            <Button asChild>
              <a href={CAREER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                Go to career.alikohub.com
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </Card>
      </section>


      {/* Values */}
      <section className="mb-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">How We Work</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">What you can expect from us</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <Card key={v.title} className="p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))] text-white">
                <v.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{v.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-14 rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-8">
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Benefits & support</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--amber))]" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Benefits vary by role, location, and employment type, and are confirmed in individual offers.
        </p>
      </section>

      {/* Equal opportunity */}
      <section>
        <h2 className="font-heading text-lg font-semibold text-foreground">Equal opportunity employer</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          AlikoHub Foundation is an equal opportunity employer. We do not discriminate on the basis of race, color, religion,
          gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, veteran status,
          or any other protected characteristic. We actively encourage applications from people whose backgrounds reflect the
          communities we serve.
        </p>
      </section>
    </PageShell>
  );
}
