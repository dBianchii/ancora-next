import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table"

import type { ITeam } from "./model";
import { DeleteModal } from "./delete-team-modal";
import { AlterModal } from "./alter-team-members-modal";

export function TeamTable({ teams }: { teams: ITeam[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead className="text-center">Quantidade de membros</TableHead>
					<TableHead className="text-center">Alterar membros</TableHead>
					<TableHead className="text-right">Excluir equipe</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teams.map((team) => (
					<TableRow key={team.id}>
						<TableCell className="font-medium">{team.name}</TableCell>
						<TableCell className="text-center">{team.usersEmails.length}</TableCell>
						<TableCell className="text-center">
							<AlterModal team={team} />	
						</TableCell>
						<TableCell className="text-right">
							<DeleteModal team={team} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}


