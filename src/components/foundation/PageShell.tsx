import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

interface PageShellProps {
  title: string;
  intro?: string;
  eyebrow?: string;
  children?: ReactNode;
  seo?: {
    title: string;
    description: string;
    path: string;
  };
}

export function PageShell({ title, intro, eyebrow, children, seo }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {seo && <Seo title={seo.title} description={seo.description} path={seo.path} />}
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

export function InDevelopmentNote({ note }: { note?: string }) {
  return (
    <section aria-label="In development" className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-secondary/40 p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        In development
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {note ??
          "This section is being drafted. Content will be published once approved by the Foundation board."}
      </p>
    </section>
  );
}
