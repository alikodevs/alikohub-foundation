import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Leader = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const accents = ["hsl(var(--trust-blue))", "hsl(var(--amber))", "hsl(var(--navy-light))"];

export function LeadershipCarousel({
  eyebrow,
  title,
  people,
}: {
  eyebrow: string;
  title: string;
  people: readonly Leader[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[hsl(var(--amber))]/40 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">{eyebrow}</p>
          <h2
            id={title.replace(/\s+/g, "-").toLowerCase()}
            className="mt-2 font-heading text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Previous profiles"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-[hsl(var(--trust-blue))] hover:text-[hsl(var(--trust-blue))] disabled:opacity-35"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Next profiles"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-[hsl(var(--trust-blue))] hover:text-[hsl(var(--trust-blue))] disabled:opacity-35"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={sync}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {people.map((m, i) => {
          const accent = accents[i % accents.length];
          return (
            <li
              key={m.name}
              className="group w-[270px] shrink-0 snap-start sm:w-[300px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[hsl(var(--warm-surface))]">
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}, ${m.role}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-1.5"
                  style={{ background: accent }}
                  aria-hidden
                />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{m.name}</h3>
              <p className="mt-0.5 text-sm font-medium" style={{ color: accent }}>
                {m.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
