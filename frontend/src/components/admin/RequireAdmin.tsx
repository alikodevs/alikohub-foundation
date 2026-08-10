import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import { authService } from "@/services/auth.service";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isLoading, isAdmin, refreshRole } = useAuth();
  const location = useLocation();
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (isLoading || !user || isAdmin) return;
    let cancelled = false;
    setClaiming(true);
    (async () => {
      try {
        await authService.claimFirstAdmin();
        await refreshRole();
      } catch {
        // Ignore claim errors if admin already exists
      }
      if (!cancelled) setClaiming(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoading, user, isAdmin, refreshRole]);

  if (isLoading || claiming) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Access denied</h1>
        <p className="max-w-md text-muted-foreground">
          Your account does not have administrator permissions for the AlikoHub Foundation dashboard.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

