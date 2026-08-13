import { useState } from "react";
import { Plus, Trash2, Edit2, Loader2, BookOpen, User, Calendar, Image as ImageIcon } from "lucide-react";
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
import { useAdminStories } from "@/hooks/useCms";
import { MediaPicker, getFullMediaUrl } from "@/components/admin/MediaPicker";

interface StoryItem {
  id: string;
  type?: "story" | "insight" | string;
  title: string;
  slug?: string;
  excerpt?: string | null;
  body?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  authorName?: string | null;
  author_name?: string | null;
  publishedAt?: string | null;
  displayOrder?: number;
  display_order?: number;
  isActive?: boolean;
  is_active?: boolean;
}

export default function AdminStories() {
  const { data: storiesData, isLoading, save, remove } = useAdminStories();
  const stories = (storiesData || []) as StoryItem[];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StoryItem | null>(null);

  // Form State
  const [typeInput, setTypeInput] = useState<string>("story");
  const [titleInput, setTitleInput] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [excerptInput, setExcerptInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [authorNameInput, setAuthorNameInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [displayOrderInput, setDisplayOrderInput] = useState<number>(0);
  const [isActiveInput, setIsActiveInput] = useState<boolean>(true);

  function resetForm() {
    setEditingItem(null);
    setTypeInput("story");
    setTitleInput("");
    setSlugInput("");
    setExcerptInput("");
    setBodyInput("");
    setAuthorNameInput("");
    setImageUrlInput("");
    setDisplayOrderInput(0);
    setIsActiveInput(true);
  }

  function handleOpenCreate() {
    resetForm();
    setIsDialogOpen(true);
  }

  function handleOpenEdit(item: StoryItem) {
    setEditingItem(item);
    setTypeInput(item.type || "story");
    setTitleInput(item.title || "");
    setSlugInput(item.slug || "");
    setExcerptInput(item.excerpt || "");
    setBodyInput(item.body || "");
    setAuthorNameInput(item.authorName || item.author_name || "");
    setImageUrlInput(item.imageUrl || item.image_url || "");
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
        type: typeInput,
        title: titleInput.trim(),
        slug: slugInput.trim() || undefined,
        excerpt: excerptInput.trim() || undefined,
        body: bodyInput.trim() || undefined,
        authorName: authorNameInput.trim() || undefined,
        imageUrl: imageUrlInput.trim() || undefined,
        displayOrder: Number(displayOrderInput) || 0,
        isActive: isActiveInput,
      },
    });

    setIsDialogOpen(false);
    resetForm();
  }

  async function handleDelete(item: StoryItem) {
    if (!confirm(`Delete story "${item.title}"?`)) return;
    remove.mutate(item.id);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stories & Insights</h1>
            <p className="text-muted-foreground mt-1">
              Manage field narratives, practitioner notes, and impact articles
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Story / Insight
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 py-2">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit Story / Insight" : "Add New Story / Insight"}</DialogTitle>
                  <DialogDescription>
                    Publish field stories, updates, or technical insights for the community.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Article Type</Label>
                    <Select value={typeInput} onValueChange={setTypeInput}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="insight">Insight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authorName">Author Name</Label>
                    <Input
                      id="authorName"
                      placeholder="e.g. Lensa Aliko"
                      value={authorNameInput}
                      onChange={(e) => setAuthorNameInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    placeholder="Story headline"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Short Summary / Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    rows={2}
                    placeholder="Brief 1-2 sentence overview for cards..."
                    value={excerptInput}
                    onChange={(e) => setExcerptInput(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Full Article Body</Label>
                  <Textarea
                    id="body"
                    rows={5}
                    placeholder="Full story content..."
                    value={bodyInput}
                    onChange={(e) => setBodyInput(e.target.value)}
                  />
                </div>

                <MediaPicker
                  label="Cover Image"
                  value={imageUrlInput}
                  onChange={setImageUrlInput}
                />

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
                    <Label htmlFor="isActive" className="cursor-pointer font-medium">Published / Active</Label>
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
                    {editingItem ? "Update Story" : "Publish Story"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stories List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : stories.length === 0 ? (
          <Card className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="font-semibold text-lg">No stories published yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click &quot;Add Story / Insight&quot; above to create your first article.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((item) => {
              const imageSrc = item.imageUrl || item.image_url;
              const author = item.authorName || item.author_name;

              return (
                <Card key={item.id} className="overflow-hidden flex flex-col justify-between group hover:shadow-md transition">
                  <div>
                    <div className="aspect-[16/9] bg-muted relative overflow-hidden flex items-center justify-center border-b">
                      {imageSrc ? (
                        <img
                          src={getFullMediaUrl(imageSrc)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                      )}
                      <div className="absolute top-2 left-2 flex gap-1">
                        <Badge variant="secondary" className="capitalize text-xs font-semibold">
                          {item.type || "story"}
                        </Badge>
                        {!(item.isActive ?? item.is_active ?? true) && (
                          <Badge variant="destructive" className="text-xs">Draft</Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-2">
                      <h3 className="font-bold text-base leading-snug line-clamp-2">{item.title}</h3>
                      {item.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
                      )}
                      {author && (
                        <div className="flex items-center gap-1.5 text-xs text-primary font-medium pt-2">
                          <User className="h-3.5 w-3.5" />
                          <span>{author}</span>
                        </div>
                      )}
                    </CardContent>
                  </div>

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
