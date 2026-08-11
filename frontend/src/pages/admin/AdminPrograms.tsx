import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Layers,
  ExternalLink,
  MoreVertical,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAdminPrograms } from "@/hooks/useCms";
import { MediaPicker, getFullMediaUrl } from "@/components/admin/MediaPicker";

const programSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  featuresInput: z.string().optional(),
  link: z.string().optional(),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

type ProgramFormData = z.infer<typeof programSchema>;

interface ProgramItem {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  features?: string[] | null;
  link?: string | null;
  displayOrder?: number | null;
  display_order?: number | null;
  isActive?: boolean | null;
  is_active?: boolean | null;
  createdAt?: string;
  created_at?: string;
}

export default function AdminPrograms() {
  const { data: programsData, isLoading, save, remove } = useAdminPrograms();
  const programs = (programsData || []) as ProgramItem[];

  // Sidebar / Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      featuresInput: "",
      link: "",
      displayOrder: 0,
      isActive: true,
    },
  });

  const { isDirty } = form.formState;

  function openCreateDrawer() {
    setSelectedProgram(null);
    setIsEditMode(true);
    form.reset({
      title: "",
      description: "",
      imageUrl: "",
      featuresInput: "",
      link: "",
      displayOrder: programs.length + 1,
      isActive: true,
    });
    setIsDrawerOpen(true);
  }

  function openViewDrawer(program: ProgramItem) {
    setSelectedProgram(program);
    setIsEditMode(false);
    setIsDrawerOpen(true);
  }

  function switchToEditMode(program: ProgramItem) {
    setSelectedProgram(program);
    const featureList = Array.isArray(program.features)
      ? program.features
      : typeof program.features === "string"
      ? JSON.parse(program.features)
      : [];

    form.reset({
      title: program.title,
      description: program.description || "",
      imageUrl: program.imageUrl || program.image_url || "",
      featuresInput: Array.isArray(featureList) ? featureList.join("\n") : "",
      link: program.link || "",
      displayOrder: program.displayOrder ?? program.display_order ?? 0,
      isActive: program.isActive ?? program.is_active ?? true,
    });
    setIsEditMode(true);
  }

  async function onSubmit(data: ProgramFormData) {
    if (selectedProgram && !isDirty) {
      setIsEditMode(false);
      return;
    }

    const featuresArray = data.featuresInput
      ? data.featuresInput
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const payload = {
      title: data.title,
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      image_url: data.imageUrl || "",
      features: featuresArray,
      link: data.link || "",
      displayOrder: data.displayOrder,
      display_order: data.displayOrder,
      isActive: data.isActive,
      is_active: data.isActive,
    };

    save.mutate(
      { id: selectedProgram?.id, values: payload as unknown as Record<string, unknown> },
      {
        onSuccess: (res) => {
          if (selectedProgram && res) {
            const updated = (res.data || res) as ProgramItem;
            setSelectedProgram({
              ...selectedProgram,
              ...payload,
              ...(updated || {}),
            });
            setIsEditMode(false);
          } else {
            setIsDrawerOpen(false);
          }
        },
      }
    );
  }

  async function deleteProgram(program: ProgramItem) {
    if (!confirm(`Are you sure you want to delete "${program.title}"?`)) return;
    remove.mutate(program.id, {
      onSuccess: () => {
        if (selectedProgram?.id === program.id) {
          setIsDrawerOpen(false);
        }
      },
    });
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Programs</h1>
            <p className="text-muted-foreground mt-1">
              Manage your organization's program pillars, descriptions, features, and links
            </p>
          </div>
          <Button onClick={openCreateDrawer} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Program
          </Button>
        </div>

        {/* Responsive Programs Table */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : programs.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-2">
                <Layers className="h-12 w-12 text-muted-foreground/40" />
                <p className="font-semibold text-foreground">No programs added yet</p>
                <p className="text-sm">Click "Add Program" to create your first program pillar.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Features / Highlights</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead className="w-[60px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs.map((program) => {
                      const imagePath = program.imageUrl || program.image_url;
                      const bannerUrl = getFullMediaUrl(imagePath);
                      const isActive = program.isActive ?? program.is_active ?? true;

                      const featureList: string[] = Array.isArray(program.features)
                        ? program.features
                        : typeof program.features === "string"
                        ? JSON.parse(program.features || "[]")
                        : [];

                      return (
                        <TableRow key={program.id} className="hover:bg-muted/50 transition">
                          {/* Program Title & Thumbnail */}
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-10 rounded-md overflow-hidden bg-muted border flex-shrink-0 flex items-center justify-center">
                                {imagePath ? (
                                  <img
                                    src={bannerUrl}
                                    alt={program.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      if (imagePath && e.currentTarget.src !== window.location.origin + imagePath) {
                                        e.currentTarget.src = imagePath;
                                      }
                                    }}
                                  />
                                ) : (
                                  <Layers className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="font-semibold text-foreground block truncate max-w-[200px]">
                                  {program.title}
                                </span>
                                {program.description && (
                                  <span className="text-xs text-muted-foreground line-clamp-1 max-w-[240px]">
                                    {program.description}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>

                          {/* Features */}
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[280px]">
                              {featureList.slice(0, 2).map((feat, idx) => (
                                <Badge key={idx} variant="outline" className="text-[10px] truncate max-w-[130px]">
                                  {feat}
                                </Badge>
                              ))}
                              {featureList.length > 2 && (
                                <Badge variant="secondary" className="text-[10px]">
                                  +{featureList.length - 2} more
                                </Badge>
                              )}
                              {featureList.length === 0 && (
                                <span className="text-xs text-muted-foreground/60">—</span>
                              )}
                            </div>
                          </TableCell>

                          {/* Link */}
                          <TableCell className="text-xs text-muted-foreground">
                            {program.link ? (
                              <a
                                href={program.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline max-w-[140px] truncate"
                              >
                                {program.link} <ExternalLink className="h-3 w-3 shrink-0" />
                              </a>
                            ) : (
                              "—"
                            )}
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge variant={isActive ? "default" : "secondary"}>
                              {isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>

                          {/* Order */}
                          <TableCell className="text-xs font-mono text-muted-foreground">
                            {program.displayOrder ?? program.display_order ?? 0}
                          </TableCell>

                          {/* Actions Three-Dot Menu */}
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Open actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-36">
                                <DropdownMenuItem onClick={() => openViewDrawer(program)}>
                                  <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteProgram(program)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Drawer Side Panel */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto flex flex-col justify-between">
            <div>
              <SheetHeader className="pb-4 border-b">
                <SheetTitle className="text-xl">
                  {isEditMode
                    ? selectedProgram
                      ? "Edit Program"
                      : "Add New Program"
                    : "Program Details"}
                </SheetTitle>
                <SheetDescription>
                  {isEditMode
                    ? "Modify program fields and features list below."
                    : "Detailed view of the selected program."}
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {!isEditMode && selectedProgram ? (
                  /* VIEW MODE */
                  <div className="space-y-6">
                    {/* Header Image & Title */}
                    <div className="space-y-3 pb-4 border-b">
                      <div className="w-full h-40 rounded-xl overflow-hidden bg-muted border relative">
                        {selectedProgram.imageUrl || selectedProgram.image_url ? (
                          <img
                            src={getFullMediaUrl(selectedProgram.imageUrl || selectedProgram.image_url)}
                            alt={selectedProgram.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const raw = selectedProgram.imageUrl || selectedProgram.image_url;
                              if (raw && e.currentTarget.src !== window.location.origin + raw) {
                                e.currentTarget.src = raw;
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Layers className="h-10 w-10 opacity-40" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-foreground">{selectedProgram.title}</h2>
                        <Badge variant={selectedProgram.isActive ?? selectedProgram.is_active ?? true ? "default" : "secondary"}>
                          {selectedProgram.isActive ?? selectedProgram.is_active ?? true ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                        Description
                      </h4>
                      <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border">
                        {selectedProgram.description || "No description provided."}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                        Key Features / Outcomes
                      </h4>
                      {(() => {
                        const featList: string[] = Array.isArray(selectedProgram.features)
                          ? selectedProgram.features
                          : typeof selectedProgram.features === "string"
                          ? JSON.parse(selectedProgram.features || "[]")
                          : [];

                        return featList.length > 0 ? (
                          <ul className="space-y-1.5">
                            {featList.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-foreground bg-muted/20 p-2 rounded border">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">No features listed.</p>
                        );
                      })()}
                    </div>

                    {/* Meta Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Link URL</span>
                        {selectedProgram.link ? (
                          <a
                            href={selectedProgram.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                          >
                            {selectedProgram.link} <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Display Order</span>
                        <span className="font-semibold font-mono text-xs">
                          {selectedProgram.displayOrder ?? selectedProgram.display_order ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* EDIT / CREATE FORM */
                  <Form {...form}>
                    <form id="drawer-program-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Aliko Academy" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Program description and objective..." rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program Image / Banner</FormLabel>
                            <FormControl>
                              <MediaPicker
                                value={field.value}
                                onChange={field.onChange}
                                label="Select Program Image"
                                placeholder="Choose an image from Media Library or upload new"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featuresInput"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Features / Highlights (One per line)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={"AI & Machine Learning\nSoftware Development\nData Analytics"}
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <p className="text-[11px] text-muted-foreground">
                              Enter each key feature or course bullet on a new line.
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>External or Target Link (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. https://... or /programs/..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4 items-center pt-2">
                        <FormField
                          control={form.control}
                          name="displayOrder"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Order</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 pt-6">
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="!mt-0 cursor-pointer">Active</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t flex items-center justify-end gap-3 bg-background">
              {!isEditMode && selectedProgram ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    onClick={() => switchToEditMode(selectedProgram)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit Program
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (selectedProgram) {
                        setIsEditMode(false);
                      } else {
                        setIsDrawerOpen(false);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="drawer-program-form"
                    disabled={save.isPending || (Boolean(selectedProgram) && !isDirty)}
                  >
                    {save.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : selectedProgram ? (
                      isDirty ? "Save Changes" : "No Changes"
                    ) : (
                      "Create Program"
                    )}
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
