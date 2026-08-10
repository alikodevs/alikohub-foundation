import api from "@/lib/api";

export const crmService = {
  // Contacts
  async listContacts() {
    const res = await api.get("/admin/contacts");
    return res.data.data;
  },

  async getContact(id: string) {
    const res = await api.get(`/admin/contacts/${id}`);
    return res.data.data;
  },

  async createContact(data: Record<string, unknown>) {
    const res = await api.post("/admin/contacts", data);
    return res.data.data;
  },

  async updateContact(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/contacts/${id}`, data);
    return res.data.data;
  },

  async deleteContact(id: string) {
    const res = await api.delete(`/admin/contacts/${id}`);
    return res.data;
  },

  // Organizations
  async listOrganizations() {
    const res = await api.get("/admin/organizations");
    return res.data.data;
  },

  async createOrganization(data: Record<string, unknown>) {
    const res = await api.post("/admin/organizations", data);
    return res.data.data;
  },

  async updateOrganization(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/organizations/${id}`, data);
    return res.data.data;
  },

  async deleteOrganization(id: string) {
    const res = await api.delete(`/admin/organizations/${id}`);
    return res.data;
  },

  // Deals
  async listDeals() {
    const res = await api.get("/admin/deals");
    return res.data.data;
  },

  async createDeal(data: Record<string, unknown>) {
    const res = await api.post("/admin/deals", data);
    return res.data.data;
  },

  async updateDeal(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/deals/${id}`, data);
    return res.data.data;
  },

  async deleteDeal(id: string) {
    const res = await api.delete(`/admin/deals/${id}`);
    return res.data;
  },

  // Tasks
  async listTasks() {
    const res = await api.get("/admin/tasks");
    return res.data.data;
  },

  async createTask(data: Record<string, unknown>) {
    const res = await api.post("/admin/tasks", data);
    return res.data.data;
  },

  async updateTask(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/tasks/${id}`, data);
    return res.data.data;
  },

  async deleteTask(id: string) {
    const res = await api.delete(`/admin/tasks/${id}`);
    return res.data;
  },

  // Donations
  async listDonations() {
    const res = await api.get("/admin/donations");
    return res.data.data;
  },

  async createDonation(data: Record<string, unknown>) {
    const res = await api.post("/admin/donations", data);
    return res.data.data;
  },

  async updateDonation(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/donations/${id}`, data);
    return res.data.data;
  },

  async deleteDonation(id: string) {
    const res = await api.delete(`/admin/donations/${id}`);
    return res.data;
  },

  // Activities
  async listActivities(params?: { contactId?: string; dealId?: string; limit?: number }) {
    const res = await api.get("/admin/activities", { params });
    return res.data.data;
  },

  async createActivity(data: Record<string, unknown>) {
    const res = await api.post("/admin/activities", data);
    return res.data.data;
  },
};
