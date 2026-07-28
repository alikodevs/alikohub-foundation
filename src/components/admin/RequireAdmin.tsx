import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

/**
 * Route-level guard. Prevents admin pages (and their data queries)
 * from mounting at all until the session is resolved and the user is an admin.
 *
 * One-time bootstrap: while the project has no administrator at all, the first
 * signed-in account that opens the dashboard claims the owner role. Once an
 * administrator exists the database function refuses every further request.
 */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isLoading, isAdmin, refreshRole } = useAuth();
  const location = useLocation();
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (isLoading || !user || isAdmin) return;
    let cancelled = false;
    setClaiming(true);
    (async () => {
      const { data } = await supabase.rpc("claim_first_admin");
      if (data === true) await refreshRole();
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

