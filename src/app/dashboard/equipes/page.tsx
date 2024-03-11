import { getTeams } from "~/server/actions/team";
import { EquipesPageClient } from "./_components/equipes-page-client";

export default async function EquipesPage() {
  const initialTeams = await getTeams();

  return <EquipesPageClient initialTeams={initialTeams} />;
}
