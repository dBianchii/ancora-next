import { X } from "lucide-react";
import { useRef, useTransition, type ElementRef } from "react";
import { toast } from "sonner";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { deleteTeam, type getTeams } from "~/server/actions/team";

export const DeleteModal = ({
  team,
}: {
  team: Awaited<ReturnType<typeof getTeams>>[0];
}) => {
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
        <Button variant="ghost">
          <X className="cursor-pointer text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir equipe</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja excluir a equipe {`${team.name}`}?</p>
        <div className="mt-2 flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit} variant="destructive">
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
