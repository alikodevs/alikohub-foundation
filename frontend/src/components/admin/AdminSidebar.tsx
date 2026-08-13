import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GraduationCap,
  FileImage,
  Inbox,
  LogOut,
  Home,
  Handshake,
  HeartHandshake,
  Building2,
  Settings,
  BookOpen,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import alikohubLogo from "@/assets/alikohub-logo.png";

const contentItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Team Members", url: "/admin/team", icon: Users },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Programs", url: "/admin/programs", icon: GraduationCap },
  { title: "Stories & Insights", url: "/admin/stories", icon: BookOpen },
  { title: "Resources", url: "/admin/resources", icon: FileText },
  { title: "FAQs", url: "/admin/faqs", icon: HelpCircle },
  { title: "Media Library", url: "/admin/media", icon: FileImage },
];


const crmItems = [
  { title: "Inquiries", url: "/admin/inquiries", icon: Inbox },
  { title: "Pipeline", url: "/admin/pipeline", icon: Handshake },
  { title: "Donations", url: "/admin/donations", icon: HeartHandshake },
  { title: "Audience", url: "/admin/audience", icon: Building2 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];


export function AdminSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <Link to="/admin" className="flex items-center gap-2">
          <img src={alikohubLogo} alt="AlikoHub" className="h-8" />
          {!collapsed && <span className="font-semibold text-foreground">Admin</span>}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {[
          { label: "Content Management", items: contentItems },
          { label: "CRM", items: crmItems },
        ].map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>


      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                {!collapsed && <span>View Site</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut}>
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
