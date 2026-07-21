import { foundation } from "@/config/foundation";
import { StatusAwareCTA } from "./StatusAwareCTA";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/foundation-hero.jpg";

export function FoundationHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container mx-auto grid gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {foundation.legalName}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Turning resourcefulness into{" "}
            <span className="text-primary">lasting opportunity.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {foundation.mission}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <StatusAwareCTA size="lg" />
            <Button asChild size="lg" variant="outline">
              <Link to="/programs">
                Explore Our Work
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Starting in {foundation.primaryLocations.join(" and ")}.
          </p>
        </div>

        <div className="relative">
          <div
            className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-card-hover)]"
          >
            <img
              src={heroImage}
              alt="Community members in East Africa collaborating on a solar and agriculture project at sunset."
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden max-w-xs rounded-xl border border-border bg-background/95 p-4 shadow-[var(--shadow-card)] backdrop-blur md:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Our promise
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              Design with communities. Report honestly. Scale what works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
