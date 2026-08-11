import api from "@/lib/api";

export interface MediaItem {
  id: string;
  filename?: string;
  name?: string;
  altText?: string;
  alt_text?: string;
  url: string;
  mimeType?: string;
  fileType?: string;
  file_type?: string;
  size?: number;
  fileSize?: number;
  file_size?: number;
  createdAt?: string;
  created_at?: string;
}

export const mediaService = {
  async listMedia(): Promise<MediaItem[]> {
    const res = await api.get("/admin/media");
    return res.data.data;
  },

  async uploadMedia(file: File, name?: string, altText?: string): Promise<MediaItem> {
    const formData = new FormData();
    formData.append("file", file);
    if (name) formData.append("name", name);
    if (altText) formData.append("altText", altText);

    const res = await api.post("/admin/media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },

  async deleteMedia(id: string) {
    const res = await api.delete(`/admin/media/${id}`);
    return res.data;
  },
};
