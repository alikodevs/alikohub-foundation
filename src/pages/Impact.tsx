import { PageShell, InDevelopmentNote } from "@/components/foundation/PageShell";

export default function Impact() {
  return (
    <PageShell
      eyebrow="Impact"
      title="We report what we can verify."
      intro="Impact figures will be published only when they are grounded in documented, community-validated results. We will not display invented counters or unverified claims."
    >
      <InDevelopmentNote note="Once pilot programs are underway, this page will publish outcomes, methodology, learning notes, and honest limitations." />
    </PageShell>
  );
}
