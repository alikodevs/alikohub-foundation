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
  seo?: {
    title?: string;
    description?: string;
    path?: string;
  };
}

export function PageShell({ title, intro, eyebrow, children, seo }: PageShellProps) {
  const location = useLocation();
  const seoTitle = seo?.title ?? `${title} — ${foundation.legalName}`;
  const seoDescription =
    seo?.description ?? intro ?? foundation.mission;
  const seoPath = seo?.path ?? location.pathname;

  return (
    <div className="min-h-screen bg-background">
      <Seo title={seoTitle} description={seoDescription} path={seoPath} />
      <Navbar />
      <header className="border-b border-border bg-secondary/60">
        <div className="container mx-auto px-6 py-16 lg:py-20">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
      </header>
      <main className="container mx-auto px-6 py-16">{children}</main>
      <Footer />
    </div>
  );
}

// Retired for public launch. Inert export preserves existing imports.
export function InDevelopmentNote(_props: { note?: string }) {
  return null;
}
