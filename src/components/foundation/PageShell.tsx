import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { foundation } from "@/config/foundation";

interface PageShellProps {
  title: string;
  intro?: string;
  eyebrow?: string;
  children?: ReactNode;
  afterContent?: ReactNode;
  seo?: {
    title?: string;
    description?: string;
    path?: string;
  };
}

export function PageShell({ title, intro, eyebrow, children, afterContent, seo }: PageShellProps) {

  const location = useLocation();
  const seoTitle = seo?.title ?? `${title} — ${foundation.legalName}`;
  const seoDescription =
    seo?.description ?? intro ?? foundation.mission;
  const seoPath = seo?.path ?? location.pathname;

  return (
    <div className="min-h-screen bg-background">
      <Seo title={seoTitle} description={seoDescription} path={seoPath} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[hsl(var(--trust-blue))] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <header
        className="relative overflow-hidden border-b border-border"
        style={{
          background:
            "linear-gradient(120deg, hsl(var(--navy)) 0%, hsl(var(--trust-blue)) 65%, hsl(var(--navy-light)) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, hsl(var(--amber) / 0.28), transparent 50%), radial-gradient(circle at 85% 80%, hsl(var(--trust-blue) / 0.45), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="container relative mx-auto px-6 py-12 lg:py-16">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--amber))]" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">
              {intro}
            </p>
          )}
        </div>
      </header>
      <main id="main-content" className="container mx-auto px-5 py-10 sm:px-6 sm:py-14 lg:py-16">{children}</main>
      {afterContent}
      <Footer />

    </div>
  );
}

// Retired for public launch. Inert export preserves existing imports.
export function InDevelopmentNote(_props: { note?: string }) {
  return null;
}
