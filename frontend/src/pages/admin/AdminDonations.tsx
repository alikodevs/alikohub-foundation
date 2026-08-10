import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus, Pencil, Trash2, Download } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import {
  formatCurrency,
  formatDate,
  useCrmList,
  useCrmMutations,
  type CrmContact,
  type CrmDonation,
} from "@/hooks/useCrm";

interface DonationFormValues {
  contact_id: string;
  amount: string;
  currency: string;
  donated_at: string;
  method: string;
  campaign: string;
  is_recurring: boolean;
  receipt_sent: boolean;
  notes: string;
}

const EMPTY: DonationFormValues = {
  contact_id: "none",
  amount: "",
  currency: "USD",
  donated_at: new Date().toISOString().slice(0, 10),
  method: "",
  campaign: "",
  is_recurring: false,
  receipt_sent: false,
  notes: "",
};

export default function AdminDonations() {
  const { data: donations = [], isLoading } = useCrmList<CrmDonation>("crm_donations", {
    orderBy: "donated_at",
  });
  const { data: contacts = [] } = useCrmList<CrmContact>("crm_contacts", {
    orderBy: "name",
    ascending: true,
  });
  const { save, remove } = useCrmMutations("crm_donations", "Donation");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CrmDonation | null>(null);
  const form = useForm<DonationFormValues>({ defaultValues: EMPTY });

  const donorName = (id: string | null) => contacts.find((c) => c.id === id)?.name ?? "Anonymous";

  const stats = useMemo(() => {
    const year = new Date().getFullYear();
    const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);
    const ytd = donations
      .filter((d) => new Date(d.donated_at).getFullYear() === year)
      .reduce((sum, d) => sum + Number(d.amount), 0);
    return {
      total,
      ytd,
      count: donations.length,
      recurring: donations.filter((d) => d.is_recurring).length,
    };
  }, [donations]);

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(donation: CrmDonation) {
    setEditing(donation);
    form.reset({
      contact_id: donation.contact_id ?? "none",
      amount: String(donation.amount),
      currency: donation.currency,
      donated_at: donation.donated_at,
      method: donation.method ?? "",
      campaign: donation.campaign ?? "",
      is_recurring: donation.is_recurring,
      receipt_sent: donation.receipt_sent,
      notes: donation.notes ?? "",
    });
    setDialogOpen(true);
  }

  async function onSubmit(values: DonationFormValues) {
    await save.mutateAsync({
      id: editing?.id,
      values: {
        contact_id: values.contact_id === "none" ? null : values.contact_id,
        amount: Number(values.amount),
        currency: values.currency || "USD",
        donated_at: values.donated_at,
        method: values.method || null,
        campaign: values.campaign || null,
        is_recurring: values.is_recurring,
        receipt_sent: values.receipt_sent,
        notes: values.notes || null,
      },
    });
    setDialogOpen(false);
  }

  function exportCsv() {
    const rows = [
      ["Date", "Donor", "Amount", "Currency", "Method", "Campaign", "Recurring", "Receipt sent"],
      ...donations.map((d) => [
        d.donated_at,
        donorName(d.contact_id),
        String(d.amount),
        d.currency,
        d.method ?? "",
        d.campaign ?? "",
        d.is_recurring ? "Yes" : "No",
        d.receipt_sent ? "Yes" : "No",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `donations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Donations</h1>
            <p className="mt-1 text-muted-foreground">
              Record gifts, track receipting, and report on giving.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv} disabled={donations.length === 0}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Record donation
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total raised", value: formatCurrency(stats.total) },
            { label: "Year to date", value: formatCurrency(stats.ytd) },
            { label: "Gifts recorded", value: String(stats.count) },
            { label: "Recurring gifts", value: String(stats.recurring) },
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
          <CardContent className="overflow-x-auto pt-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : donations.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">
                No donations recorded yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Receipt</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{formatDate(donation.donated_at)}</TableCell>
                      <TableCell className="font-medium">
                        {donorName(donation.contact_id)}
                        {donation.is_recurring && (
                          <Badge variant="secondary" className="ml-2">
                            Recurring
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(Number(donation.amount), donation.currency)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {donation.method ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {donation.campaign ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={donation.receipt_sent ? "default" : "outline"}>
                          {donation.receipt_sent ? "Sent" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(donation)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Delete this donation record?"))
                              remove.mutate(donation.id);
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
            <DialogTitle>{editing ? "Edit donation" : "Record donation"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Donor</label>
              <Select
                value={form.watch("contact_id")}
                onValueChange={(v) => form.setValue("contact_id", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Anonymous</SelectItem>
                  {contacts.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  {...form.register("amount", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <Input maxLength={3} {...form.register("currency")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" required {...form.register("donated_at")} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Method</label>
                <Input placeholder="Bank transfer, card, check" {...form.register("method")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign</label>
                <Input {...form.register("campaign")} />
              </div>
            </div>
            <div className="flex gap-8">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Switch
                  checked={form.watch("is_recurring")}
                  onCheckedChange={(v) => form.setValue("is_recurring", v)}
                />
                Recurring gift
              </label>
              <label className="flex items-center gap-2 text-sm font-medium">
                <Switch
                  checked={form.watch("receipt_sent")}
                  onCheckedChange={(v) => form.setValue("receipt_sent", v)}
                />
                Receipt sent
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea rows={3} {...form.register("notes")} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save donation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
