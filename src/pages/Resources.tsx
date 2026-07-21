import { PageShell } from "@/components/foundation/PageShell";
import { FileText, BarChart3, BookOpen, ShieldCheck } from "lucide-react";

const categories = [
  {
    icon: FileText,
    title: "Program Briefs",
    body: "Short summaries of each program area: objectives, delivery model, partners, and expected outcomes.",
  },
  {
    icon: BarChart3,
    title: "Research & Evaluation",
    body: "Independent evaluations, monitoring reports, and applied research from our hubs and partners.",
  },
  {
    icon: BookOpen,
    title: "Open Curricula",
    body: "Aliko Academy course outlines and learning materials that partners can adapt for their own communities.",
  },
  {
    icon: ShieldCheck,
    title: "Policies & Safeguards",
    body: "Safeguarding, data protection, code of conduct, and financial governance documents.",
  },
];

export default function Resources() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Practical, shareable knowledge."
      intro="Program briefs, evaluations, curricula, and policies for partners, funders, and communities working alongside us."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((c) => (
          <article key={c.title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <c.icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
