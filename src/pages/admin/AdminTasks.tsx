import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus, Pencil, Trash2, CheckCircle2 } from "lucide-react";
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
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  formatDate,
  titleCase,
  useCrmList,
  useCrmMutations,
  type CrmContact,
  type CrmDeal,
  type CrmTask,
} from "@/hooks/useCrm";

interface TaskFormValues {
  title: string;
  details: string;
  contact_id: string;
  deal_id: string;
  due_date: string;
  status: string;
  priority: string;
}

const EMPTY: TaskFormValues = {
  title: "",
  details: "",
  contact_id: "none",
  deal_id: "none",
  due_date: "",
  status: "open",
  priority: "medium",
};

export default function AdminTasks() {
  const { data: tasks = [], isLoading } = useCrmList<CrmTask>("crm_tasks", {
    orderBy: "due_date",
    ascending: true,
  });
  const { data: contacts = [] } = useCrmList<CrmContact>("crm_contacts", {
    orderBy: "name",
    ascending: true,
  });
  const { data: deals = [] } = useCrmList<CrmDeal>("crm_deals");
  const { save, remove } = useCrmMutations("crm_tasks", "Task");

  const [statusFilter, setStatusFilter] = useState("open");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CrmTask | null>(null);
  const form = useForm<TaskFormValues>({ defaultValues: EMPTY });

  const filtered = useMemo(
    () => (statusFilter === "all" ? tasks : tasks.filter((t) => t.status === statusFilter)),
    [tasks, statusFilter],
  );

  const today = new Date().toISOString().slice(0, 10);
  const stats = useMemo(
    () => ({
      open: tasks.filter((t) => t.status === "open").length,
      inProgress: tasks.filter((t) => t.status === "in_progress").length,
      overdue: tasks.filter(
        (t) => t.due_date && t.due_date < today && !["done", "cancelled"].includes(t.status),
      ).length,
      done: tasks.filter((t) => t.status === "done").length,
    }),
    [tasks, today],
  );

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setDialogOpen(true);
  }

  function openEdit(task: CrmTask) {
    setEditing(task);
    form.reset({
      title: task.title,
      details: task.details ?? "",
      contact_id: task.contact_id ?? "none",
      deal_id: task.deal_id ?? "none",
      due_date: task.due_date ?? "",
      status: task.status,
      priority: task.priority,
    });
    setDialogOpen(true);
  }

  async function onSubmit(values: TaskFormValues) {
    await save.mutateAsync({
      id: editing?.id,
      values: {
        title: values.title,
        details: values.details || null,
        contact_id: values.contact_id === "none" ? null : values.contact_id,
        deal_id: values.deal_id === "none" ? null : values.deal_id,
        due_date: values.due_date || null,
        status: values.status,
        priority: values.priority,
      },
    });
    setDialogOpen(false);
  }

  const priorityVariant = (priority: string) =>
    priority === "high" ? "destructive" : priority === "medium" ? "secondary" : "outline";

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tasks &amp; follow-ups</h1>
            <p className="mt-1 text-muted-foreground">
              Keep every partner commitment and donor follow-up on schedule.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" /> New task
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Open", value: stats.open },
            { label: "In progress", value: stats.inProgress },
            { label: "Overdue", value: stats.overdue },
            { label: "Completed", value: stats.done },
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
          <CardHeader>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tasks</SelectItem>
                {TASK_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {titleCase(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">No tasks here.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Related to</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((task) => {
                    const overdue =
                      task.due_date &&
                      task.due_date < today &&
                      !["done", "cancelled"].includes(task.status);
                    return (
                      <TableRow key={task.id}>
                        <TableCell>
                          <p className="font-medium">{task.title}</p>
                          {task.details && (
                            <p className="text-xs text-muted-foreground">{task.details}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {contacts.find((c) => c.id === task.contact_id)?.name ??
                            deals.find((d) => d.id === task.deal_id)?.title ??
                            "—"}
                        </TableCell>
                        <TableCell className={overdue ? "font-semibold text-destructive" : ""}>
                          {formatDate(task.due_date)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={priorityVariant(task.priority)}>
                            {titleCase(task.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={task.status}
                            onValueChange={(v) =>
                              save.mutate({ id: task.id, values: { status: v } })
                            }
                          >
                            <SelectTrigger className="h-8 w-[140px] text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TASK_STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {titleCase(s)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          {task.status !== "done" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Mark done"
                              onClick={() =>
                                save.mutate({ id: task.id, values: { status: "done" } })
                              }
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => openEdit(task)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm(`Delete "${task.title}"?`)) remove.mutate(task.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit task" : "New task"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input required {...form.register("title", { required: true })} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Details</label>
              <Textarea rows={3} {...form.register("details")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact</label>
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Partnership</label>
                <Select
                  value={form.watch("deal_id")}
                  onValueChange={(v) => form.setValue("deal_id", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {deals.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Due date</label>
                <Input type="date" {...form.register("due_date")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={form.watch("priority")}
                  onValueChange={(v) => form.setValue("priority", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {titleCase(p)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(v) => form.setValue("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {titleCase(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save task
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
