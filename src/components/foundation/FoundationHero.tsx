import { foundation } from "@/config/foundation";
import { StatusAwareCTA } from "./StatusAwareCTA";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1800&q=85";

const HERO_STATS = [
  { value: "7", label: "Program areas" },
  { value: "2", label: "Founding regions" },
  { value: "2026", label: "Founded" },
];

export function FoundationHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Ambient wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 15% 20%, hsl(var(--trust-blue) / 0.14), transparent 50%), radial-gradient(circle at 85% 90%, hsl(var(--amber) / 0.12), transparent 55%)",
        }}
      />

      <div className="container relative mx-auto grid gap-10 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[hsl(var(--trust-blue)/0.35)] bg-[hsl(var(--trust-blue)/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--trust-blue))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--amber))]" aria-hidden />
            {foundation.legalName}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turning resourcefulness into{" "}
            <span className="text-[hsl(var(--amber))]">lasting opportunity.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {foundation.mission}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <StatusAwareCTA size="lg" />
            <Button asChild size="lg" variant="outline">
              <Link to="/programs">
                See What We Deliver
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>

          {/* Compact stat ribbon */}
          <dl className="mt-8 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="px-4 py-3 text-center">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 font-heading text-lg font-extrabold text-[hsl(var(--trust-blue))]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-xs text-muted-foreground">
            Starting in {foundation.primaryLocations.join(" and ")}.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-card-hover)]">
            <img
              src={HERO_IMG}
              alt="Young African student smiling in a bright learning environment."
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          {/* Floating promise chip */}
          <div className="absolute -bottom-4 -left-4 hidden max-w-xs rounded-xl border border-border bg-background/95 p-4 shadow-[var(--shadow-card)] backdrop-blur md:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--amber))]">
              Our promise
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              Design with communities. Report honestly. Scale what works.
            </p>
          </div>
          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 hidden rounded-full border border-border bg-[hsl(var(--trust-blue))] px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-card)] md:block">
            Seattle · Addis Ababa
          </div>
        </motion.div>
      </div>
    </section>
  );
}

