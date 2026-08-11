import { useState, useRef, ChangeEvent } from "react";
import {
  Image as ImageIcon,
  Upload,
  X,
  Search,
  Check,
  Loader2,
  Plus,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMediaList, useUploadMedia, MediaItem } from "@/hooks/useMedia";

export interface MediaPickerProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function getFullMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  return `${baseUrl}${cleanUrl}`;
}

export function MediaPicker({
  value,
  onChange,
  label = "Select Image",
  placeholder = "No image selected",
  disabled = false,
}: MediaPickerProps) {
  const { data: mediaData, isLoading, isError } = useMediaList();
  const uploadMutation = useUploadMedia();
  const mediaItems = (mediaData || []) as MediaItem[];

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fullSelectedUrl = getFullMediaUrl(value);

  const filteredMedia = mediaItems.filter((item) => {
    const name = (item.name || item.filename || "").toLowerCase();
    const alt = (item.altText || item.alt_text || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || alt.includes(q);
  });

  async function handleDirectUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedItem = await uploadMutation.mutateAsync({
        file,
        name: file.name,
      });

      if (uploadedItem && uploadedItem.url) {
        onChange(uploadedItem.url);
        toast.success("Image uploaded and selected!");
        setIsOpen(false);
      }
    } catch {
      // Error toast already handled by hook
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleSelectMedia(item: MediaItem) {
    onChange(item.url);
    setIsOpen(false);
  }

  function handleClear() {
    onChange("");
  }

  return (
    <div className="space-y-2">
      {/* Current Selection / Trigger Display */}
      {value ? (
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-card text-card-foreground">
          <div className="relative w-14 h-14 rounded-md overflow-hidden bg-muted border flex-shrink-0 flex items-center justify-center">
            <img
              src={fullSelectedUrl}
              alt="Selected media"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to relative URL if direct host fails
                if (value && e.currentTarget.src !== window.location.origin + value) {
                  e.currentTarget.src = value;
                }
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono truncate text-muted-foreground">{value}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(true)}
              disabled={disabled}
            >
              Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={disabled}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={disabled}
          className="w-full border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition cursor-pointer flex flex-col items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="p-2 rounded-full bg-muted group-hover:bg-background transition">
            <ImageIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{placeholder}</p>
          </div>
        </button>
      )}

      {/* Modal Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>
              Select an image from the library or upload a new one directly.
            </DialogDescription>
          </DialogHeader>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 py-2 border-b">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media by title or alt text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Quick Upload Button */}
            <div className="w-full sm:w-auto">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleDirectUpload}
                className="hidden"
                id="media-picker-upload"
              />
              <Button
                type="button"
                size="sm"
                className="w-full sm:w-auto"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Media Grid Container */}
          <div className="flex-1 overflow-y-auto min-h-[250px] max-h-[420px] py-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-xs">Loading media assets...</p>
              </div>
            ) : isError ? (
              <div className="text-center py-12 text-destructive text-sm">
                Failed to load media library. Please try again.
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground flex flex-col items-center gap-2">
                <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground">
                  {searchQuery ? "No matching media found" : "No media assets found"}
                </p>
                <p className="text-xs">
                  {searchQuery
                    ? "Try a different search keyword."
                    : 'Click "Upload New" to add an image.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredMedia.map((item) => {
                  const fullUrl = getFullMediaUrl(item.url);
                  const isSelected = value === item.url;
                  const altTextVal = item.altText || item.alt_text;
                  const fileTypeVal = item.fileType || item.file_type || item.mimeType;

                  const isImage =
                    fileTypeVal?.startsWith("image/") ||
                    Boolean(item.url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i));

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectMedia(item)}
                      className={`group relative rounded-lg border-2 overflow-hidden text-left bg-card transition hover:border-primary focus:outline-none ${
                        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border"
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
                        {isImage ? (
                          <img
                            src={fullUrl}
                            alt={altTextVal || item.name || "Media"}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                            onError={(e) => {
                              if (item.url && e.currentTarget.src !== window.location.origin + item.url) {
                                e.currentTarget.src = item.url;
                              }
                            }}
                          />
                        ) : (
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        )}

                        {/* Selected Indicator Badge */}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground p-1 rounded-full shadow">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Info Footer */}
                      <div className="p-2 border-t text-[11px] bg-card">
                        <p className="font-medium text-foreground truncate" title={item.name || item.filename}>
                          {item.name || item.filename || "Untitled"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
