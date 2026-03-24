import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Appointment,
  AppointmentStatus,
  News,
  Scheme,
  Service,
} from "../backend.d";
import { useActor } from "./useActor";

export function useAllServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllSchemes() {
  const { actor, isFetching } = useActor();
  return useQuery<Scheme[]>({
    queryKey: ["schemes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSchemes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllNews() {
  const { actor, isFetching } = useActor();
  return useQuery<News[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookAppointment(appointment);
    },
  });
}

export function useAddService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      if (!actor) throw new Error("Not connected");
      return actor.addService(service);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, service }: { id: bigint; service: Service }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateService(id, service);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteService(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useAddScheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (scheme: Scheme) => {
      if (!actor) throw new Error("Not connected");
      return actor.addScheme(scheme);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schemes"] }),
  });
}

export function useUpdateScheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, scheme }: { id: bigint; scheme: Scheme }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateScheme(id, scheme);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schemes"] }),
  });
}

export function useDeleteScheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteScheme(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schemes"] }),
  });
}

export function useAddNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (news: News) => {
      if (!actor) throw new Error("Not connected");
      return actor.addNews(news);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useUpdateNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, news }: { id: bigint; news: News }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateNews(id, news);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useDeleteNews() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteNews(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["news"] }),
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: AppointmentStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAppointmentStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}

export function useSeedData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedInitialData();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      qc.invalidateQueries({ queryKey: ["schemes"] });
      qc.invalidateQueries({ queryKey: ["news"] });
    },
  });
}
