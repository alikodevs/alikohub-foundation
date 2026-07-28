import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Send } from "lucide-react";
import { foundation } from "@/config/foundation";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

import foundationLogo from "@/assets/alikohub-foundation-logo.png";

const footerNav = {
  Foundation: [
    { label: "About", href: "/about" },
    { label: "Governance", href: "/governance" },
    { label: "Ethics & Safeguarding", href: "/ethics" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
  ],
  "What We Deliver": [
    { label: "Programs", href: "/programs" },
    { label: "Where We Work", href: "/where-we-work" },
    { label: "Impact", href: "/impact" },
    { label: "Stories & Insights", href: "/stories" },
    { label: "Sustainability", href: "/sustainability" },
  ],
  Transparency: [
    { label: "Annual Report", href: "/annual-report" },
    { label: "Financials", href: "/financials" },
    { label: "Transparency", href: "/transparency" },
    { label: "FAQ", href: "/faq" },
  ],
  Engage: [
    { label: "Donate", href: "/donate" },
    { label: "Partnerships", href: "/partnership" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.trim().toLowerCase(),
      source_page: typeof window !== "undefined" ? window.location.pathname : null,
    });

    setSubmitting(false);

    if (error) {
      const alreadySubscribed = error.code === "23505";
      toast({
        title: alreadySubscribed ? "You're already subscribed" : "Subscription failed",
        description: alreadySubscribed
          ? "This email is already on our list. Thank you for your interest."
          : "Please try again in a moment, or email us directly.",
        variant: alreadySubscribed ? "default" : "destructive",
      });
      if (alreadySubscribed) setEmail("");
      return;
    }

    toast({
      title: "You're on the list",
      description: "Thanks for subscribing. We'll share program updates a few times a year.",
    });
    setEmail("");
  };


  return (
    <footer
      id="contact"
      className="border-t border-white/10 text-white"
      style={{ background: "var(--gradient-navy)" }}
    >
      {/* Newsletter band */}
      <div className="container mx-auto px-6 pt-12">
        <div className="grid gap-6 rounded-2xl border border-white/10 border-l-4 border-l-[hsl(var(--amber))] bg-white/[0.06] px-6 py-8 md:grid-cols-2 md:items-center md:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--amber))]">
              Newsletter
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
              Stay informed on our work
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
              A short, honest update on programs, learning, and opportunities. A few emails a year. No spam.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <Input
              id="footer-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 shrink-0 bg-[hsl(var(--amber))] text-[hsl(var(--navy))] hover:bg-[hsl(var(--amber))]/90"
            >
              <Send className="mr-2 h-4 w-4" aria-hidden />
              {submitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>


      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <img
              src={foundationLogo}
              alt="AlikoHub Foundation"
              className="h-24 w-auto object-contain"
            />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              {foundation.mission}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/75">
              <li>
                <a
                  href={`mailto:${foundation.contactEmail}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {foundation.contactEmail}
                </a>
              </li>
              {foundation.primaryLocations.map((loc) => (
                <li key={loc} className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden /> {loc}
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerNav).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                {title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-3 px-6 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {foundation.legalName}. All rights reserved.
          </p>
          <p className="text-white/70">
            A 501(c)(3) nonprofit organization.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/cookies" className="hover:text-white">
              Cookies
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
            <Link to="/ethics" className="hover:text-white">
              Ethics
            </Link>
            <Link to="/faq" className="hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
