import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mediaService, MediaItem } from "@/services/media.service";
import { toast } from "sonner";

export type { MediaItem };

export function useMediaList() {
  return useQuery({
    queryKey: ["admin-media"],
    queryFn: mediaService.listMedia,
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, name, altText }: { file: File; name?: string; altText?: string }) =>
      mediaService.uploadMedia(file, name, altText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast.success("File uploaded successfully");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to upload file"),
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaService.deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast.success("File deleted successfully");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to delete file"),
  });
}
