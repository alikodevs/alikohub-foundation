import { PageShell } from "@/components/foundation/PageShell";
import { Landmark, Building2, GraduationCap, Globe, Users, Lightbulb, HeartHandshake } from "lucide-react";

import partnerGenshifter from "@/assets/partner-genshifter.jpg";
import partnerAlikore from "@/assets/partner-alikore.png";
import partnerConshifter from "@/assets/partner-conshifter.png";
import partnerKindred from "@/assets/partner-kindred.png";

const categories = [
  { icon: Landmark, title: "Government Ministries & Agencies", accent: "hsl(var(--trust-blue))" },
  { icon: Building2, title: "Private Sector Companies", accent: "hsl(var(--amber))" },
  { icon: GraduationCap, title: "Academic & Training Institutions", accent: "hsl(160,55%,42%)" },
  { icon: Globe, title: "Development Partners & Donors", accent: "hsl(280,45%,55%)" },
  { icon: Users, title: "Community-Based Organizations", accent: "hsl(15,80%,55%)" },
  { icon: HeartHandshake, title: "Global Health & One Health Networks", accent: "hsl(174,60%,45%)" },
  { icon: Lightbulb, title: "Entrepreneurship & Innovation Ecosystem", accent: "hsl(var(--trust-blue))" },
];

const partners = [
  { name: "GenShifter Technologies", logo: partnerGenshifter },
  { name: "Alikore", logo: partnerAlikore },
  { name: "Conshifter Africa Alliance", logo: partnerConshifter },
  { name: "Kindred Hospitals", logo: partnerKindred },
];

export default function Partners() {
  return (
    <PageShell
      eyebrow="Partnership strategy"
      title="Multi-sector collaboration."
      intro="Strong partnerships with government, private sector, academia, and development actors to strengthen program design and delivery."
    >
      {/* Ribbon */}
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Categories", v: `${categories.length} sectors` },
          { k: "Model", v: "Co-designed" },
          { k: "Accountability", v: "Documented" },
          { k: "Growth", v: "Deep, not shallow" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <section>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Who we collaborate with</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Seven partnership categories</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => (
            <article
              key={cat.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="h-1 w-full" style={{ background: cat.accent }} aria-hidden />
              <div className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: cat.accent }}>
                  <cat.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-3 font-heading text-sm font-semibold text-foreground leading-snug">{cat.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Partners marquee */}
      <section className="mt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">Who we work with</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground">Our partners</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            We collaborate with organizations committed to community-led development and youth opportunity.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card py-8">
          <div className="animate-marquee flex w-max items-center gap-16 lg:gap-24">
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="flex h-32 w-64 shrink-0 items-center justify-center px-4">
                <img src={partner.logo} alt={partner.name} className="max-h-28 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
