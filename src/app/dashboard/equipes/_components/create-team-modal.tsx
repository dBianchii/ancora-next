"use client";

import { useRef, useState, type ElementRef } from "react";
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
import { createTeam } from "~/server/actions/team";
import { Icons } from "~/components/icons";

export const CreateTeamModal = () => {
  // useTransition fake (não consegui implementar, o isPending continua true mesmo após a requisição ser finalizada)
  const [isPending, startTransition] = useState(false);
  const closeRef = useRef<ElementRef<"button">>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      toast.error("O nome da equipe é obrigatório");
      return;
    }
    startTransition(true);
    await createTeam(inputValue)
      .then((res) => {
        toast.success(`Equipe ${res.name} criada`);
        closeRef.current?.click();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        inputRef.current!.value = "";
        startTransition(false);
      });
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
          disabled={isPending}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          type="text"
          ref={inputRef}
          placeholder="Nome da equipe"
        />
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
