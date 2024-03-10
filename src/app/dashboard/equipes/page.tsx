import React from "react";
import { CreateTeamModal } from "./_components/create-team-modal";
import { NoTeam } from "./_components/no-team";
import { TeamTable } from "./_components/team-table";

export default function EquipesPage() {
	const Equipes = [
		{
			name: "Funcionários",
			members: []
		},
		{
			name: "Colaboradores",
			members: []
		},
		{
			name: "Afiliadas",
			members: []
		}
	];

	return <>
		<div >
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Equipes</h1>
				<CreateTeamModal />
			</div>
			<div className="space-y-4">
				{
					Equipes.length === 0
						? <NoTeam />
						: <>
						<TeamTable teams={Equipes}/>
						</>
				}
			</div>
		</div>
	</>
}
