import { PageShell } from "@/components/foundation/PageShell";
import {
  Landmark,
  Building2,
  GraduationCap,
  Globe,
  Users,
  Lightbulb,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

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

// Triple the list so the seamless loop is wide enough for any viewport
const marqueeItems = [...partners, ...partners, ...partners];

export default function Partners() {
  return (
    <PageShell
      eyebrow="Partnership strategy"
      title="Multi-sector collaboration."
      intro="Strong partnerships with government, private sector, academia, and development actors to strengthen program design and delivery."
    >

      {/* ── Partner carousel — logo showcase ──────────────────────────────────── */}
      <section aria-labelledby="partners-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Who we work with
        </p>
        <h2
          id="partners-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          Our partners
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          We collaborate with organizations committed to community-led
          development and youth opportunity.
        </p>

        {/* Carousel: bordered logo panels, continuous right-to-left scroll */}
        <div
          className="relative mt-8 overflow-hidden"
          aria-label="Partner logo carousel"
        >
          {/* Fade masks — left and right */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
            aria-hidden
          />

          {/* Scrolling strip */}
          <div className="animate-marquee flex w-max items-stretch gap-3 py-2">
            {marqueeItems.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex h-28 w-52 shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-5 transition-colors hover:bg-[hsl(var(--warm-surface))]"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 max-w-full object-contain"
                />
                <p className="text-center text-[10px] font-medium leading-tight text-muted-foreground">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership ecosystem — connected icon layout ─────────────────────── */}
      {/*
        Reference 2 style: icons above a horizontal line, dot on the line,
        label below. NOT a process — these are categories, so no numbering.
        Desktop: horizontal connected layout.
        Mobile: clean vertical list with left connector.
      */}
      <section className="mt-20" aria-labelledby="categories-heading">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
          Who we collaborate with
        </p>
        <h2
          id="categories-heading"
          className="mt-2 font-heading text-2xl font-semibold text-foreground"
        >
          Seven partnership categories
        </h2>

        {/* ── Desktop: horizontal timeline ── */}
        <div className="mt-10 hidden lg:block" aria-hidden={false}>
          <div className="grid grid-cols-7">
            {categories.map((cat, i) => (
              <div key={cat.title} className="flex flex-col items-center">

                {/* Icon circle — above the line */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-card"
                >
                  <cat.icon
                    className="h-6 w-6"
                    style={{ color: cat.accent }}
                    aria-hidden
                  />
                </div>

                {/* Connector row: line segments + dot */}
                <div className="relative mt-4 flex w-full items-center justify-center">
                  {/* Left segment (all except first) */}
                  {i !== 0 && (
                    <div
                      className="absolute right-1/2 left-0 h-px bg-border"
                      aria-hidden
                    />
                  )}
                  {/* Right segment (all except last) */}
                  {i !== categories.length - 1 && (
                    <div
                      className="absolute left-1/2 right-0 h-px bg-border"
                      aria-hidden
                    />
                  )}
                  {/* Center dot — sits on top of the line */}
                  <div
                    className="relative z-10 h-3.5 w-3.5 rounded-full ring-2 ring-background"
                    style={{ background: cat.accent }}
                    aria-hidden
                  />
                </div>

                {/* Label — below the line */}
                <p className="mt-4 px-1 text-center text-xs font-semibold leading-snug text-foreground">
                  {cat.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical list with left connector ── */}
        <ul
          className="mt-8 space-y-0 lg:hidden"
          role="list"
          aria-label="Partnership categories"
        >
          {categories.map((cat, i) => (
            <li key={cat.title} className="flex gap-4">
              {/* Left rail: dot + vertical connector */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-border bg-card"
                >
                  <cat.icon
                    className="h-4 w-4"
                    style={{ color: cat.accent }}
                    aria-hidden
                  />
                </div>
                {/* Connector to next item */}
                {i !== categories.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-border" aria-hidden />
                )}
              </div>

              {/* Label */}
              <div className="pb-6 pt-1">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {cat.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Partnership CTA — quiet redirect ─────────────────────────────────── */}
      <div className="mt-14 flex flex-col items-start gap-3 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Interested in partnering with the Foundation?
        </p>
        <Link
          to="/partnership"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-[hsl(var(--trust-blue))] transition-colors hover:bg-[hsl(var(--trust-blue))] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--trust-blue))]"
        >
          Explore partnership pathways{" "}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </PageShell>
  );
}
