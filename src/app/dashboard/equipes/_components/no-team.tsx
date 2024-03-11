import React from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export function NoTeam() {
	return (
		<Card className="w-full text-center">
			<CardHeader>
				<CardTitle>
					Nenhuma equipe encontrada
				</CardTitle>
				<CardDescription>
					Crie uma nova equipe para começar a adicionar e-mails.
				</CardDescription>
			</CardHeader>
		</Card>
	);
}