"use client";

import { useRef, type ElementRef } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { createTeam } from "./create-team";


export const CreateTeamModal = () => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmit = () => {
		if (!inputRef.current?.value) {
			toast.error("O nome da equipe é obrigatório");
			return;
		} else {
			createTeam(inputRef.current.value)
			.then(() => {
				toast.success("Equipe criada");
				closeRef?.current?.click();
			}).catch(() => {
				toast.error("Algo deu errado");
			});

		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Criar equipe</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar equipe</DialogTitle>
				</DialogHeader>
				<Input
					onKeyDown={(e) => e.key === "Enter" && onSubmit()}
					type="text"
					ref={inputRef}
					placeholder="Nome da equipe" />
				<div className="flex justify-between">
					<DialogClose ref={closeRef} asChild>
						<Button variant="ghost">Cancelar</Button>
					</DialogClose>
					<Button onClick={onSubmit}>
						Criar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
