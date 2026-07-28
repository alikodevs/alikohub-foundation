import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Tables = Database["public"]["Tables"];
export type CrmContact = Tables["crm_contacts"]["Row"];
export type CrmOrganization = Tables["crm_organizations"]["Row"];
export type CrmDeal = Tables["crm_deals"]["Row"];
export type CrmActivity = Tables["crm_activities"]["Row"];
export type CrmTask = Tables["crm_tasks"]["Row"];
export type CrmDonation = Tables["crm_donations"]["Row"];
export type NewsletterSubscriber = Tables["newsletter_subscribers"]["Row"];

export const CONTACT_TYPES = [
  "donor",
  "partner",
  "volunteer",
  "media",
  "beneficiary",
  "staff",
  "other",
] as const;

export const LIFECYCLE_STAGES = ["lead", "engaged", "active", "lapsed", "archived"] as const;

export const DEAL_STAGES = [
  "prospect",
  "engaged",
  "proposal",
  "agreement",
  "active",
  "declined",
] as const;

export const ACTIVITY_TYPES = [
  "note",
  "call",
  "email",
  "meeting",
  "event",
  "form_submission",
] as const;

export const TASK_STATUSES = ["open", "in_progress", "done", "cancelled"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export const DEAL_STAGE_LABELS: Record<(typeof DEAL_STAGES)[number], string> = {
  prospect: "Prospect",
  engaged: "Engaged",
  proposal: "Proposal",
  agreement: "Agreement",
  active: "Active",
  declined: "Declined",
};

export function titleCase(value: string) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatCurrency(amount: number | null, currency = "USD") {
  if (amount === null || amount === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Generic list query for a CRM table. */
export function useCrmList<T>(
  table: keyof Tables & string,
  options?: { orderBy?: string; ascending?: boolean; select?: string },
) {
  return useQuery({
    queryKey: [table, options?.orderBy, options?.select],
    queryFn: async () => {
      const query = supabase
        .from(table as never)
        .select((options?.select ?? "*") as never)
        .order(options?.orderBy ?? "created_at", { ascending: options?.ascending ?? false });
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });
}

/** Generic upsert / delete mutations for a CRM table. */
export function useCrmMutations(table: keyof Tables & string, label: string) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [table] });

  const save = useMutation({
    mutationFn: async ({ id, values }: { id?: string; values: Record<string, unknown> }) => {
      if (id) {
        const { error } = await supabase
          .from(table as never)
          .update(values as never)
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table as never).insert(values as never);
        if (error) throw error;
      }
    },
    onSuccess: (_data, variables) => {
      invalidate();
      toast.success(variables.id ? `${label} updated` : `${label} created`);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(table as never)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success(`${label} deleted`);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { save, remove };
}
