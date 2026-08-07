import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateInquiry } from "@/hooks/useInquiries";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INQUIRY_TYPES = [
  { value: "partnership", label: "Partnership" },
  { value: "volunteer", label: "Volunteer or advisor" },
  { value: "media", label: "Media or press" },
  { value: "general", label: "General inquiry" },
] as const;

const schema = z.object({
  inquiry_type: z.enum(["partnership", "volunteer", "media", "general"]),
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least a sentence (10+ characters)")
    .max(4000, "Please keep your message under 4000 characters"),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
});

type InquiryValues = z.infer<typeof schema>;

interface InquiryFormProps {
  defaultType?: InquiryValues["inquiry_type"];
  sourcePage?: string;
  lockType?: boolean;
}

export function InquiryForm({
  defaultType = "general",
  sourcePage,
  lockType = false,
}: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      inquiry_type: defaultType,
      name: "",
      email: "",
      organization: "",
      message: "",
      website: "",
    },
  });

  const createInquiryMutation = useCreateInquiry();

  async function onSubmit(values: InquiryValues) {
    if (values.website && values.website.length > 0) {
      // Silent success for bots.
      setSubmitted(true);
      return;
    }
    createInquiryMutation.mutate(
      {
        inquiryType: values.inquiry_type,
        name: values.name,
        email: values.email,
        organization: values.organization || undefined,
        message: values.message,
        sourcePage:
          sourcePage ??
          (typeof window !== "undefined" ? window.location.pathname : undefined),
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          form.reset();
        },
      }
    );
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-border bg-secondary/60 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">
          Message received.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for reaching out. A member of the Foundation team will respond as soon as we
          are able. We prioritize thoughtful replies over fast ones.
        </p>
        <Button
          variant="outline"
          className="mt-5"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        aria-label="Foundation inquiry form"
        noValidate
      >
        {/* Honeypot — visually hidden from humans, submitted by bots */}
        <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiry_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for contact</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={lockType}
              >
                <FormControl>
                  <SelectTrigger aria-required="true">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INQUIRY_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" required aria-required="true" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Organization <span className="text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help?</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  required
                  aria-required="true"
                  placeholder="Please share context about your organization, the community you serve, and what you would like to explore with us."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please do not include sensitive personal information about third parties.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            By submitting this form you consent to us contacting you about your inquiry. We will
            not share your details with third parties.
          </p>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="min-w-40"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Sending
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
