"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createEvent, getEvents } from "../../server/actions/stream";
import { getTeams } from "../../server/actions/team";
import { toast } from "sonner";

export const useEventsData = () => {
  const query = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      await query.refetch();
      toast.success("Evento criado com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { query, mutation };
};

export const useTeamsData = () => {
  const query = useQuery({
    queryKey: ["getTeams"],
    queryFn: () => getTeams(),
  });

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      await query.refetch();
      toast.success("Evento criado com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { query, mutation };
};
