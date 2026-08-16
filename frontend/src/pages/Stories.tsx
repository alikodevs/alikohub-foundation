import { PageShell } from "@/components/foundation/PageShell";
import { Users, GraduationCap, Sprout, Mail, Calendar, User } from "lucide-react";
import { foundation } from "@/config/foundation";
import { usePublicStories } from "@/hooks/useCms";
import { getFullMediaUrl } from "@/lib/utils";

const ACCENTS = ["hsl(var(--trust-blue))", "hsl(var(--amber))", "hsl(160,55%,42%)", "hsl(280,45%,55%)"];
const ICONS = [Users, GraduationCap, Sprout];
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80";

export default function Stories() {
  const { data: dbStories, isLoading } = usePublicStories();

  const stories = (dbStories || []).map((item: Record<string, unknown>, idx: number) => {
    const rawImg = (item.imageUrl as string) || (item.image_url as string);
    const icon = ICONS[idx % ICONS.length];
    const accent = ACCENTS[idx % ACCENTS.length];

    return {
      icon,
      title: (item.title as string) || "Untitled Story",
      body: (item.excerpt as string) || (item.body as string) || "",
      image: rawImg ? getFullMediaUrl(rawImg) : FALLBACK_IMAGE,
      accent,
      authorName: (item.authorName as string) || (item.author_name as string) || undefined,
      publishedAt: item.publishedAt
        ? new Date(item.publishedAt as string).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : undefined,
    };
  });


  return (
    <PageShell
      eyebrow="Stories & insights"
      title="Human stories. Practical insights."
      intro="Field reports, program notes, and community narratives from across our hubs, published with consent and grounded in evidence."
    >

      <div className="grid gap-6 md:grid-cols-3">
        {stories.map((t, idx) => (
          <article
            key={`${t.title}-${idx}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={t.image} alt={t.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 45%, ${t.accent} 130%)`, opacity: 0.6 }} aria-hidden />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 backdrop-blur shadow-sm">
                  <t.icon className="h-5 w-5" style={{ color: t.accent }} aria-hidden />
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h2 className="font-heading text-lg font-semibold text-foreground leading-snug">{t.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{t.body}</p>
              </div>
            </div>

            {(t.authorName || t.publishedAt) && (
              <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 mt-4 pt-4">
                {t.authorName && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-primary" />
                    {t.authorName}
                  </span>
                )}
                {t.publishedAt && (
                  <span className="flex items-center gap-1 text-muted-foreground/80">
                    <Calendar className="h-3.5 w-3.5" />
                    {t.publishedAt}
                  </span>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--warm-surface))] p-5">
        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--trust-blue))]" aria-hidden />
        <p className="text-sm text-foreground">
          New stories are published as they are produced with community consent. To be notified,{" "}
          <a href={`mailto:${foundation.contactEmail}?subject=Stories%20updates`} className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
            request updates by email
          </a>.
        </p>
      </div>
    </PageShell>
  );
}

