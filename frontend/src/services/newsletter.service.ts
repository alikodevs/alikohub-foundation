import api from "@/lib/api";

export interface ListSubscribersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const newsletterService = {
  async listSubscribers(params?: ListSubscribersParams) {
    const res = await api.get("/admin/subscribers", { params });
    return res.data;
  },

  async updateSubscriberStatus(id: string, status: "active" | "unsubscribed") {
    const res = await api.patch(`/admin/subscribers/${id}/status`, { status });
    return res.data;
  },

  async exportSubscribers(search?: string) {
    const res = await api.get("/admin/subscribers/export", {
      params: { search },
      responseType: "blob",
    });
    return res.data;
  },
};
