import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { authService, AuthUser } from "@/services/auth.service";

export type { AuthUser };

interface AuthContextType {
  user: AuthUser | null;
  session: { token: string } | null;
  isLoading: boolean;
  isAdmin: boolean;
  refreshRole: () => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<{ token: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchMe = useCallback(async () => {
    try {
      const data = await authService.getMe();
      setUser(data.user);
      const admin = data.user?.roles?.some((r: { role: string }) => r.role === "admin") ?? false;
      setIsAdmin(admin);
    } catch {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      setSession(null);
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  const refreshRole = useCallback(async () => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (token) await fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (token) {
      setSession({ token });
      fetchMe().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchMe]);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const data = await authService.signup({ email, password, displayName });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("token", data.token);
      setSession({ token: data.token });
      setUser(data.user);
      const admin = data.user?.roles?.some((r: { role: string }) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      return { error: null };
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Sign up failed";
      return { error: new Error(errorMsg) };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("token", data.token);
      setSession({ token: data.token });
      setUser(data.user);
      const admin = data.user?.roles?.some((r: { role: string }) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      return { error: null };
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Invalid credentials";
      return { error: new Error(errorMsg) };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token");
    setSession(null);
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        refreshRole,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
