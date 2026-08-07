import { PageShell } from "@/components/foundation/PageShell";

const sections = [
  {
    title: "Scope",
    body: "This policy describes how AlikoHub Foundation collects, uses, and protects information when you visit our website, contact us, participate in our programs, or support our work.",
  },
  {
    title: "Information we collect",
    body: "We collect information you provide directly (such as name, email, and message content when you submit a form), and limited technical information (such as pages visited) to operate and improve the site.",
  },
  {
    title: "How we use information",
    body: "We use information to respond to inquiries, deliver programs, steward donor relationships, meet legal obligations, and improve our services. We do not sell personal information.",
  },
  {
    title: "Sharing",
    body: "We share information only with service providers who help us operate, with partners when necessary to deliver a program you engaged with, or when required by law.",
  },
  {
    title: "Data retention",
    body: "We retain personal information only as long as needed for the purposes described here or as required by law, and apply reasonable safeguards to protect it.",
  },
  {
    title: "Your choices",
    body: "You may request access, correction, or deletion of your personal information by contacting us. You may unsubscribe from any Foundation email at any time.",
  },
  {
    title: "Children",
    body: "Programs involving minors follow additional safeguarding and consent practices. We do not knowingly collect information from children through this website without appropriate consent.",
  },
  {
    title: "Contact",
    body: "Questions about this policy can be sent to info@alikohubfoundation.org.",
  },
];

const Privacy = () => (
  <PageShell
    eyebrow="Legal"
    title="Privacy Policy"
    intro="How AlikoHub Foundation collects, uses, and protects information. We follow a data-minimization approach and treat privacy as a safeguarding responsibility."
  >
    <div className="mx-auto max-w-3xl space-y-8">
      {sections.map((s) => (
        <section key={s.title}>
          <h2 className="font-heading text-xl font-bold text-foreground">{s.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </section>
      ))}
      <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.</p>
    </div>
  </PageShell>
);

export default Privacy;
