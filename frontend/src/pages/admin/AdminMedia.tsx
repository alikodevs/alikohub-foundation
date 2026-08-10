import { useState, useRef } from "react";
import { Loader2, Upload, Trash2, Copy, Check } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMediaList, useUploadMedia, useDeleteMedia, MediaItem } from "@/hooks/useMedia";

export default function AdminMedia() {
  const { data: filesData, isLoading } = useMediaList();
  const uploadMutation = useUploadMedia();
  const deleteMutation = useDeleteMedia();
  const files = (filesData || []) as unknown as Array<MediaItem & { name?: string; alt_text?: string; file_size?: number; created_at?: string }>;
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    for (const file of Array.from(selectedFiles)) {
      await uploadMutation.mutateAsync({ file, name: file.name });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function deleteFile(file: { id: string }) {
    if (!confirm("Are you sure you want to delete this file?")) return;
    deleteMutation.mutate(file.id);
  }

  function copyUrl(file: MediaFile) {
    const fullUrl = file.url.startsWith("http") ? file.url : `http://localhost:4000${file.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Copied!", description: "URL copied to clipboard" });
  }

  function formatFileSize(bytes: number | null | undefined): string {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Media Library</h1>
            <p className="text-muted-foreground mt-1">Upload and manage images and files</p>
          </div>
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload Files
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : files.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No files uploaded yet. Click "Upload Files" to add some.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map((file) => {
              const fullUrl = file.url.startsWith("http") ? file.url : `http://localhost:4000${file.url}`;
              return (
                <Card key={file.id} className="overflow-hidden">
                  <div className="aspect-square bg-muted relative">
                    {file.file_type?.startsWith("image/") || file.url.match(/\.(jpg|png|webp|gif|jpeg)/i) ? (
                      <img
                        src={fullUrl}
                        alt={file.alt_text || file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        File
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => copyUrl(file)}
                      >
                        {copiedId === file.id ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteFile(file)}
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
