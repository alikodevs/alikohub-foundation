import { PageShell } from "@/components/foundation/PageShell";
import { FileText, BarChart3, BookOpen, ShieldCheck, ArrowUpRight } from "lucide-react";
import { foundation } from "@/config/foundation";

const categories = [
  { icon: FileText, title: "Program Briefs", body: "Short summaries of each program area: objectives, delivery model, partners, and expected outcomes.", accent: "hsl(var(--trust-blue))", tag: "Briefs" },
  { icon: BarChart3, title: "Research & Evaluation", body: "Independent evaluations, monitoring reports, and applied research from our hubs and partners.", accent: "hsl(var(--amber))", tag: "Evidence" },
  { icon: BookOpen, title: "Open Curricula", body: "Course outlines and learning materials that partners can adapt for their own communities.", accent: "hsl(160,55%,42%)", tag: "Curricula" },
  { icon: ShieldCheck, title: "Policies & Safeguards", body: "Safeguarding, data protection, code of conduct, and financial governance documents.", accent: "hsl(280,45%,55%)", tag: "Policies" },
];

export default function Resources() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Practical, shareable knowledge."
      intro="Program briefs, evaluations, curricula, and policies for partners, funders, and communities working alongside us."
    >
      <div className="mb-10 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-4">
        {[
          { k: "Libraries", v: "4 collections" },
          { k: "License", v: "Adaptable" },
          { k: "Access", v: "On request" },
          { k: "Language", v: "English (more soon)" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((c) => (
          <article
            key={c.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
          >
            <div className="h-1.5 w-full" style={{ background: c.accent }} aria-hidden />
            <div className="flex gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: c.accent }}>
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-heading text-base font-semibold text-foreground">{c.title}</h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{c.tag}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <a
                  href={`mailto:${foundation.contactEmail}?subject=${encodeURIComponent(`Request: ${c.title}`)}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: c.accent }}
                >
                  Request materials <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
