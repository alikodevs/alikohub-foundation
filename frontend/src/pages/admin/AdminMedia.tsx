import { useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  Loader2,
  Upload,
  Trash2,
  Copy,
  Check,
  Plus,
  Search,
  Image as ImageIcon,
  FileText,
  Code,
  Info,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { getFullMediaUrl } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaList, useUploadMedia, useDeleteMedia, MediaItem } from "@/hooks/useMedia";

export default function AdminMedia() {
  const { data: filesData, isLoading } = useMediaList();
  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();

  const files = (filesData || []) as MediaItem[];

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");

  // Upload Modal State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [altTextInput, setAltTextInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedHtmlId, setCopiedHtmlId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setSelectedFile(null);
    setPreviewUrl(null);
    setNameInput("");
    setAltTextInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    if (!nameInput) {
      setNameInput(file.name);
    }

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }

  async function handleUploadSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        name: nameInput.trim() || selectedFile.name,
        altText: altTextInput.trim() || undefined,
      });

      resetForm();
      setIsDialogOpen(false);
    } catch {
      // Error handled by mutation toast
    }
  }

  async function deleteFile(file: MediaItem) {
    const displayName = file.name || file.filename || "this file";
    if (!confirm(`Are you sure you want to delete "${displayName}"?`)) return;
    deleteMutation.mutate(file.id);
  }

  function copyUrl(file: MediaItem) {
    const fullUrl = getFullMediaUrl(file.url);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Media URL copied to clipboard");
  }

  function copyHtmlTag(file: MediaItem) {
    const fullUrl = getFullMediaUrl(file.url);
    const alt = file.altText || file.alt_text || file.name || "";
    const htmlSnippet = `<img src="${fullUrl}" alt="${alt}" />`;
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedHtmlId(file.id);
    setTimeout(() => setCopiedHtmlId(null), 2000);
    toast.success("HTML <img> tag copied to clipboard");
  }


  function formatFileSize(bytes: number | null | undefined): string {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const filteredFiles = files.filter((file) => {
    const name = (file.name || file.filename || "").toLowerCase();
    const alt = (file.altText || file.alt_text || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || alt.includes(q);
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
            <p className="text-muted-foreground mt-1">
              Upload and manage assets with alt text for WCAG accessibility and SEO
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleUploadSubmit}>
                <DialogHeader>
                  <DialogTitle>Upload New Media Asset</DialogTitle>
                  <DialogDescription>
                    Select a file and specify its display name and alternative text for accessibility.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  {/* File Selection Area */}
                  <div className="space-y-2">
                    <Label htmlFor="file">File</Label>
                    <div
                      className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition cursor-pointer flex flex-col items-center justify-center min-h-[120px]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Input
                        ref={fileInputRef}
                        id="file"
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      {previewUrl ? (
                        <div className="relative group w-full flex justify-center">
                          <img
                            src={previewUrl}
                            alt="Upload preview"
                            className="max-h-36 rounded border object-contain"
                          />
                        </div>
                      ) : selectedFile ? (
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <FileText className="h-6 w-6 text-primary" />
                          <span>{selectedFile.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({formatFileSize(selectedFile.size)})
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <Upload className="h-8 w-8 mb-1 text-muted-foreground/70" />
                          <p className="text-sm font-medium">Click or drag file to select</p>
                          <p className="text-xs text-muted-foreground/70">
                            Supports PNG, JPG, WEBP, GIF, PDF
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Media Name / Title</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Water Campaign Header"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Friendly label used inside the Admin Dashboard.
                    </p>
                  </div>

                  {/* Alt Text Input */}
                  <div className="space-y-2">
                    <Label htmlFor="altText" className="flex items-center gap-1">
                      <span>Alt Text</span>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal">
                        Accessibility
                      </Badge>
                    </Label>
                    <Textarea
                      id="altText"
                      placeholder="Describe the image content for screen readers (e.g. Volunteers distributing fresh water containers in village)..."
                      rows={3}
                      value={altTextInput}
                      onChange={(e) => setAltTextInput(e.target.value)}
                    />
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3 inline text-primary shrink-0" />
                      Provides descriptions for screen readers (WCAG) and search engine indexing.
                    </p>
                  </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!selectedFile || uploadMutation.isPending}>
                    {uploadMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Toolbar: Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media by title or alt text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground flex flex-col items-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground/40 mb-3" />
              {searchQuery ? (
                <>
                  <p className="font-medium text-foreground">No matching media found</p>
                  <p className="text-sm mt-1">Try adjusting your search query "{searchQuery}"</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-foreground">No media assets uploaded yet</p>
                  <p className="text-sm mt-1">Click "Upload Media" to add your first asset.</p>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredFiles.map((file) => {
              const fullUrl = getFullMediaUrl(file.url);
              const altTextVal = file.altText || file.alt_text;
              const fileTypeVal = file.fileType || file.file_type || file.mimeType;
              const fileSizeVal = file.fileSize || file.file_size || file.size;

              const isImage =
                fileTypeVal?.startsWith("image/") ||
                Boolean(file.url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i));

              return (
                <Card key={file.id} className="overflow-hidden flex flex-col justify-between group hover:shadow-md transition">
                  <div>
                    {/* Visual Container */}
                    <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center border-b">
                      {isImage ? (
                        <img
                          src={fullUrl}
                          alt={altTextVal || file.name || "Media asset"}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />

                      ) : (
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <FileText className="h-10 w-10" />
                          <span className="text-xs uppercase font-mono">{fileTypeVal || "FILE"}</span>
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground truncate" title={file.name || file.filename}>
                          {file.name || file.filename || "Untitled Asset"}
                        </h3>
                      </div>

                      {/* Alt Text Badge / Snippet */}
                      {altTextVal ? (
                        <p className="text-xs text-muted-foreground bg-muted/50 p-1.5 rounded border border-border/50 line-clamp-2" title={`Alt text: ${altTextVal}`}>
                          <span className="font-semibold text-foreground">Alt:</span> {altTextVal}
                        </p>
                      ) : (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                          No alt text provided
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                        <span>{formatFileSize(fileSizeVal)}</span>
                        {file.createdAt && (
                          <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  {/* Actions */}
                  <div className="p-3 pt-0 border-t bg-muted/20 flex items-center gap-1.5 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => copyUrl(file)}
                      title="Copy public URL"
                    >
                      {copiedId === file.id ? (
                        <>
                          <Check className="h-3 w-3 mr-1 text-emerald-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          URL
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => copyHtmlTag(file)}
                      title="Copy <img> HTML tag"
                    >
                      {copiedHtmlId === file.id ? (
                        <Check className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Code className="h-3 w-3" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteFile(file)}
                      title="Delete media asset"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
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
