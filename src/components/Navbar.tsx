import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, LogOut, Settings } from "lucide-react";
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
import foundationMark from "@/assets/foundation-mark.png";
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
    label: "About",
    href: "/about",
    blurb: "Learn about our origins, how we work, our governance, and our role in expanding opportunity.",
    columns: [
      {
        heading: "About the Foundation",
        links: [
          { label: "Our story", href: "/about" },
          { label: "How we work", href: "/programs" },
          { label: "Governance", href: "/governance" },
          { label: "Frequently asked questions", href: "/faq" },
          { label: "Ethics & safeguarding", href: "/ethics" },
          { label: "News & announcements", href: "/press" },
        ],
      },
      {
        heading: "People & offices",
        links: [
          { label: "Leadership", href: "/governance" },
          { label: "Hubs & offices", href: "/hubs" },
          { label: "Careers", href: "/careers" },
          { label: "Sustainability", href: "/sustainability" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        heading: "Accountability",
        links: [
          { label: "Transparency", href: "/transparency" },
          { label: "Financials", href: "/financials" },
          { label: "Annual report", href: "/annual-report" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
    ],
  },
  {
    label: "Our Work",
    href: "/programs",
    blurb: "Seven priority areas delivered through the Train, Guide, Connect, Scale model.",
    columns: [
      {
        heading: "Programs",
        links: [
          { label: "All program areas", href: "/programs" },
          { label: "Delivery pathways", href: "/programs" },
          { label: "Innovation hubs", href: "/hubs" },
          { label: "Resources & toolkits", href: "/resources" },
        ],
      },
      {
        heading: "Impact",
        links: [
          { label: "Our impact", href: "/impact" },
          { label: "Where we work", href: "/where-we-work" },
          { label: "Stories & insights", href: "/stories" },
        ],
      },
      {
        heading: "Work with us",
        links: [
          { label: "Partnerships", href: "/partnership" },
          { label: "Our partners", href: "/partners" },
          { label: "Get involved", href: "/get-involved" },
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
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label={`${foundation.legalName} home`}>
            <img src={foundationMark} alt="" className="h-10 w-10" width={40} height={40} />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-sm font-bold text-foreground">AlikoHub</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Foundation
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
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
