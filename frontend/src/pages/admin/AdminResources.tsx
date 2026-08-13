import { useState } from "react";
import { Plus, Trash2, Edit2, Loader2, FileText, Link as LinkIcon, Download } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAdminResources } from "@/hooks/useCms";
import { MediaPicker, getFullMediaUrl } from "@/components/admin/MediaPicker";

interface ResourceItem {
  id: string;
  title: string;
  slug?: string;
  category: "briefs" | "evidence" | "curricula" | "policies" | string;
  tag?: string | null;
  description?: string | null;
  fileUrl?: string | null;
  file_url?: string | null;
  externalUrl?: string | null;
  external_url?: string | null;
  accent?: string | null;
  displayOrder?: number;
  display_order?: number;
  isActive?: boolean;
  is_active?: boolean;
}

export default function AdminResources() {
  const { data: resourcesData, isLoading, save, remove } = useAdminResources();
  const resources = (resourcesData || []) as ResourceItem[];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResourceItem | null>(null);

  // Form State
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState<string>("briefs");
  const [tagInput, setTagInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [fileUrlInput, setFileUrlInput] = useState("");
  const [externalUrlInput, setExternalUrlInput] = useState("");
  const [accentInput, setAccentInput] = useState("");
  const [displayOrderInput, setDisplayOrderInput] = useState<number>(0);
  const [isActiveInput, setIsActiveInput] = useState<boolean>(true);

  function resetForm() {
    setEditingItem(null);
    setTitleInput("");
    setCategoryInput("briefs");
    setTagInput("");
    setDescriptionInput("");
    setFileUrlInput("");
    setExternalUrlInput("");
    setAccentInput("");
    setDisplayOrderInput(0);
    setIsActiveInput(true);
  }

  function handleOpenCreate() {
    resetForm();
    setIsDialogOpen(true);
  }

  function handleOpenEdit(item: ResourceItem) {
    setEditingItem(item);
    setTitleInput(item.title || "");
    setCategoryInput(item.category || "briefs");
    setTagInput(item.tag || "");
    setDescriptionInput(item.description || "");
    setFileUrlInput(item.fileUrl || item.file_url || "");
    setExternalUrlInput(item.externalUrl || item.external_url || "");
    setAccentInput(item.accent || "");
    setDisplayOrderInput(item.displayOrder ?? item.display_order ?? 0);
    setIsActiveInput(item.isActive ?? item.is_active ?? true);
    setIsDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titleInput.trim()) return;

    await save.mutateAsync({
      id: editingItem?.id,
      values: {
        title: titleInput.trim(),
        category: categoryInput,
        tag: tagInput.trim() || undefined,
        description: descriptionInput.trim() || undefined,
        fileUrl: fileUrlInput.trim() || undefined,
        externalUrl: externalUrlInput.trim() || undefined,
        accent: accentInput.trim() || undefined,
        displayOrder: Number(displayOrderInput) || 0,
        isActive: isActiveInput,
      },
    });

    setIsDialogOpen(false);
    resetForm();
  }

  async function handleDelete(item: ResourceItem) {
    if (!confirm(`Delete resource "${item.title}"?`)) return;
    remove.mutate(item.id);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Resources</h1>
            <p className="text-muted-foreground mt-1">
              Manage shareable program briefs, evaluations, curricula, and policy documents
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 py-2">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Resource" : "Add New Resource"}</DialogTitle>
                  <DialogDescription>
                    Provide downloadable files or external references for partners and hub members.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={categoryInput} onValueChange={setCategoryInput}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="briefs">Program Briefs</SelectItem>
                        <SelectItem value="evidence">Research & Evidence</SelectItem>
                        <SelectItem value="curricula">Open Curricula</SelectItem>
                        <SelectItem value="policies">Policies & Safeguards</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tag">Custom Tag</Label>
                    <Input
                      id="tag"
                      placeholder="e.g. Briefs, Evidence, Policies"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Resource Title *</Label>
                  <Input
                    id="title"
                    required
                    placeholder="e.g. 2025 Digital Health Curriculum"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="Brief details about objectives, target audience, or contents..."
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                  />
                </div>

                <MediaPicker
                  label="Attach File / Document"
                  value={fileUrlInput}
                  onChange={setFileUrlInput}
                />

                <div className="space-y-2">
                  <Label htmlFor="externalUrl">External URL (optional)</Label>
                  <Input
                    id="externalUrl"
                    placeholder="https://..."
                    value={externalUrlInput}
                    onChange={(e) => setExternalUrlInput(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      value={displayOrderInput}
                      onChange={(e) => setDisplayOrderInput(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t sm:border-t-0 sm:pt-4">
                    <Label htmlFor="isActive" className="cursor-pointer font-medium">Active / Visible</Label>
                    <Switch
                      id="isActive"
                      checked={isActiveInput}
                      onCheckedChange={setIsActiveInput}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={save.isPending}>
                    {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingItem ? "Update Resource" : "Save Resource"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : resources.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="font-semibold text-lg">No resources created yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click &quot;Add Resource&quot; above to create your first item.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((item) => {
              const file = item.fileUrl || item.file_url;
              const external = item.externalUrl || item.external_url;
              const downloadLink = file ? getFullMediaUrl(file) : external;

              return (
                <Card key={item.id} className="overflow-hidden flex flex-col justify-between group hover:shadow-md transition">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="capitalize text-xs font-semibold">
                        {item.tag || item.category}
                      </Badge>
                      {!(item.isActive ?? item.is_active ?? true) && (
                        <Badge variant="destructive" className="text-xs">Inactive</Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-base leading-snug">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{item.description}</p>
                      )}
                    </div>

                    {downloadLink && (
                      <div className="pt-1">
                        <a
                          href={downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" /> Direct File Link
                        </a>
                      </div>
                    )}
                  </CardContent>

                  <div className="p-4 border-t flex items-center justify-between bg-muted/20">
                    <span className="text-xs text-muted-foreground font-mono">
                      Order: {item.displayOrder ?? item.display_order ?? 0}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)}>
                        <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
