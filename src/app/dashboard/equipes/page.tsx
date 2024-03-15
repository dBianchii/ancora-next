import { getTeams } from "~/server/actions/team";
import { EquipesPageClient } from "./_components/equipes-page-client";
import { Suspense } from "react";

export default async function EquipesPage() {
  return (
    <Suspense>
      <EquipesPageSuspense />
    </Suspense>
  );
}

async function EquipesPageSuspense() {
  const initialTeams = await getTeams();

  return (
    <Suspense>
      <EquipesPageClient initialTeams={initialTeams} />
    </Suspense>
  );
}
