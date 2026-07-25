import { PageShell } from "@/components/foundation/PageShell";

const faqs = [
  {
    q: "What does AlikoHub Foundation do?",
    a: "We build pathways for youth through education, workforce development, technology, health, water and sanitation, entrepreneurship, and community resilience programs — designed with the communities we serve.",
  },
  {
    q: "Where does the Foundation work?",
    a: "Our operating base is Seattle, Washington in the United States, with active program work in Ethiopia. We partner globally, but scale is disciplined and community-led.",
  },
  {
    q: "How is the Foundation different from AlikoHub the company?",
    a: "The Foundation is a nonprofit with independent governance, finances, and program accountability. It operates separately from any commercial AlikoHub entity.",
  },
  {
    q: "How can I support the Foundation?",
    a: "You can partner with us, volunteer expertise, or contribute financially. Visit Get Involved or Partnerships to begin a conversation.",
  },
  {
    q: "Is my contribution tax-deductible?",
    a: "AlikoHub Foundation is a 501(c)(3) nonprofit. Contributions are tax-deductible to the fullest extent allowed by law. Consult your tax advisor for your specific situation.",
  },
  {
    q: "How do you measure impact?",
    a: "We define outcomes with communities and partners, collect proportionate data, protect participant privacy, and publish results in our Annual Report and Impact page.",
  },
  {
    q: "How do you protect participant data and safety?",
    a: "Safeguarding is a board-level responsibility. We follow data-minimization, consent, and protection practices described in our Ethics and Privacy pages.",
  },
  {
    q: "How can I contact the Foundation?",
    a: "Email info@alikohubfoundation.org or use the Contact page. Media and partnership inquiries are routed to the appropriate team.",
  },
];

const FAQ = () => (
  <PageShell
    eyebrow="Help"
    title="Frequently Asked Questions"
    intro="Answers to the questions we hear most often from partners, donors, participants, and community members."
  >
    <div className="mx-auto max-w-3xl space-y-4">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all open:shadow-[var(--shadow-card-hover)]"
        >
          <summary className="cursor-pointer list-none font-heading text-base font-bold text-foreground marker:hidden">
            <span className="flex items-start justify-between gap-4">
              <span>{f.q}</span>
              <span className="mt-1 text-[hsl(var(--trust-blue))] transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  </PageShell>
);

export default FAQ;
