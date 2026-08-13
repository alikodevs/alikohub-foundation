import api from "@/lib/api";

export interface InquiryDTO {
  inquiryType: "partnership" | "volunteer" | "media" | "general" | string;
  name: string;
  email: string;
  organization?: string;
  message: string;
  sourcePage?: string;
}

export interface NewsletterSubscribeDTO {
  email: string;
  source?: string;
}

export const publicService = {
  async createInquiry(data: InquiryDTO) {
    const res = await api.post("/inquiries", data);
    return res.data;
  },

  async subscribeNewsletter(data: NewsletterSubscribeDTO) {
    const res = await api.post("/subscribers", data);
    return res.data;
  },

  async unsubscribeNewsletter(email: string) {
    const res = await api.patch("/subscribers/unsubscribe", { email });
    return res.data;
  },

  async getSubscriberStatus(token: string) {
    const res = await api.get(`/subscribers/status/${encodeURIComponent(token)}`);
    return res.data;
  },

  async getActiveHero() {
    const res = await api.get("/public/hero");
    return res.data.data;
  },

  async getActiveTeam() {
    const res = await api.get("/public/team");
    return res.data.data;
  },

  async getActiveServices() {
    const res = await api.get("/public/services");
    return res.data.data;
  },

  async getActivePrograms() {
    const res = await api.get("/public/programs");
    return res.data.data;
  },

  async getActiveStories() {
    const res = await api.get("/public/stories");
    return res.data.data;
  },

  async getActiveInsights() {
    const res = await api.get("/public/insights");
    return res.data.data;
  },

  async getActiveResources() {
    const res = await api.get("/public/resources");
    return res.data.data;
  },

  async getActiveFaqs() {
    const res = await api.get("/public/faqs");
    return res.data.data;
  },
};

