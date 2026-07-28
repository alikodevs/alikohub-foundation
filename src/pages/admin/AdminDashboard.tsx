import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Image,
  Users,
  Briefcase,
  GraduationCap,
  FileImage,
  Inbox,
  Contact2,
  Handshake,
  HeartHandshake,
  CheckSquare,
  Mail,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency, formatDate, titleCase, type CrmActivity } from "@/hooks/useCrm";

async function countOf(table: string, filter?: { column: string; value: string }) {
  let query = supabase.from(table as never).select("id", { count: "exact", head: true });
  if (filter) query = query.eq(filter.column, filter.value);
  const { count } = await query;
  return count ?? 0;
}

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const [
        hero,
        team,
        services,
        programs,
        media,
        inquiriesNew,
        contacts,
        openDeals,
        openTasks,
        subscribers,
      ] = await Promise.all([
        countOf("hero_content"),
        countOf("team_members"),
        countOf("services"),
        countOf("programs"),
        countOf("media_library"),
        countOf("foundation_inquiries", { column: "status", value: "new" }),
        countOf("crm_contacts"),
        countOf("crm_deals", { column: "stage", value: "prospect" }),
        countOf("crm_tasks", { column: "status", value: "open" }),
        countOf("newsletter_subscribers", { column: "status", value: "subscribed" }),
      ]);

      const { data: donations } = await supabase.from("crm_donations").select("amount");
      const raised = (donations ?? []).reduce((sum, d) => sum + Number(d.amount), 0);

      const { data: activities } = await supabase
        .from("crm_activities")
        .select("*")
        .order("occurred_at", { ascending: false })
        .limit(8);

      return {
        hero,
        team,
        services,
        programs,
        media,
        inquiriesNew,
        contacts,
        openDeals,
        openTasks,
        subscribers,
        raised,
        activities: (activities ?? []) as CrmActivity[],
      };
    },
  });

  const crmCards = [
    {
      title: "New inquiries",
      value: data?.inquiriesNew ?? 0,
      icon: Inbox,
      link: "/admin/inquiries",
    },
    { title: "Contacts", value: data?.contacts ?? 0, icon: Contact2, link: "/admin/contacts" },
    { title: "Prospects", value: data?.openDeals ?? 0, icon: Handshake, link: "/admin/pipeline" },
    { title: "Open tasks", value: data?.openTasks ?? 0, icon: CheckSquare, link: "/admin/tasks" },
    {
      title: "Total raised",
      value: formatCurrency(data?.raised ?? 0),
      icon: HeartHandshake,
      link: "/admin/donations",
    },
    { title: "Subscribers", value: data?.subscribers ?? 0, icon: Mail, link: "/admin/audience" },
  ];

  const contentCards = [
    { title: "Hero Content", value: data?.hero ?? 0, icon: Image, link: "/admin/hero" },
    { title: "Team Members", value: data?.team ?? 0, icon: Users, link: "/admin/team" },
    { title: "Services", value: data?.services ?? 0, icon: Briefcase, link: "/admin/services" },
    {
      title: "Programs",
      value: data?.programs ?? 0,
      icon: GraduationCap,
      link: "/admin/programs",
    },
    { title: "Media Files", value: data?.media ?? 0, icon: FileImage, link: "/admin/media" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Relationships, pipeline, and website content in one place.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                CRM
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {crmCards.map((stat) => (
                  <Link key={stat.title} to={stat.link}>
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className="h-5 w-5 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Website content
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {contentCards.map((stat) => (
                  <Link key={stat.title} to={stat.link}>
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(data?.activities ?? []).length === 0 ? (
                  <p className="text-muted-foreground">
                    No activity yet. Website form submissions appear here automatically.
                  </p>
                ) : (
                  data!.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">{activity.subject}</p>
                        {activity.body && (
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {activity.body}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <Badge variant="secondary">{titleCase(activity.activity_type)}</Badge>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDate(activity.occurred_at)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
