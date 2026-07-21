import { foundation } from "@/config/foundation";

/**
 * Legal separation strip — appears in the footer and About page to make
 * the Foundation's independence from AlikoHub LLC unambiguous.
 */
export function LegalSeparationStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-label="Legal identity and separation"
      className={compact ? "border-y border-white/10 bg-white/[0.03] py-4" : "bg-secondary py-10"}
    >
      <div className="container mx-auto px-6">
        <p
          className={
            compact
              ? "text-xs leading-relaxed text-white/70"
              : "mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted-foreground"
          }
        >
          <span className={compact ? "font-semibold text-white" : "font-semibold text-foreground"}>
            Legal identity: 
          </span>
          {foundation.separationStatement}
        </p>
      </div>
    </section>
  );
}
