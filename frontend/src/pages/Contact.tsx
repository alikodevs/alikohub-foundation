import { PageShell } from "@/components/foundation/PageShell";
import { InquiryForm } from "@/components/foundation/InquiryForm";
import { foundation } from "@/config/foundation";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Get in touch."
      intro="We welcome inquiries from prospective partners, community organizations, media, and volunteers. Choose the reason that best fits your message."
    >
      {/* Ribbon */}
      <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4 sm:grid-cols-4">
        {[
          { k: "Email", v: foundation.contactEmail, small: true },
          { k: "HQ", v: "Seattle, WA" },
          { k: "Response", v: "Within 3 business days" },
          { k: "Channels", v: "Form · Email · Media" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl bg-[hsl(var(--warm-surface))] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--amber))]">{s.k}</p>
            <p className={`mt-1 font-heading font-bold text-foreground ${s.small ? "text-xs" : "text-sm"}`}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <section aria-labelledby="inquiry-form-heading" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))] text-white">
              <MessageSquare className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 id="inquiry-form-heading" className="font-heading text-lg font-semibold text-foreground">Send us a message</h2>
              <p className="text-xs text-muted-foreground">Every message is read by a member of the Foundation team.</p>
            </div>
          </div>
          <InquiryForm sourcePage="/contact" />
        </section>

        <aside className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="h-1.5 w-full bg-[hsl(var(--trust-blue))]" aria-hidden />
            <div className="p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--trust-blue))]/10 text-[hsl(var(--trust-blue))]">
                <Mail className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">Direct email</h3>
              <a
                href={`mailto:${foundation.contactEmail}`}
                className="mt-2 inline-flex text-sm font-semibold text-[hsl(var(--trust-blue))] hover:underline break-all"
              >
                {foundation.contactEmail}
              </a>
              <p className="mt-3 text-xs text-muted-foreground">Prefer email? Write to us directly and we will route your message internally.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="h-1.5 w-full bg-[hsl(var(--amber))]" aria-hidden />
            <div className="p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--amber))]/15 text-[hsl(var(--amber))]">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">Where we operate</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {foundation.primaryLocations.map((l) => (
                  <li key={l} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--amber))]" aria-hidden />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="h-1.5 w-full bg-[hsl(160,55%,42%)]" aria-hidden />
            <div className="p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(160,55%,42%)]/15 text-[hsl(160,55%,42%)]">
                <Clock className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">Response time</h3>
              <p className="mt-2 text-xs text-muted-foreground">We aim to respond within three business days. Time-sensitive media inquiries are prioritized.</p>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
