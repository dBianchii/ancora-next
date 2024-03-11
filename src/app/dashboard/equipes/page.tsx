"use client";

import React, { useEffect, useState } from "react";
import { CreateTeamModal } from "./_components/create-team-modal";
import { NoTeam } from "./_components/no-team";
import { TeamTable } from "./_components/team-table";
import { getTeams } from "~/server/actions/team";
import type { ITeam } from "./_components/model";

export default function EquipesPage() {
	const [teams, setTeams] = useState<ITeam[]>([]);

	useEffect(() => {
		getTeams()
		.then((team) => {	
			setTeams(team);
		}).catch(
			(err) => {
				console.log(err);
			}
		);
	}, [teams]);


	return <>
		<div >
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold">Equipes</h1>
				<CreateTeamModal />
			</div>
			<div className="space-y-4">
				{
					teams?.length === 0
						? <NoTeam />
						: <>
						<TeamTable teams={teams}/>
						</>
				}
			</div>
		</div>
	</>
}
