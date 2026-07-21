import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";

export default function Resources() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Practical, sharable knowledge."
      intro="Program briefs, policies, research summaries, and open resources will be listed here as they are produced and approved."
    >
      <InDevelopmentNote />
    </PageShell>
  );
}
