import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEAL_STAGES,
  DEAL_STAGE_LABELS,
  formatCurrency,
  formatDate,
  useCrmList,
  useCrmMutations,
  type CrmContact,
  type CrmDeal,
  type CrmOrganization,
} from "@/hooks/useCrm";

interface DealFormValues {
  title: string;
  contact_id: string;
  organization_id: string;
  stage: string;
  value: string;
  currency: string;
  expected_close_date: string;
  notes: string;
}

const EMPTY: DealFormValues = {
  title: "",
  contact_id: "none",
  organization_id: "none",
  stage: "prospect",
  value: "",
  currency: "USD",
  expected_close_date: "",
  notes: "",
};

const STAGE_ACCENT: Record<string, string> = {
  prospect: "hsl(var(--muted-foreground))",
  engaged: "hsl(var(--trust-blue))",
  proposal: "hsl(var(--amber))",
  agreement: "hsl(var(--primary))",
  active: "hsl(var(--trust-blue))",
  declined: "hsl(var(--destructive))",
};

export default function AdminPipeline() {
  const { data: deals = [], isLoading } = useCrmList<CrmDeal>("crm_deals");
  const { data: contacts = [] } = useCrmList<CrmContact>("crm_contacts", {
    orderBy: "name",
    ascending: true,
  });
  const { data: organizations = [] } = useCrmList<CrmOrganization>("crm_organizations", {
    orderBy: "name",
    ascending: true,
  });
  const { save, remove } = useCrmMutations("crm_deals", "Partnership");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CrmDeal | null>(null);
  const form = useForm<DealFormValues>({ defaultValues: EMPTY });

  const contactName = (id: string | null) =>
    contacts.find((c) => c.id === id)?.name ?? null;
  const orgName = (id: string | null) => organizations.find((o) => o.id === id)?.name ?? null;

  const totals = useMemo(() => {
    const open = deals.filter((d) => !["active", "declined"].includes(d.stage));
    return {
      openCount: open.length,
      openValue: open.reduce((sum, d) => sum + Number(d.value ?? 0), 0),
      activeValue: deals
        .filter((d) => d.stage === "active")
        .reduce((sum, d) => sum + Number(d.value ?? 0), 0),
      activeCount: deals.filter((d) => d.stage === "active").length,
    };
  }, [deals]);

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(deal: CrmDeal) {
    setEditing(deal);
    form.reset({
      title: deal.title,
      contact_id: deal.contact_id ?? "none",
      organization_id: deal.organization_id ?? "none",
      stage: deal.stage,
      value: deal.value !== null ? String(deal.value) : "",
      currency: deal.currency,
      expected_close_date: deal.expected_close_date ?? "",
      notes: deal.notes ?? "",
    });
    setDialogOpen(true);
  }

  async function onSubmit(values: DealFormValues) {
    await save.mutateAsync({
      id: editing?.id,
      values: {
        title: values.title,
        contact_id: values.contact_id === "none" ? null : values.contact_id,
        organization_id: values.organization_id === "none" ? null : values.organization_id,
        stage: values.stage,
        value: values.value ? Number(values.value) : null,
        currency: values.currency || "USD",
        expected_close_date: values.expected_close_date || null,
        notes: values.notes || null,
      },
    });
    setDialogOpen(false);
  }

  async function moveStage(deal: CrmDeal, stage: string) {
    await save.mutateAsync({ id: deal.id, values: { stage } });
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Partnership pipeline</h1>
            <p className="mt-1 text-muted-foreground">
              Track institutional partnerships from first contact to active agreement.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" /> New partnership
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Open opportunities", value: String(totals.openCount) },
            { label: "Open pipeline value", value: formatCurrency(totals.openValue) },
            { label: "Active partnerships", value: String(totals.activeCount) },
            { label: "Active value", value: formatCurrency(totals.activeValue) },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DEAL_STAGES.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              return (
                <div
                  key={stage}
                  className="rounded-xl border border-border bg-card p-4"
                  style={{ borderTop: `3px solid ${STAGE_ACCENT[stage]}` }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">
                      {DEAL_STAGE_LABELS[stage]}
                    </h2>
                    <Badge variant="secondary">{stageDeals.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {stageDeals.length === 0 && (
                      <p className="text-sm text-muted-foreground">Nothing here yet.</p>
                    )}
                    {stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="rounded-lg border border-border bg-background p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-foreground">{deal.title}</p>
                          <div className="flex shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => openEdit(deal)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => {
                                if (confirm(`Delete "${deal.title}"?`)) remove.mutate(deal.id);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {orgName(deal.organization_id) ??
                            contactName(deal.contact_id) ??
                            "Unassigned"}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground">
                            {formatCurrency(
                              deal.value !== null ? Number(deal.value) : null,
                              deal.currency,
                            )}
                          </span>
                          <span className="text-muted-foreground">
                            {formatDate(deal.expected_close_date)}
                          </span>
                        </div>
                        <Select
                          value={deal.stage}
                          onValueChange={(v) => moveStage(deal, v)}
                        >
                          <SelectTrigger className="mt-3 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DEAL_STAGES.map((s) => (
                              <SelectItem key={s} value={s}>
                                Move to {DEAL_STAGE_LABELS[s]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit partnership" : "New partnership"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input required {...form.register("title", { required: true })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization</label>
                <Select
                  value={form.watch("organization_id")}
                  onValueChange={(v) => form.setValue("organization_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {organizations.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary contact</label>
                <Select
                  value={form.watch("contact_id")}
                  onValueChange={(v) => form.setValue("contact_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {contacts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stage</label>
                <Select
                  value={form.watch("stage")}
                  onValueChange={(v) => form.setValue("stage", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEAL_STAGES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {DEAL_STAGE_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Value</label>
                <Input type="number" min="0" step="100" {...form.register("value")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <Input maxLength={3} {...form.register("currency")} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected close date</label>
              <Input type="date" {...form.register("expected_close_date")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea rows={4} {...form.register("notes")} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save partnership
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
