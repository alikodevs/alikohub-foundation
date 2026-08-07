import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { settingsService, NotificationSettings } from "@/services/settings.service";
import { toast } from "sonner";

export type { NotificationSettings };

export function useNotificationSettings() {
  return useQuery({
    queryKey: ["admin-notification-settings"],
    queryFn: settingsService.getNotificationSettings,
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<NotificationSettings>) => settingsService.updateNotificationSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notification-settings"] });
      toast.success("Notification settings saved successfully");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to update settings"),
  });
}
