"use client";

import { type ElementRef, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { X } from "lucide-react";
import { Icons } from "~/components/icons";
import { toast } from "sonner";
import { updateTeam, type getTeams } from "~/server/actions/team";
import { UserRound } from "lucide-react";
import { Input } from "~/components/ui/input";

export const AlterModal = ({
  team,
}: {
  team: Awaited<ReturnType<typeof getTeams>>[number];
}) => {
  // useTransition fake (não consegui implementar, o isPending continua true mesmo após a requisição ser finalizada)
  const [isPending, startTransition] = useState(false);
  const closeRef = useRef<ElementRef<"button">>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [emails, setEmail] = useState<string[]>(team.usersEmails);

  const onSubmit = async (teamId: string) => {
    startTransition(true);
    await updateTeam({ teamId, emails })
      .then(() => {
        toast.success("Membros atualizados");
      })
      .catch(() => {
        toast.error("Erro ao atualizar membros");
      })
      .finally(() => {
        startTransition(false);
      });
    closeRef.current?.click();
  };

  function addMember() {
    const email = inputRef.current?.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      toast.error("Digite um e-mail");
      return;
    }
    if (emails.includes(email)) {
      toast.error("Este e-mail já foi adicionado");
      return;
    }
    if (!email || !emailRegex.test(email)) {
      toast.error("Digite um e-mail válido");
      return;
    }

    setEmail([...emails, email.toLowerCase()]);
    inputRef.current.value = "";
  }

  function removeMember(email: string) {
    setEmail(emails.filter((e) => e !== email));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <UserRound className="cursor-pointer text-primary/70" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-96px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Alterar membros</DialogTitle>
        </DialogHeader>
        <p>Equipe '{`${team.name}`}':</p>

        <Input
          disabled={isPending}
          onKeyDown={(e) => e.key === "Enter" && addMember()}
          type="email"
          ref={inputRef}
          placeholder="email do membro a ser adicionado"
        />
        <div className="flex justify-end">
          <Button onClick={addMember}>Adicionar</Button>
        </div>

        {emails.length > 0 ? (
          <div className="max-h-[200px] overflow-auto">
            <TableOfMembers
              members={emails}
              removeMember={true}
              removeMemberFn={removeMember}
            />
          </div>
        ) : (
          <NoMembers />
        )}

        <div className="mt-2 flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            disabled={emails.length === 0 || isPending}
            onClick={() => onSubmit(team.id)}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function TableOfMembers({
  members,
  removeMember = true,
  removeMemberFn,
}: {
  members: string[];
  removeMember: boolean;
  removeMemberFn: ((email: string) => void) | null;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-mails</TableHead>
          {removeMember && (
            <TableHead className="text-right">Excluir</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...members].reverse().map((member) => (
          <TableRow key={member}>
            <TableCell className="font-medium">{member}</TableCell>

            {removeMember && (
              <TableCell className="flex justify-end">
                <X
                  className="cursor-pointer text-red-500"
                  onClick={() => removeMemberFn && removeMemberFn(member)}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function NoMembers() {
  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>Nenhum membro encontrado</CardTitle>
      </CardHeader>
    </Card>
  );
}
