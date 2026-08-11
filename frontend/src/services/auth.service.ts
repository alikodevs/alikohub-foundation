import api from "@/lib/api";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    displayName?: string | null;
    roles?: { role: string }[];
    profile?: Record<string, unknown>;
  };
  message?: string;
}

export type AuthUser = AuthResponse["user"];

export const authService = {
  async login(data: LoginDTO): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data);
    return res.data;
  },

  async getMe(): Promise<{ user: AuthResponse["user"] }> {
    const res = await api.get<{ user: AuthResponse["user"] }>("/auth/me");
    return res.data;
  },

  async checkAdmin(): Promise<{ isAdmin: boolean }> {
    const res = await api.get<{ isAdmin: boolean }>("/auth/admin-check");
    return res.data;
  },
};
