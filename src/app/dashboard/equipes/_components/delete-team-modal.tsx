import { type ElementRef, useRef, useTransition, } from "react";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Icons } from "~/components/icons";
import { toast } from "sonner";
import { deleteTeam } from "~/server/actions/team";
import type { ITeam } from "./model";
import { X } from 'lucide-react';


export const DeleteModal = ({ team }: { team: ITeam }) => {
	const [isPending, startTransition] = useTransition();
	const closeRef = useRef<ElementRef<"button">>(null);

	const onSubmit = () => {
		startTransition(() => {
			deleteTeam(team.id)
				.then(() => {
					toast.success("Equipe excluída");
					closeRef?.current?.click();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost"><X className="text-red-500 cursor-pointer" /></Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir equipe</DialogTitle>
				</DialogHeader>
				<p>Tem certeza que deseja excluir a equipe {`${team.name}`}?</p>
				<div className="flex justify-between mt-2">
					<DialogClose ref={closeRef} asChild>
						<Button variant="ghost">Cancelar</Button>
					</DialogClose>
					<Button disabled={isPending} onClick={onSubmit} variant="destructive">
						{isPending && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}Excluir
					</Button>
				</div>
			</DialogContent>
		</Dialog >
	);
};