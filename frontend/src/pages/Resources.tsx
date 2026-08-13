import { PageShell } from "@/components/foundation/PageShell";
import { FileText, BarChart3, BookOpen, ShieldCheck, ArrowUpRight, Download } from "lucide-react";
import { foundation } from "@/config/foundation";
import { usePublicResources } from "@/hooks/useCms";
import { getFullMediaUrl } from "@/lib/utils";

const ACCENT_MAP: Record<string, string> = {
  briefs: "hsl(var(--trust-blue))",
  evidence: "hsl(var(--amber))",
  curricula: "hsl(160,55%,42%)",
  policies: "hsl(280,45%,55%)",
};

const ICON_MAP: Record<string, typeof FileText> = {
  briefs: FileText,
  evidence: BarChart3,
  curricula: BookOpen,
  policies: ShieldCheck,
};

export default function Resources() {
  const { data: dbResources, isLoading } = usePublicResources();

  const resources = (dbResources || []).map((item: Record<string, unknown>, idx: number) => {
    const categoryKey = ((item.category as string) || "").toLowerCase();
    const icon = ICON_MAP[categoryKey] || FileText;
    const accent = (item.accent as string) || ACCENT_MAP[categoryKey] || "hsl(var(--trust-blue))";
    const file = (item.fileUrl as string) || (item.file_url as string);
    const external = (item.externalUrl as string) || (item.external_url as string);
    const directLink = file ? getFullMediaUrl(file) : external || null;

    return {
      icon,
      title: (item.title as string) || "Untitled Resource",
      body: (item.description as string) || "",
      tag: (item.tag as string) || (item.category as string) || "Resource",
      accent,
      link: directLink,
    };
  });


  const collectionsCount = new Set(resources.map((r) => r.tag)).size;

  return (
    <PageShell
      eyebrow="Resources"
      title="Practical, shareable knowledge."
      intro="Program briefs, evaluations, curricula, and policies for partners, funders, and communities working alongside us."
    >
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Resources", v: `${resources.length} items` },
          { k: "Collections", v: `${collectionsCount} categories` },
          { k: "Access", v: "Open / On request" },
          { k: "Language", v: "English" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {resources.map((c, idx) => (
          <article
            key={`${c.title}-${idx}`}
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
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                    style={{ color: c.accent }}
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden /> Download / Access Resource
                  </a>
                ) : (
                  <a
                    href={`mailto:${foundation.contactEmail}?subject=${encodeURIComponent(`Request: ${c.title}`)}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                    style={{ color: c.accent }}
                  >
                    Request materials <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

