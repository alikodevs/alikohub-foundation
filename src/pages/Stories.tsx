import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";

export default function Stories() {
  return (
    <PageShell
      eyebrow="Stories & Insights"
      title="Human stories. Practical insights."
      intro="We will publish stories, program notes, and research summaries as they are produced with community consent."
    >
      <InDevelopmentNote note="No stories are published yet. This page will populate as fieldwork, partnerships, and community narratives become available with proper consent." />
    </PageShell>
  );
}
