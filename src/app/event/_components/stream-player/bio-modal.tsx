"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, type ElementRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { updateUser } from "~/server/actions/user";

interface BioModalProps {
  initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue ?? "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="ml-auto">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar bio do usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Digite a sua bio aqui..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
