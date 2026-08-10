import { useMemo, useState } from "react";
import { crmService } from "@/services/crm.service";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Pencil, Trash2, Search, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  ACTIVITY_TYPES,
  CONTACT_TYPES,
  LIFECYCLE_STAGES,
  formatDate,
  titleCase,
  useCrmList,
  useCrmMutations,
  type CrmActivity,
  type CrmContact,
  type CrmOrganization,
} from "@/hooks/useCrm";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  organization_id: string;
  organization_name: string;
  contact_type: string;
  lifecycle_stage: string;
  tags: string;
  source: string;
  notes: string;
}

const EMPTY: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  organization_id: "none",
  organization_name: "",
  contact_type: "other",
  lifecycle_stage: "lead",
  tags: "",
  source: "",
  notes: "",
};

export default function AdminContacts() {
  const queryClient = useQueryClient();
  const { data: contacts = [], isLoading } = useCrmList<CrmContact>("crm_contacts");
  const { data: organizations = [] } = useCrmList<CrmOrganization>("crm_organizations", {
    orderBy: "name",
    ascending: true,
  });
  const { save, remove } = useCrmMutations("crm_contacts", "Contact");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CrmContact | null>(null);
  const [detail, setDetail] = useState<CrmContact | null>(null);

  const form = useForm<ContactFormValues>({ defaultValues: EMPTY });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return contacts.filter((c) => {
      const matchesTerm =
        !term ||
        [c.name, c.email, c.organization_name, c.source]
          .filter(Boolean)
          .some((v) => (v as string).toLowerCase().includes(term));
      const matchesType = typeFilter === "all" || c.contact_type === typeFilter;
      const matchesStage = stageFilter === "all" || c.lifecycle_stage === stageFilter;
      return matchesTerm && matchesType && matchesStage;
    });
  }, [contacts, search, typeFilter, stageFilter]);

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(contact: CrmContact) {
    setEditing(contact);
    form.reset({
      name: contact.name,
      email: contact.email ?? "",
      phone: contact.phone ?? "",
      organization_id: contact.organization_id ?? "none",
      organization_name: contact.organization_name ?? "",
      contact_type: contact.contact_type,
      lifecycle_stage: contact.lifecycle_stage,
      tags: (contact.tags ?? []).join(", "),
      source: contact.source ?? "",
      notes: contact.notes ?? "",
    });
    setDialogOpen(true);
  }

  async function onSubmit(values: ContactFormValues) {
    await save.mutateAsync({
      id: editing?.id,
      values: {
        name: values.name,
        email: values.email || null,
        phone: values.phone || null,
        organization_id: values.organization_id === "none" ? null : values.organization_id,
        organization_name: values.organization_name || null,
        contact_type: values.contact_type,
        lifecycle_stage: values.lifecycle_stage,
        tags: values.tags
          ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        source: values.source || null,
        notes: values.notes || null,
      },
    });
    setDialogOpen(false);
  }

  const counts = useMemo(
    () => ({
      total: contacts.length,
      partners: contacts.filter((c) => c.contact_type === "partner").length,
      donors: contacts.filter((c) => c.contact_type === "donor").length,
      volunteers: contacts.filter((c) => c.contact_type === "volunteer").length,
    }),
    [contacts],
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
            <p className="mt-1 text-muted-foreground">
              People and organizations engaging with the Foundation.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" /> New contact
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total contacts", value: counts.total },
            { label: "Partners", value: counts.partners },
            { label: "Donors", value: counts.donors },
            { label: "Volunteers", value: counts.volunteers },
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

        <Card>
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search name, email, organization"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {CONTACT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {titleCase(t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stages</SelectItem>
                  {LIFECYCLE_STAGES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {titleCase(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">No contacts found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((contact) => (
                    <TableRow
                      key={contact.id}
                      className="cursor-pointer"
                      onClick={() => setDetail(contact)}
                    >
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {contact.email ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {contact.organization_name ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{titleCase(contact.contact_type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{titleCase(contact.lifecycle_stage)}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(contact.created_at)}
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="icon" onClick={() => openEdit(contact)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm(`Delete ${contact.name}?`)) remove.mutate(contact.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit contact" : "New contact"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input required {...form.register("name", { required: true })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" {...form.register("email")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input {...form.register("phone")} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization (linked)</label>
                <Select
                  value={form.watch("organization_id")}
                  onValueChange={(v) => form.setValue("organization_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization (text)</label>
                <Input {...form.register("organization_name")} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={form.watch("contact_type")}
                  onValueChange={(v) => form.setValue("contact_type", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {titleCase(t)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lifecycle stage</label>
                <Select
                  value={form.watch("lifecycle_stage")}
                  onValueChange={(v) => form.setValue("lifecycle_stage", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LIFECYCLE_STAGES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {titleCase(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input {...form.register("tags")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Input {...form.register("source")} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea rows={4} {...form.register("notes")} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save contact
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ContactDetailSheet
        contact={detail}
        onClose={() => setDetail(null)}
        onActivityLogged={() => queryClient.invalidateQueries({ queryKey: ["crm_activities"] })}
      />
    </AdminLayout>
  );
}

function ContactDetailSheet({
  contact,
  onClose,
  onActivityLogged,
}: {
  contact: CrmContact | null;
  onClose: () => void;
  onActivityLogged: () => void;
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("note");
  const [saving, setSaving] = useState(false);

  const { data: activities = [], refetch } = useQuery({
    queryKey: ["crm_activities", contact?.id],
    enabled: !!contact,
    queryFn: async () => {
      if (!contact) return [];
      const res = await crmService.listActivities({ contactId: contact.id });
      return (res ?? []) as CrmActivity[];
    },
  });

  async function logActivity() {
    if (!contact || !subject.trim()) return;
    setSaving(true);
    try {
      await crmService.createActivity({
        contactId: contact.id,
        activityType: type,
        subject: subject.trim(),
        body: body.trim() || null,
      });
      setSaving(false);
      toast.success("Activity logged");
      setSubject("");
      setBody("");
      refetch();
      onActivityLogged();
    } catch (err: unknown) {
      setSaving(false);
      const msg = (err as Error)?.message || "Failed to log activity";
      toast.error(msg);
    }
  }

  return (
    <Sheet open={!!contact} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{contact?.name}</SheetTitle>
        </SheetHeader>
        {contact && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Email" value={contact.email} />
              <Detail label="Phone" value={contact.phone} />
              <Detail label="Organization" value={contact.organization_name} />
              <Detail label="Source" value={contact.source} />
              <Detail label="Type" value={titleCase(contact.contact_type)} />
              <Detail label="Stage" value={titleCase(contact.lifecycle_stage)} />
            </div>
            {contact.notes && (
              <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
                {contact.notes}
              </div>
            )}

            <div className="space-y-3 rounded-lg border border-border p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <MessageSquarePlus className="h-4 w-4" /> Log activity
              </p>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {titleCase(t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Textarea
                rows={3}
                placeholder="Details"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <Button onClick={logActivity} disabled={saving || !subject.trim()} size="sm">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save activity
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Timeline</p>
              {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity yet.</p>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-lg border border-border p-3 text-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{activity.subject}</span>
                      <Badge variant="secondary">{titleCase(activity.activity_type)}</Badge>
                    </div>
                    {activity.body && (
                      <p className="mt-1 text-muted-foreground">{activity.body}</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(activity.occurred_at)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value || "—"}</p>
    </div>
  );
}
