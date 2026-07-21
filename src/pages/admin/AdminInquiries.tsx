import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Inbox, Search } from "lucide-react";

type InquiryStatus = "new" | "in_review" | "responded" | "archived";
type InquiryType = "partnership" | "volunteer" | "media" | "general";

interface Inquiry {
  id: string;
  inquiry_type: InquiryType;
  name: string;
  email: string;
  organization: string | null;
  message: string;
  source_page: string | null;
  status: InquiryStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUSES: InquiryStatus[] = ["new", "in_review", "responded", "archived"];
const TYPES: InquiryType[] = ["partnership", "volunteer", "media", "general"];

const statusVariant: Record<InquiryStatus, "default" | "secondary" | "outline"> = {
  new: "default",
  in_review: "secondary",
  responded: "outline",
  archived: "outline",
};

export default function AdminInquiries() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [draftStatus, setDraftStatus] = useState<InquiryStatus>("new");
  const [draftNotes, setDraftNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("foundation_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load inquiries", { description: error.message });
    } else {
      setRows((data ?? []) as Inquiry[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (typeFilter !== "all" && r.inquiry_type !== typeFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.organization ?? "").toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    });
  }, [rows, search, statusFilter, typeFilter]);

  function openDetail(row: Inquiry) {
    setSelected(row);
    setDraftStatus(row.status);
    setDraftNotes(row.admin_notes ?? "");
  }

  async function save() {
    if (!selected) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("foundation_inquiries")
      .update({ status: draftStatus, admin_notes: draftNotes || null })
      .eq("id", selected.id)
      .select()
      .single();
    setSaving(false);
    if (error) {
      toast.error("Update failed", { description: error.message });
      return;
    }
    toast.success("Inquiry updated");
    setRows((prev) => prev.map((r) => (r.id === selected.id ? (data as Inquiry) : r)));
    setSelected(null);
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const s of STATUSES) c[s] = rows.filter((r) => r.status === s).length;
    return c;
  }, [rows]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Inbox className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inquiries</h1>
            <p className="text-muted-foreground mt-1">
              Foundation partnership, volunteer, media and general messages.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          {(["all", ...STATUSES] as const).map((s) => (
            <Card key={s}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  {s === "all" ? "Total" : s.replace("_", " ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{counts[s] ?? 0}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, email, message…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                No inquiries match your filters.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Received</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r) => (
                      <TableRow key={r.id} className="cursor-pointer" onClick={() => openDetail(r)}>
                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{r.inquiry_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[r.status]}>
                            {r.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{r.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {r.organization ?? "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetail(r);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>
                  {new Date(selected.created_at).toLocaleString()} · {selected.email}
                  {selected.organization ? ` · ${selected.organization}` : ""}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{selected.inquiry_type}</Badge>
                  {selected.source_page && (
                    <Badge variant="outline">from {selected.source_page}</Badge>
                  )}
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                    Message
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3 text-sm whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Status
                    </label>
                    <Select
                      value={draftStatus}
                      onValueChange={(v) => setDraftStatus(v as InquiryStatus)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Admin notes (internal)
                    </label>
                    <Textarea
                      className="mt-1 min-h-[120px]"
                      value={draftNotes}
                      onChange={(e) => setDraftNotes(e.target.value)}
                      placeholder="Follow-up context, next steps, who owns this…"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Cancel
                </Button>
                <Button onClick={save} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
