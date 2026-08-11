import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  GraduationCap,
  FileImage,
  Inbox,
  Handshake,
  HeartHandshake,
  Mail,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { formatCurrency, formatDate, titleCase, type CrmActivity } from "@/hooks/useCrm";

import { useAdminDashboard } from "@/hooks/useDashboard";

export default function AdminDashboard() {
  const { data: dashboardData, isLoading } = useAdminDashboard();

  const data = dashboardData
    ? {
        team: dashboardData.counts?.teamMembers ?? 0,
        services: dashboardData.counts?.services ?? 0,
        programs: dashboardData.counts?.programs ?? 0,
        media: dashboardData.counts?.mediaLibrary ?? 0,
        inquiriesNew: dashboardData.counts?.newInquiries ?? 0,
        openDeals: dashboardData.counts?.prospectDeals ?? 0,
        subscribers: dashboardData.counts?.newsletterSubscribed ?? 0,
        raised: dashboardData.raised ?? 0,
        activities: (dashboardData.activities ?? []) as unknown as CrmActivity[],
      }
    : null;

  const crmCards = [
    {
      title: "New inquiries",
      value: data?.inquiriesNew ?? 0,
      icon: Inbox,
      link: "/admin/inquiries",
    },
    { title: "Prospects", value: data?.openDeals ?? 0, icon: Handshake, link: "/admin/pipeline" },
    {
      title: "Total raised",
      value: formatCurrency(data?.raised ?? 0),
      icon: HeartHandshake,
      link: "/admin/donations",
    },
    { title: "Subscribers", value: data?.subscribers ?? 0, icon: Mail, link: "/admin/audience" },
  ];

  const contentCards = [
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                        <Badge variant="secondary">
                          {titleCase(activity.activity_type || (activity as unknown as Record<string, string>).activityType || "activity")}
                        </Badge>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDate(activity.occurred_at || (activity as unknown as Record<string, string>).occurredAt || (activity as unknown as Record<string, string>).createdAt || null)}
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
