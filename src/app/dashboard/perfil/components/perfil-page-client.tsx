"use client";

import { useQuery } from "@tanstack/react-query";

import { getUser } from "~/server/actions/user";
import { ProfileCard } from "./profile-form";

export function PerfilPageClient({
  user,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  const query = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
    initialData: user,
    refetchOnMount: false,
  });

  return (
    <>
      <ProfileCard user={query.data} /> 
    </>
  )
}
