import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, LogOut, Settings, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusAwareCTA } from "@/components/foundation/StatusAwareCTA";
import foundationLogo from "@/assets/alikohub-foundation-logo.png";
import { LegalStatusNotice } from "@/components/foundation/LegalStatusNotice";
import { foundation } from "@/config/foundation";

type MegaColumn = { heading: string; links: { label: string; href: string }[] };
type NavItem = {
  label: string;
  href: string;
  blurb?: string;
  columns?: MegaColumn[];
};

const primaryNav: NavItem[] = [
  {
    label: "The Foundation",
    href: "/about",
    blurb:
      "Who we are, how we are governed, and the standards we hold ourselves to as an independent African-rooted foundation.",
    columns: [
      {
        heading: "Identity",
        links: [
          { label: "Origins & mandate", href: "/about" },
          { label: "Board & leadership", href: "/governance" },
          { label: "Ethics & safeguarding", href: "/ethics" },
          { label: "Questions we get asked", href: "/faq" },
        ],
      },
      {
        heading: "Presence",
        links: [
          { label: "Hubs & offices", href: "/hubs" },
          { label: "Work with our team", href: "/careers" },
          { label: "Sustainability commitments", href: "/sustainability" },
          { label: "Reach the Foundation", href: "/contact" },
        ],
      },
      {
        heading: "Accountability",
        links: [
          { label: "How we report", href: "/transparency" },
          { label: "Finances & stewardship", href: "/financials" },
          { label: "Annual review", href: "/annual-report" },
          { label: "Newsroom", href: "/press" },
        ],
      },
    ],
  },
  {
    label: "What We Deliver",
    href: "/programs",
    blurb:
      "Priority areas delivered end to end through the Train, Guide, Connect, Scale model.",
    columns: [
      {
        heading: "Delivery",
        links: [
          { label: "Priority areas", href: "/programs" },
          { label: "Innovation hubs", href: "/hubs" },
          { label: "Toolkits & guides", href: "/resources" },
        ],
      },
      {
        heading: "Evidence",
        links: [
          { label: "Results & targets", href: "/impact" },
          { label: "Places we operate", href: "/where-we-work" },
          { label: "Field stories", href: "/stories" },
        ],
      },
      {
        heading: "Collaborate",
        links: [
          { label: "Institutional partnerships", href: "/partnership" },
          { label: "Who we work with", href: "/partners" },
          { label: "Individual involvement", href: "/get-involved" },
          { label: "Ways to give", href: "/donate" },
        ],
      },
    ],
  },

  { label: "Impact", href: "/impact" },
  { label: "Where We Work", href: "/where-we-work" },
  { label: "Stories & Insights", href: "/stories" },
  { label: "Partnerships", href: "/partnership" },
  { label: "Get Involved", href: "/get-involved" },
];


const utilityNav = [
  { label: "Resources", href: "/resources" },
  { label: "Transparency", href: "/transparency" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];


export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      <LegalStatusNotice />

      {/* Utility bar */}
      <div className="hidden border-b border-border bg-secondary/60 lg:block">
        <div className="container mx-auto flex items-center justify-end gap-6 px-6 py-1.5 text-xs text-muted-foreground">
          {utilityNav.map((l) => (
            <Link key={l.href} to={l.href} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <nav
        className="relative sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl"
        onMouseLeave={() => setOpenMega(null)}
      >
        <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label={`${foundation.legalName} home`}>
            <img
              src={foundationLogo}
              alt="AlikoHub Foundation"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-5 xl:flex">

            {primaryNav.map((link) =>
              link.columns ? (
                <div key={link.href} onMouseEnter={() => setOpenMega(link.label)}>
                  <Link
                    to={link.href}
                    onClick={() => setOpenMega(null)}
                    aria-expanded={openMega === link.label}
                    className={`flex items-center gap-1 py-2 text-sm font-semibold transition-colors hover:text-primary ${
                      isActive(link.href) || openMega === link.label ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${openMega === link.label ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => setOpenMega(null)}
                  className={`py-2 text-sm font-semibold transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>


          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            <StatusAwareCTA size="sm" />
          </div>

          <button
            className="text-foreground xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mega menu (desktop) */}
        <AnimatePresence>
          {openMega && (
            <motion.div
              key={openMega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              onMouseLeave={() => setOpenMega(null)}
              className="absolute inset-x-0 top-full hidden border-b border-border bg-[hsl(var(--warm-surface))] shadow-[var(--shadow-card-hover)] xl:block"
            >
              <div className="container mx-auto grid gap-10 px-6 py-9 lg:grid-cols-[0.85fr_2.4fr]">
                {primaryNav
                  .filter((n) => n.label === openMega)
                  .map((n) => (
                    <div key={n.label} className="contents">
                      <div className="relative rounded-xl border border-border/70 bg-card/70 p-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--trust-blue))]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(var(--trust-blue))]">
                          AlikoHub Foundation
                        </span>
                        <h2 className="mt-3 font-heading text-xl font-bold text-foreground">{n.label}</h2>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{n.blurb}</p>
                        <Link
                          to={n.href}
                          onClick={() => setOpenMega(null)}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--trust-blue))] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[hsl(var(--trust-blue))]/90"
                        >
                          Open {n.label}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                      <div className="grid gap-8 sm:grid-cols-3">
                        {n.columns?.map((col, ci) => (
                          <div key={col.heading} className={ci > 0 ? "sm:border-l sm:border-border/60 sm:pl-8" : ""}>
                            <p className="flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--amber))]" aria-hidden />
                              {col.heading}
                            </p>
                            <ul className="mt-3 space-y-1">
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <Link
                                    to={l.href}
                                    onClick={() => setOpenMega(null)}
                                    className="group flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground/85 transition-colors hover:bg-[hsl(var(--trust-blue))]/8 hover:text-[hsl(var(--trust-blue))]"
                                  >
                                    {l.label}
                                    <ArrowRight
                                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                      aria-hidden
                                    />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>



        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-background xl:hidden"
            >
              <div className="container mx-auto flex flex-col gap-1 px-6 py-6">
                {primaryNav.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isActive(link.href)
                        ? "bg-secondary text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-border pt-2">
                  {utilityNav.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                  {user && isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                    >
                      <Settings className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  {user && (
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  )}
                  <div className="pt-2">
                    <StatusAwareCTA size="default" className="w-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
