import { PageShell } from "@/components/foundation/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";
import { foundation } from "@/config/foundation";
import { usePublicFaqs } from "@/hooks/useCms";

const catAccent: Record<string, string> = {
  About: "hsl(var(--trust-blue))",
  Support: "hsl(var(--amber))",
  Accountability: "hsl(160,55%,42%)",
  Contact: "hsl(280,45%,55%)",
};

export default function FAQ() {
  const { data: dbFaqs, isLoading } = usePublicFaqs();

  const faqs = (dbFaqs || []).map((item: Record<string, unknown>) => ({
    cat: (item.category as string) || "About",
    q: (item.question as string) || "Untitled Question",
    a: (item.answer as string) || "",
  }));

  const categoriesCount = new Set(faqs.map((f) => f.cat)).size;


  return (
    <PageShell
      eyebrow="Help"
      title="Frequently Asked Questions"
      intro="Answers to the questions we hear most often from partners, donors, participants, and community members."
    >
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:inline-grid sm:w-fit">
        {[
          { k: "Questions", v: `${faqs.length} answered` },
          { k: "Categories", v: `${categoriesCount} topics` },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className="mt-1 font-heading text-sm font-bold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={`${f.q}-${i}`}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <AccordionTrigger className="px-5 py-4 text-left hover:no-underline">
                <div className="flex flex-1 items-start gap-3 text-left">
                  <span
                    className="mt-1 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                    style={{ background: catAccent[f.cat] || "hsl(var(--trust-blue))" }}
                  >
                    {f.cat}
                  </span>
                  <span className="font-heading text-sm font-semibold text-foreground">{f.q}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[hsl(var(--trust-blue))]/25 bg-[hsl(var(--warm-surface))] p-5">
          <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--trust-blue))]" aria-hidden />
          <div className="text-sm text-foreground">
            Don&rsquo;t see your question?{" "}
            <a
              href={`mailto:${foundation.contactEmail}?subject=FAQ%20question`}
              className="inline-flex items-center gap-1 font-semibold text-[hsl(var(--trust-blue))] hover:underline"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden /> Email us
            </a>{" "}
            and we&rsquo;ll respond personally.
          </div>
        </div>
      </div>
    </PageShell>
  );
}

