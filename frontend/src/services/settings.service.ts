import api from "@/lib/api";

export interface NotificationSettings {
  id?: string;
  notificationsEnabled: boolean;
  recipients: string[];
  notifyOnInquiry: boolean;
  notifyOnTask: boolean;
  notifyOnDonation: boolean;
  notifyOnNewsletter: boolean;
  digestFrequency: "instant" | "daily" | "weekly";
}

export const settingsService = {
  async getNotificationSettings(): Promise<NotificationSettings> {
    const res = await api.get("/admin/notification-settings");
    return res.data.data;
  },

  async updateNotificationSettings(data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const res = await api.patch("/admin/notification-settings", data);
    return res.data.data;
  },
};
