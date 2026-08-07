import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: dashboardService.getDashboardData,
    staleTime: 1000 * 60 * 2,
  });
}
