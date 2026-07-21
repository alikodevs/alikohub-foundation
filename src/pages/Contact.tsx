import { PageShell } from "@/components/foundation/PageShell";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import { foundation } from "@/config/foundation";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch."
      intro="We welcome inquiries from prospective partners, community organizations, media, and volunteers. Choose the reason that best fits your message."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr,320px]">
        <section aria-labelledby="inquiry-form-heading">
          <h2 id="inquiry-form-heading" className="sr-only">
            Send us a message
          </h2>
          <InquiryForm sourcePage="/contact" />
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Direct email
            </h2>
            <a
              href={`mailto:${foundation.contactEmail}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {foundation.contactEmail}
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Prefer email? Write to us directly and we will route your message internally.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Where we operate
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {foundation.primaryLocations.map((l) => (
                <li key={l} className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden /> {l}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
