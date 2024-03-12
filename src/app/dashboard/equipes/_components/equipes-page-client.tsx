"use client";

import { useQuery } from "@tanstack/react-query";
import { getTeams } from "~/server/actions/team";
import { CreateTeamModal } from "./create-team-modal";
import { NoTeam } from "./no-team";
import { TeamTable } from "./team-table";

export function EquipesPageClient({
  initialTeams,
}: {
  initialTeams: Awaited<ReturnType<typeof getTeams>>;
}) {
  const query = useQuery({
    queryKey: ["getTeams"],
    queryFn: () => getTeams(),
    initialData: initialTeams,
    refetchOnMount: false,
  });

  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Equipes</h1>
          <CreateTeamModal />
        </div>
        <div className="space-y-4">
          {/* {query.isFetching && <>Loading...</>} */}
          {query.data?.length === 0 ? (
            <NoTeam />
          ) : (
            <>
              <TeamTable teams={query.data} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
