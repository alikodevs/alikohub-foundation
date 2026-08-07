import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { publicService } from "@/services/public.service";
import { cmsService } from "@/services/cms.service";
import { toast } from "sonner";

// Public CMS Hooks
export function usePublicHero() {
  return useQuery({
    queryKey: ["public-hero"],
    queryFn: publicService.getActiveHero,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicTeam() {
  return useQuery({
    queryKey: ["public-team"],
    queryFn: publicService.getActiveTeam,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicServices() {
  return useQuery({
    queryKey: ["public-services"],
    queryFn: publicService.getActiveServices,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicPrograms() {
  return useQuery({
    queryKey: ["public-programs"],
    queryFn: publicService.getActivePrograms,
    staleTime: 1000 * 60 * 5,
  });
}

// Admin CMS Hooks
export function useAdminHero() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-hero"],
    queryFn: cmsService.listHero,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateHero(id, values) : cmsService.createHero(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero"] });
      queryClient.invalidateQueries({ queryKey: ["public-hero"] });
      toast.success(variables.id ? "Hero updated" : "Hero created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero"] });
      queryClient.invalidateQueries({ queryKey: ["public-hero"] });
      toast.success("Hero item deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

export function useAdminTeam() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-team"],
    queryFn: cmsService.listTeam,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateTeam(id, values) : cmsService.createTeam(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      queryClient.invalidateQueries({ queryKey: ["public-team"] });
      toast.success(variables.id ? "Team member updated" : "Team member added");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      queryClient.invalidateQueries({ queryKey: ["public-team"] });
      toast.success("Team member deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

export function useAdminServices() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-services"],
    queryFn: cmsService.listServices,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateService(id, values) : cmsService.createService(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["public-services"] });
      toast.success(variables.id ? "Service updated" : "Service created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["public-services"] });
      toast.success("Service deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

export function useAdminPrograms() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-programs"],
    queryFn: cmsService.listPrograms,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateProgram(id, values) : cmsService.createProgram(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
      queryClient.invalidateQueries({ queryKey: ["public-programs"] });
      toast.success(variables.id ? "Program updated" : "Program created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
      queryClient.invalidateQueries({ queryKey: ["public-programs"] });
      toast.success("Program deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}
