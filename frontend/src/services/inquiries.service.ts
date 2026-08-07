import api from "@/lib/api";

export const inquiriesService = {
  async listInquiries(status?: string) {
    const res = await api.get("/admin/inquiries", { params: { status: status || undefined } });
    return res.data.data;
  },

  async updateInquiry(id: string, data: { status?: string; adminNotes?: string }) {
    const res = await api.patch(`/admin/inquiries/${id}`, data);
    return res.data.data;
  },
};
