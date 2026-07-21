import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Image, Users, Briefcase, GraduationCap, FileImage } from "lucide-react";

interface Stats {
  heroCount: number;
  teamCount: number;
  servicesCount: number;
  programsCount: number;
  mediaCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    heroCount: 0,
    teamCount: 0,
    servicesCount: 0,
    programsCount: 0,
    mediaCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [hero, team, services, programs, media] = await Promise.all([
        supabase.from("hero_content").select("id", { count: "exact" }),
        supabase.from("team_members").select("id", { count: "exact" }),
        supabase.from("services").select("id", { count: "exact" }),
        supabase.from("programs").select("id", { count: "exact" }),
        supabase.from("media_library").select("id", { count: "exact" }),
      ]);

      setStats({
        heroCount: hero.count || 0,
        teamCount: team.count || 0,
        servicesCount: services.count || 0,
        programsCount: programs.count || 0,
        mediaCount: media.count || 0,
      });
    }

    fetchStats();
  }, []);

  const statCards = [
    { title: "Hero Content", count: stats.heroCount, icon: Image, link: "/admin/hero", color: "text-blue-500" },
    { title: "Team Members", count: stats.teamCount, icon: Users, link: "/admin/team", color: "text-green-500" },
    { title: "Services", count: stats.servicesCount, icon: Briefcase, link: "/admin/services", color: "text-purple-500" },
    { title: "Programs", count: stats.programsCount, icon: GraduationCap, link: "/admin/programs", color: "text-orange-500" },
    { title: "Media Files", count: stats.mediaCount, icon: FileImage, link: "/admin/media", color: "text-pink-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your content management dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statCards.map((stat) => (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                to="/admin/hero" 
                className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                Edit Hero Section →
              </Link>
              <Link 
                to="/admin/team" 
                className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                Manage Team Members →
              </Link>
              <Link 
                to="/admin/media" 
                className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                Upload Media →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p>Use this dashboard to manage your website content:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Update hero section text and images</li>
                <li>Add or edit team member profiles</li>
                <li>Manage services and programs</li>
                <li>Upload and organize media files</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
