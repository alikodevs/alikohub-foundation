import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bell, Loader2, Mail, Plus, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Settings {
  id?: string;
  notifications_enabled: boolean;
  recipients: string[];
  notify_on_inquiry: boolean;
  notify_on_task: boolean;
  notify_on_donation: boolean;
  notify_on_newsletter: boolean;
  digest_frequency: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const EVENT_TOGGLES = [
  {
    key: "notify_on_inquiry" as const,
    title: "New inquiries",
    description: "Partnership, volunteer, media, and general form submissions.",
  },
  {
    key: "notify_on_task" as const,
    title: "Task reminders",
    description: "Tasks that are assigned, due today, or overdue.",
  },
  {
    key: "notify_on_donation" as const,
    title: "Donations",
    description: "Every gift recorded in the donations ledger.",
  },
  {
    key: "notify_on_newsletter" as const,
    title: "Newsletter signups",
    description: "New subscribers from the website footer.",
  },
];

const FREQUENCIES = [
  { value: "instant", label: "Instant — send as it happens" },
  { value: "daily", label: "Daily digest" },
  { value: "weekly", label: "Weekly digest" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

import { useNotificationSettings, useUpdateNotificationSettings } from "@/hooks/useSettings";

export default function AdminSettings() {
  const [draft, setDraft] = useState<Settings | null>(null);
  const [newRecipient, setNewRecipient] = useState("");

  const { data, isLoading } = useNotificationSettings();
  const saveMutation = useUpdateNotificationSettings();

  useEffect(() => {
    if (data) {
      const raw = data as unknown as Record<string, unknown>;
      setDraft({
        id: (raw.id as string) || undefined,
        notifications_enabled: (raw.notificationsEnabled ?? raw.notifications_enabled ?? false) as boolean,
        recipients: (raw.recipients as string[]) ?? [],
        notify_on_inquiry: (raw.notifyOnInquiry ?? raw.notify_on_inquiry ?? true) as boolean,
        notify_on_task: (raw.notifyOnTask ?? raw.notify_on_task ?? false) as boolean,
        notify_on_donation: (raw.notifyOnDonation ?? raw.notify_on_donation ?? true) as boolean,
        notify_on_newsletter: (raw.notifyOnNewsletter ?? raw.notify_on_newsletter ?? false) as boolean,
        digest_frequency: (raw.digestFrequency ?? raw.digest_frequency ?? "instant") as DigestFreq,
      });
    }
  }, [data]);

  const save = {
    isPending: saveMutation.isPending,
    mutate: (values: Settings) => {
      saveMutation.mutate({
        notificationsEnabled: values.notifications_enabled,
        recipients: values.recipients,
        notifyOnInquiry: values.notify_on_inquiry,
        notifyOnTask: values.notify_on_task,
        notifyOnDonation: values.notify_on_donation,
        notifyOnNewsletter: values.notify_on_newsletter,
        digestFrequency: values.digest_frequency,
      });
    },
  };

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));

  const addRecipient = () => {
    const email = newRecipient.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (draft?.recipients.includes(email)) {
      toast.error("That address is already on the list");
      return;
    }
    update("recipients", [...(draft?.recipients ?? []), email]);
    setNewRecipient("");
  };

  const removeRecipient = (email: string) =>
    update("recipients", (draft?.recipients ?? []).filter((item) => item !== email));

  const isDirty = !!draft && !!data && JSON.stringify(draft) !== JSON.stringify(data);
  const enabled = draft?.notifications_enabled ?? false;

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM Settings</h1>
          <p className="mt-1 text-muted-foreground">
            Control who gets notified and which CRM events trigger an email.
          </p>
        </div>

        {isLoading || !draft ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Email notifications
                    </CardTitle>
                    <CardDescription>
                      Master switch for all CRM notification emails.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(value) => update("notifications_enabled", value)}
                    aria-label="Enable email notifications"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Delivery cadence</Label>
                  <Select
                    value={draft.digest_frequency}
                    onValueChange={(value) => update("digest_frequency", value)}
                    disabled={!enabled}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FREQUENCIES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Recipients
                </CardTitle>
                <CardDescription>
                  Staff addresses that receive these notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    value={newRecipient}
                    placeholder="name@alikohub.org"
                    maxLength={255}
                    onChange={(event) => setNewRecipient(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addRecipient();
                      }
                    }}
                  />
                  <Button type="button" onClick={addRecipient} className="sm:w-auto">
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>

                {draft.recipients.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No recipients yet. Notifications will not be delivered until you add one.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {draft.recipients.map((email) => (
                      <Badge key={email} variant="secondary" className="gap-1 py-1 pl-3 pr-1">
                        {email}
                        <button
                          type="button"
                          onClick={() => removeRecipient(email)}
                          aria-label={`Remove ${email}`}
                          className="rounded-full p-1 hover:bg-background/60"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trigger events</CardTitle>
                <CardDescription>Choose which CRM events send an email.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {EVENT_TOGGLES.map((event, index) => (
                  <div key={event.key}>
                    {index > 0 && <Separator className="my-1" />}
                    <div className="flex items-start justify-between gap-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <Switch
                        checked={draft[event.key]}
                        disabled={!enabled}
                        onCheckedChange={(value) => update(event.key, value)}
                        aria-label={event.title}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-3">
              {isDirty && <span className="text-sm text-muted-foreground">Unsaved changes</span>}
              <Button
                variant="outline"
                onClick={() => data && setDraft(data)}
                disabled={!isDirty || save.isPending}
              >
                Reset
              </Button>
              <Button onClick={() => save.mutate(draft)} disabled={!isDirty || save.isPending}>
                {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save settings
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Delivery starts once a verified sender domain is connected to the foundation account.
              Until then these preferences are stored and applied automatically.
            </p>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
