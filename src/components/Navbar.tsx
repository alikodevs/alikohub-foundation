import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Globe, Menu, X, ExternalLink, Sun, Moon, User, LogOut, Settings } from "lucide-react";
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
import alikohubLogo from "@/assets/alikohub-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/programs" },
  { label: "Partnership", href: "/partnership" },
  { label: "Career", href: "https://career.alikohub.com/", external: true },
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

  return (
    <>
      {/* Top bar */}
      <div className="border-b border-border/50 bg-[hsl(var(--navbar-bg))] dark:bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-sm text-[hsl(var(--navbar-fg))] dark:text-muted-foreground">
          <div className="flex items-center gap-6">
            <a href="mailto:info@alikohub.com" className="flex items-center gap-1.5 hover:text-primary transition-colors text-[hsl(var(--navbar-fg))] dark:text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@alikohub.com</span>
            </a>
            <a href="tel:+12063535373" className="flex items-center gap-1.5 hover:text-primary transition-colors text-[hsl(var(--navbar-fg))] dark:text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+1 206 353 5373</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-[hsl(var(--navbar-bg))] dark:bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={alikohubLogo} alt="AlikoHub" className="h-16" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-semibold text-[hsl(var(--navbar-fg))] transition-colors hover:text-primary"
                >
                  {link.label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    location.pathname === link.href ? "text-primary" : "text-[hsl(var(--navbar-fg))]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-navy dark:text-white border-navy/40 dark:border-white/30 hover:bg-navy/10 dark:hover:bg-white/10 font-semibold"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[hsl(var(--navbar-fg))] hover:text-primary">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-[hsl(var(--navbar-fg))] hover:text-primary" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-amber-light shadow-[var(--shadow-amber)]" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[hsl(var(--navbar-fg))]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 lg:hidden bg-[hsl(var(--navbar-bg))]"
            >
              <div className="flex flex-col gap-1 px-6 py-6">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg px-3 py-2.5 text-sm font-semibold text-[hsl(var(--navbar-fg))] hover:text-primary transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:text-primary ${
                        location.pathname === link.href ? "text-primary bg-primary/10" : "text-[hsl(var(--navbar-fg))]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="flex flex-col gap-2 pt-4 border-t border-white/10 mt-2">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[hsl(var(--navbar-fg))] hover:text-primary transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                  
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[hsl(var(--navbar-fg))] hover:text-primary transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => { handleSignOut(); setMobileOpen(false); }}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[hsl(var(--navbar-fg))] hover:text-primary transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className="flex-1 text-[hsl(var(--navbar-fg))]" asChild>
                        <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary text-primary-foreground" asChild>
                        <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
