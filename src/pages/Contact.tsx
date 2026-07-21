import { PageShell } from "@/components/foundation/PageShell";
import { foundation } from "@/config/foundation";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch."
      intro="We welcome inquiries from prospective partners, community organizations, media, and volunteers."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">General inquiries</h2>
          <a
            href={`mailto:${foundation.contactEmail}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {foundation.contactEmail}
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            A structured contact form with categories (partnership, media, volunteer, general) will
            replace this simple listing once accessible-form patterns are approved.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Where we operate</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {foundation.primaryLocations.map((l) => (
              <li key={l} className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden /> {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
