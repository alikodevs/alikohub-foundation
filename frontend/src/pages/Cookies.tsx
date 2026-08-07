import { PageShell } from "@/components/foundation/PageShell";
import { Card } from "@/components/ui/card";
import { Cookie, BarChart3, Shield, Settings } from "lucide-react";
import { foundation } from "@/config/foundation";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Shield,
    title: "Strictly necessary",
    body: "Enable core site functions such as page navigation, secure areas, and remembering theme preference. These cannot be turned off.",
  },
  {
    icon: BarChart3,
    title: "Analytics (optional)",
    body: "Help us understand which pages resonate and how to improve the site. Aggregated and, where possible, anonymized.",
  },
  {
    icon: Settings,
    title: "Functional (optional)",
    body: "Remember preferences you set, such as language or accessibility settings.",
  },
];

export default function Cookies() {
  return (
    <PageShell
      eyebrow="Cookies"
      title="Cookie policy"
      intro="This page explains how AlikoHub Foundation uses cookies and similar technologies on this website, and the choices you have."
      seo={{
        title: "Cookie Policy — AlikoHub Foundation",
        description:
          "Learn how AlikoHub Foundation uses cookies, the categories in use, and how you can manage your preferences in your browser.",
      }}
    >
      <section className="mb-10">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Cookies are small text files stored on your device when you visit a website. We use a minimal set of cookies to keep
          the site secure, remember your preferences, and understand how the site is used so we can improve it.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Categories of cookies we use</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {categories.map((c) => (
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
        <h2 className="font-heading text-xl font-bold text-[hsl(var(--trust-blue))]">Managing your preferences</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Most browsers let you view, manage, delete, and block cookies. You can usually find these controls under the browser's
          Settings or Preferences menu. Blocking strictly necessary cookies may affect how the site works.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-[hsl(var(--warm-surface))] p-8">
        <div className="flex items-start gap-3">
          <Cookie className="mt-1 h-5 w-5 text-[hsl(var(--amber))]" aria-hidden />
          <div>
            <h2 className="font-heading text-lg font-semibold text-[hsl(var(--trust-blue))]">Related policies</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For details on how we handle personal information, see our{" "}
              <Link to="/privacy" className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
                Privacy Policy
              </Link>
              . Questions? Email{" "}
              <a href={`mailto:${foundation.contactEmail}`} className="font-semibold text-[hsl(var(--trust-blue))] hover:underline">
                {foundation.contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
