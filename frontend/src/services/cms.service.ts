import api from "@/lib/api";

export const cmsService = {
  // Admin Hero
  async listHero() {
    const res = await api.get("/admin/hero");
    return res.data.data;
  },

  async createHero(data: Record<string, unknown>) {
    const res = await api.post("/admin/hero", data);
    return res.data.data;
  },

  async updateHero(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/hero/${id}`, data);
    return res.data.data;
  },

  async deleteHero(id: string) {
    const res = await api.delete(`/admin/hero/${id}`);
    return res.data;
  },

  // Admin Board
  async listBoard() {
    const res = await api.get("/admin/board");
    return res.data.data;
  },

  async createBoard(data: Record<string, unknown>) {
    const res = await api.post("/admin/board", data);
    return res.data.data;
  },

  async updateBoard(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/board/${id}`, data);
    return res.data.data;
  },

  async deleteBoard(id: string) {
    const res = await api.delete(`/admin/board/${id}`);
    return res.data;
  },

  // Admin Staff
  async listStaff() {
    const res = await api.get("/admin/staff");
    return res.data.data;
  },

  async createStaff(data: Record<string, unknown>) {
    const res = await api.post("/admin/staff", data);
    return res.data.data;
  },

  async updateStaff(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/staff/${id}`, data);
    return res.data.data;
  },

  async deleteStaff(id: string) {
    const res = await api.delete(`/admin/staff/${id}`);
    return res.data;
  },

  // Admin Team (legacy alias to staff)
  async listTeam() {
    const res = await api.get("/admin/staff");
    return res.data.data;
  },

  async createTeam(data: Record<string, unknown>) {
    const res = await api.post("/admin/staff", data);
    return res.data.data;
  },

  async updateTeam(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/staff/${id}`, data);
    return res.data.data;
  },

  async deleteTeam(id: string) {
    const res = await api.delete(`/admin/staff/${id}`);
    return res.data;
  },

  // Admin Services
  async listServices() {
    const res = await api.get("/admin/services");
    return res.data.data;
  },

  async createService(data: Record<string, unknown>) {
    const res = await api.post("/admin/services", data);
    return res.data.data;
  },

  async updateService(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/services/${id}`, data);
    return res.data.data;
  },

  async deleteService(id: string) {
    const res = await api.delete(`/admin/services/${id}`);
    return res.data;
  },

  // Admin Programs
  async listPrograms() {
    const res = await api.get("/admin/programs");
    return res.data.data;
  },

  async createProgram(data: Record<string, unknown>) {
    const res = await api.post("/admin/programs", data);
    return res.data.data;
  },

  async updateProgram(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/programs/${id}`, data);
    return res.data.data;
  },

  async deleteProgram(id: string) {
    const res = await api.delete(`/admin/programs/${id}`);
    return res.data;
  },

  // Admin Stories
  async listStories() {
    const res = await api.get("/admin/stories");
    return res.data.data;
  },

  async createStory(data: Record<string, unknown>) {
    const res = await api.post("/admin/stories", data);
    return res.data.data;
  },

  async updateStory(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/stories/${id}`, data);
    return res.data.data;
  },

  async deleteStory(id: string) {
    const res = await api.delete(`/admin/stories/${id}`);
    return res.data;
  },

  // Admin Resources
  async listResources() {
    const res = await api.get("/admin/resources");
    return res.data.data;
  },

  async createResource(data: Record<string, unknown>) {
    const res = await api.post("/admin/resources", data);
    return res.data.data;
  },

  async updateResource(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/resources/${id}`, data);
    return res.data.data;
  },

  async deleteResource(id: string) {
    const res = await api.delete(`/admin/resources/${id}`);
    return res.data;
  },

  // Admin FAQs
  async listFaqs() {
    const res = await api.get("/admin/faqs");
    return res.data.data;
  },

  async createFaq(data: Record<string, unknown>) {
    const res = await api.post("/admin/faqs", data);
    return res.data.data;
  },

  async updateFaq(id: string, data: Record<string, unknown>) {
    const res = await api.patch(`/admin/faqs/${id}`, data);
    return res.data.data;
  },

  async deleteFaq(id: string) {
    const res = await api.delete(`/admin/faqs/${id}`);
    return res.data;
  },
};

