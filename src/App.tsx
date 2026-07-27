import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Partnership = lazy(() => import("./pages/Partnership"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Foundation pages
const Impact = lazy(() => import("./pages/Impact"));
const WhereWeWork = lazy(() => import("./pages/WhereWeWork"));
const Stories = lazy(() => import("./pages/Stories"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Resources = lazy(() => import("./pages/Resources"));
const Transparency = lazy(() => import("./pages/Transparency"));
const Contact = lazy(() => import("./pages/Contact"));
const Governance = lazy(() => import("./pages/Governance"));
const Ethics = lazy(() => import("./pages/Ethics"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const AnnualReport = lazy(() => import("./pages/AnnualReport"));
const Financials = lazy(() => import("./pages/Financials"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Press = lazy(() => import("./pages/Press"));
const Donate = lazy(() => import("./pages/Donate"));
const Careers = lazy(() => import("./pages/Careers"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Hubs = lazy(() => import("./pages/Hubs"));
const Partners = lazy(() => import("./pages/Partners"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminHero = lazy(() => import("./pages/admin/AdminHero"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminPrograms = lazy(() => import("./pages/admin/AdminPrograms"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/partnership" element={<Partnership />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Foundation pages */}
                <Route path="/impact" element={<Impact />} />
                <Route path="/where-we-work" element={<WhereWeWork />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/ethics" element={<Ethics />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/annual-report" element={<AnnualReport />} />
                <Route path="/financials" element={<Financials />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/press" element={<Press />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/hubs" element={<Hubs />} />
                <Route path="/partners" element={<Partners />} />

                
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/hero" element={<AdminHero />} />
                <Route path="/admin/team" element={<AdminTeam />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/programs" element={<AdminPrograms />} />
                <Route path="/admin/media" element={<AdminMedia />} />
                <Route path="/admin/inquiries" element={<AdminInquiries />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
