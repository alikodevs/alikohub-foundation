import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { inquiriesService } from "@/services/inquiries.service";
import { publicService, InquiryDTO } from "@/services/public.service";
import { toast } from "sonner";

export interface InquiryItem {
  id: string;
  inquiryType: string;
  name: string;
  email: string;
  organization?: string | null;
  message: string;
  sourcePage?: string | null;
  status: "new" | "in_review" | "responded" | "archived";
  adminNotes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export function useInquiriesList(status?: string) {
  return useQuery({
    queryKey: ["admin-inquiries", status],
    queryFn: () => inquiriesService.listInquiries(status),
  });
}

export function useUpdateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status?: string; adminNotes?: string } }) =>
      inquiriesService.updateInquiry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      toast.success("Inquiry updated successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useCreateInquiry() {
  return useMutation({
    mutationFn: (data: InquiryDTO) => publicService.createInquiry(data),
    onSuccess: () => {
      toast.success("Thank you! Your inquiry has been submitted.");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to submit inquiry"),
  });
}
