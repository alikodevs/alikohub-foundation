import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { foundation } from "@/config/foundation";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";

const footerNav = {
  Foundation: [
    { label: "About", href: "/about" },
    { label: "Governance", href: "/governance" },
    { label: "Transparency", href: "/transparency" },
    { label: "Ethics & Safeguarding", href: "/ethics" },
  ],
  "Our Work": [
    { label: "Programs", href: "/programs" },
    { label: "Where We Work", href: "/where-we-work" },
    { label: "Impact", href: "/impact" },
    { label: "Stories & Insights", href: "/stories" },
  ],
  Engage: [
    { label: "Partnerships", href: "/partnership" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 text-white"
      style={{ background: "var(--gradient-navy)" }}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 font-heading text-lg font-bold text-white">
                A
              </span>
              <div className="leading-tight">
                <div className="font-heading text-base font-bold text-white">AlikoHub</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                  Foundation
                </div>
              </div>
            </div>
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

      <LegalSeparationStrip compact />

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-3 px-6 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {foundation.legalName}. All rights reserved.
          </p>
          <p>
            <span className="font-semibold text-white/80">Status:</span>{" "}
            Washington nonprofit formation and 501(c)(3) recognition pending.
          </p>
          <div className="flex gap-4">
            <Link to="/ethics" className="hover:text-white">
              Ethics
            </Link>
            <Link to="/transparency" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/transparency" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
