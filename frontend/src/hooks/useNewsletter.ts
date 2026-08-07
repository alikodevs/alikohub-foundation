import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newsletterService, ListSubscribersParams } from "@/services/newsletter.service";
import { publicService, NewsletterSubscribeDTO } from "@/services/public.service";
import { toast } from "sonner";

export function useNewsletterSubscribers(params?: ListSubscribersParams) {
  return useQuery({
    queryKey: ["admin-newsletter", params],
    queryFn: () => newsletterService.listSubscribers(params),
  });
}

export function useUpdateSubscriberStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "unsubscribed" }) =>
      newsletterService.updateSubscriberStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter"] });
      toast.success("Subscriber status updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: (data: NewsletterSubscribeDTO) => publicService.subscribeNewsletter(data),
    onSuccess: (res) => {
      toast.success(res.message || "Thank you for subscribing!");
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Subscription failed";
      toast.error(msg);
    },
  });
}
