import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus, Pencil, Trash2, Download, Search } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formatDate,
  titleCase,
  useCrmList,
  useCrmMutations,
  type CrmOrganization,
  type Subscriber,
} from "@/hooks/useCrm";
import { useNewsletterSubscribers, useUpdateSubscriberStatus } from "@/hooks/useNewsletter";
import { newsletterService } from "@/services/newsletter.service";

interface OrgFormValues {
  name: string;
  website: string;
  org_type: string;
  country: string;
  notes: string;
}

const EMPTY: OrgFormValues = { name: "", website: "", org_type: "", country: "", notes: "" };

export default function AdminAudience() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audience</h1>
          <p className="mt-1 text-muted-foreground">
            Partner organizations and newsletter subscribers.
          </p>
        </div>
        <Tabs defaultValue="organizations">
          <TabsList>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>
          <TabsContent value="organizations" className="mt-6">
            <OrganizationsPanel />
          </TabsContent>
          <TabsContent value="subscribers" className="mt-6">
            <SubscribersPanel />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

function OrganizationsPanel() {
  const { data: organizations = [], isLoading } = useCrmList<CrmOrganization>(
    "crm_organizations",
    { orderBy: "name", ascending: true },
  );
  const { save, remove } = useCrmMutations("crm_organizations", "Organization");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CrmOrganization | null>(null);
  const form = useForm<OrgFormValues>({ defaultValues: EMPTY });

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(org: CrmOrganization) {
    setEditing(org);
    form.reset({
      name: org.name,
      website: org.website ?? "",
      org_type: org.org_type ?? "",
      country: org.country ?? "",
      notes: org.notes ?? "",
    });
    setDialogOpen(true);
  }

  async function onSubmit(values: OrgFormValues) {
    await save.mutateAsync({
      id: editing?.id,
      values: {
        name: values.name,
        website: values.website || null,
        org_type: values.org_type || null,
        country: values.country || null,
        notes: values.notes || null,
      },
    });
    setDialogOpen(false);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organizations</CardTitle>
        <Button size="sm" onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" /> New organization
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : organizations.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">No organizations yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell className="text-muted-foreground">{org.org_type ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{org.country ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {org.website ? (
                      <a
                        className="underline"
                        href={org.website}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Visit
                      </a>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(org)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm(`Delete ${org.name}?`)) remove.mutate(org.id);
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit organization" : "New organization"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input required {...form.register("name", { required: true })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Input placeholder="NGO, funder, university" {...form.register("org_type")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input {...form.register("country")} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input type="url" placeholder="https://" {...form.register("website")} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea rows={3} {...form.register("notes")} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save organization
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}



function SubscribersPanel() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: response, isLoading } = useNewsletterSubscribers({
    page,
    limit: 20,
    search,
  });

  const updateStatusMutation = useUpdateSubscriberStatus();

  const subscribers: Subscriber[] = response?.data || [];
  const pagination = response?.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 };

  const filtered = useMemo(() => {
    return subscribers.filter((s) => {
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesStatus;
    });
  }, [subscribers, statusFilter]);

  async function exportCsv() {
    try {
      const blob = await newsletterService.exportSubscribers(search);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      const rows = [
        ["ID", "Email", "Status", "Source", "Created At"],
        ...filtered.map((s) => [s.id, s.email, s.status, s.source ?? "", s.createdAt || s.created_at || ""]),
      ];
      const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search email or source"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">No subscribers found.</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.email}</TableCell>
                    <TableCell className="text-muted-foreground">{sub.source || "website"}</TableCell>
                    <TableCell>
                      <Badge variant={sub.status === "active" ? "default" : "outline"}>
                        {titleCase(sub.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(sub.createdAt || sub.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      {sub.status === "active" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={updateStatusMutation.isPending}
                          onClick={() =>
                            updateStatusMutation.mutate({ id: sub.id, status: "unsubscribed" })
                          }
                        >
                          Unsubscribe
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={updateStatusMutation.isPending}
                          onClick={() =>
                            updateStatusMutation.mutate({ id: sub.id, status: "active" })
                          }
                        >
                          Reactivate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {pagination.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
