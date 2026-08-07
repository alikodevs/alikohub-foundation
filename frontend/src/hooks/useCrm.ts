import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { crmService } from "@/services/crm.service";

export interface CrmContact {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  organizationId?: string | null;
  organizationName?: string | null;
  contactType: string;
  lifecycleStage: string;
  tags?: string[] | unknown;
  source?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CrmOrganization {
  id: string;
  name: string;
  website?: string | null;
  orgType?: string | null;
  country?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CrmDeal {
  id: string;
  title: string;
  contactId?: string | null;
  organizationId?: string | null;
  stage: string;
  value?: number | null;
  currency: string;
  expectedCloseDate?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CrmActivity {
  id: string;
  contactId?: string | null;
  dealId?: string | null;
  activityType: string;
  activity_type?: string;
  subject: string;
  body?: string | null;
  occurredAt?: string;
  occurred_at?: string;
  createdBy?: string | null;
  createdAt?: string;
}

export interface CrmTask {
  id: string;
  title: string;
  details?: string | null;
  contactId?: string | null;
  dealId?: string | null;
  dueDate?: string | null;
  status: string;
  priority: string;
  assignedTo?: string | null;
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CrmDonation {
  id: string;
  contactId?: string | null;
  organizationId?: string | null;
  amount: number;
  currency: string;
  donatedAt?: string;
  method?: string | null;
  campaign?: string | null;
  isRecurring: boolean;
  receiptSent: boolean;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
}

export type NewsletterSubscriber = Subscriber;

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

export function titleCase(value?: string | null) {
  if (!value) return "";
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

/** Generic list query using crmService */
export function useCrmList<T>(
  endpoint: string,
  options?: { orderBy?: string; ascending?: boolean; select?: string },
) {
  return useQuery({
    queryKey: [endpoint, options?.orderBy, options?.select],
    queryFn: async () => {
      switch (endpoint) {
        case "contacts":
          return (await crmService.listContacts()) as T[];
        case "organizations":
          return (await crmService.listOrganizations()) as T[];
        case "deals":
          return (await crmService.listDeals()) as T[];
        case "tasks":
          return (await crmService.listTasks()) as T[];
        case "donations":
          return (await crmService.listDonations()) as T[];
        default:
          return [] as T[];
      }
    },
  });
}

/** Generic mutations using crmService */
export function useCrmMutations(endpoint: string, label: string) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [endpoint] });

  const save = useMutation({
    mutationFn: async ({ id, values }: { id?: string; values: Record<string, unknown> }) => {
      switch (endpoint) {
        case "contacts":
          return id ? crmService.updateContact(id, values) : crmService.createContact(values);
        case "organizations":
          return id ? crmService.updateOrganization(id, values) : crmService.createOrganization(values);
        case "deals":
          return id ? crmService.updateDeal(id, values) : crmService.createDeal(values);
        case "tasks":
          return id ? crmService.updateTask(id, values) : crmService.createTask(values);
        case "donations":
          return id ? crmService.updateDonation(id, values) : crmService.createDonation(values);
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
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
      switch (endpoint) {
        case "contacts":
          return crmService.deleteContact(id);
        case "organizations":
          return crmService.deleteOrganization(id);
        case "deals":
          return crmService.deleteDeal(id);
        case "tasks":
          return crmService.deleteTask(id);
        case "donations":
          return crmService.deleteDonation(id);
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
    },
    onSuccess: () => {
      invalidate();
      toast.success(`${label} deleted`);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { save, remove };
}

// Specialized Activities hook
export function useCrmActivities(params?: { contactId?: string; dealId?: string; limit?: number }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["crm-activities", params?.contactId, params?.dealId, params?.limit],
    queryFn: () => crmService.listActivities(params),
    enabled: !!(params?.contactId || params?.dealId),
  });

  const create = useMutation({
    mutationFn: (data: Record<string, unknown>) => crmService.createActivity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crm-activities"] });
      toast.success("Activity logged");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { ...query, createActivity: create };
}
