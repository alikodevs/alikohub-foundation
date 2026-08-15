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

export function usePublicBoard() {
  return useQuery({
    queryKey: ["public-board"],
    queryFn: publicService.getActiveBoard,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicStaff() {
  return useQuery({
    queryKey: ["public-staff"],
    queryFn: publicService.getActiveStaff,
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

export function usePublicStories() {
  return useQuery({
    queryKey: ["public-stories"],
    queryFn: publicService.getActiveStories,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicInsights() {
  return useQuery({
    queryKey: ["public-insights"],
    queryFn: publicService.getActiveInsights,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicResources() {
  return useQuery({
    queryKey: ["public-resources"],
    queryFn: publicService.getActiveResources,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicFaqs() {
  return useQuery({
    queryKey: ["public-faqs"],
    queryFn: publicService.getActiveFaqs,
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

export function useAdminBoard() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-board"],
    queryFn: cmsService.listBoard,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateBoard(id, values) : cmsService.createBoard(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-board"] });
      queryClient.invalidateQueries({ queryKey: ["public-board"] });
      toast.success(variables.id ? "Board member updated" : "Board member added");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-board"] });
      queryClient.invalidateQueries({ queryKey: ["public-board"] });
      toast.success("Board member deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

export function useAdminStaff() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-staff"],
    queryFn: cmsService.listStaff,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateStaff(id, values) : cmsService.createStaff(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["public-staff"] });
      queryClient.invalidateQueries({ queryKey: ["public-team"] });
      toast.success(variables.id ? "Staff member updated" : "Staff member added");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["public-staff"] });
      queryClient.invalidateQueries({ queryKey: ["public-team"] });
      toast.success("Staff member deleted");
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
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["public-staff"] });
      toast.success(variables.id ? "Team member updated" : "Team member added");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-team"] });
      queryClient.invalidateQueries({ queryKey: ["public-team"] });
      queryClient.invalidateQueries({ queryKey: ["admin-staff"] });
      queryClient.invalidateQueries({ queryKey: ["public-staff"] });
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

export function useAdminStories() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-stories"],
    queryFn: cmsService.listStories,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateStory(id, values) : cmsService.createStory(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-stories"] });
      queryClient.invalidateQueries({ queryKey: ["public-stories"] });
      queryClient.invalidateQueries({ queryKey: ["public-insights"] });
      toast.success(variables.id ? "Story updated" : "Story created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-stories"] });
      queryClient.invalidateQueries({ queryKey: ["public-stories"] });
      queryClient.invalidateQueries({ queryKey: ["public-insights"] });
      toast.success("Story deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

export function useAdminResources() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-resources"],
    queryFn: cmsService.listResources,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateResource(id, values) : cmsService.createResource(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      queryClient.invalidateQueries({ queryKey: ["public-resources"] });
      toast.success(variables.id ? "Resource updated" : "Resource created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      queryClient.invalidateQueries({ queryKey: ["public-resources"] });
      toast.success("Resource deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

export function useAdminFaqs() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: cmsService.listFaqs,
  });

  const save = useMutation({
    mutationFn: ({ id, values }: { id?: string; values: Record<string, unknown> }) =>
      id ? cmsService.updateFaq(id, values) : cmsService.createFaq(values),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      toast.success(variables.id ? "FAQ updated" : "FAQ created");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: cmsService.deleteFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      toast.success("FAQ deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { ...query, save, remove };
}

