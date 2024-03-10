import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table"

import { UserRoundPlus, X } from 'lucide-react';

interface Member {
	name: string;
	email: string;
}

interface Team {
	name: string;
	members: Member[];
}

export function TeamTable({ teams }: { teams: Team[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead className="text-center">Quantidade de membros</TableHead>
					<TableHead className="text-center">Adicionar membros</TableHead>
					<TableHead className="text-right">Excluir equipe</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teams.map((team) => (
					<TableRow key={team.name}>
						<TableCell className="font-medium">{team.name}</TableCell>
						<TableCell className="text-center">{team.members.length}</TableCell>
						<TableCell><UserRoundPlus className="m-auto text-primary/70 cursor-pointer"/></TableCell>
						<TableCell className="flex justify-end"><X className="text-red-500 cursor-pointer"/></TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
