import { PageShell } from "@/components/foundation/PageShell";
import { Card } from "@/components/ui/card";
import { Eye, Keyboard, Type, Ear, Mail } from "lucide-react";
import { foundation } from "@/config/foundation";

const commitments = [
  { icon: Eye, title: "Perceivable", body: "Sufficient color contrast, scalable text, alt text on informative images, and captions on video content where possible." },
  { icon: Keyboard, title: "Operable", body: "Keyboard-navigable menus, visible focus states, skip-to-content link, and no keyboard traps." },
  { icon: Type, title: "Understandable", body: "Plain-language copy, consistent navigation, descriptive links, and labeled form controls." },
  { icon: Ear, title: "Robust", body: "Semantic HTML and ARIA where appropriate so assistive technologies can interpret our pages reliably." },
];

export default function Accessibility() {
  return (
    <PageShell
      eyebrow="Accessibility"
      title="Accessibility statement"
      intro="AlikoHub Foundation is committed to making our website usable for the widest possible audience, including people with disabilities."
      seo={{
        title: "Accessibility — AlikoHub Foundation",
        description:
          "Read the AlikoHub Foundation accessibility statement, our WCAG 2.1 AA target, and how to request accommodations or report an issue.",
      }}
    >
      <section className="mb-10">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. Accessibility is a continuous
          effort, and we welcome feedback that helps us improve.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Our commitments</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {commitments.map((c) => (
            <Card key={c.title} className="p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))] text-white">
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Known limitations</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Some third-party embeds, archival PDFs, or user-generated content may not yet meet our accessibility target. We are
          working to remediate these where practical and to provide accessible alternatives on request.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-8">
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Report an issue or request an accommodation</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          If you experience a barrier on our website or need information in an alternative format, please contact us. We aim to
          acknowledge accessibility requests within five business days.
        </p>
        <a
          href={`mailto:${foundation.contactEmail}?subject=Accessibility%20request`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--trust-blue))] hover:underline"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {foundation.contactEmail}
        </a>
      </section>
    </PageShell>
  );
}
