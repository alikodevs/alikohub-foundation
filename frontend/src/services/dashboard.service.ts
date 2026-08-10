import api from "@/lib/api";

export interface DashboardData {
  counts: {
    heroContent: number;
    teamMembers: number;
    services: number;
    programs: number;
    mediaLibrary: number;
    newInquiries: number;
    crmContacts: number;
    prospectDeals: number;
    openTasks: number;
    newsletterSubscribed: number;
  };
  raised: number;
  activities: Array<Record<string, unknown>>;
}

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    const res = await api.get("/admin/dashboard");
    return res.data.data;
  },
};
