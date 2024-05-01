"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { TableOfMembers } from "../dashboard/equipes/_components/alter-team-members-modal";
import { PlayIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  DO_NOT_USE_deleteAllEvents,
  type getEvents,
} from "../../server/actions/stream";
import { CreateEventsButton } from "./create-events-button";
import { useEventsData, useTeamsData } from "./hooks";
import { Settings } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { UpdateEventModal } from "./update-event-modal";
import { Separator } from "~/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TEN_MINUTES = 10 * 60 * 1000;
const SIXTY_MINUTES = 60 * 60 * 1000;

export function EventsSection() {
  const { query } = useEventsData();

  return (
    <section className="h-full py-6 lg:border-l lg:pl-8">
      <h2 className="mb-2 space-y-1 text-2xl font-semibold tracking-tight ">
        Meus eventos
      </h2>
      <Tabs defaultValue="proximos" className="h-full space-y-6">
        <TabsList>
          <TabsTrigger value="proximos">Próximos</TabsTrigger>
          <TabsTrigger value="antigos">Antigos</TabsTrigger>
        </TabsList>
        <TabsContent value="proximos">
          <div className="space-y-2">
            <div className="flex justify-between">
              <CreateEventsButton />
              {process.env.NODE_ENV === "development" && (
                <Button
                  variant={"destructive"}
                  onClick={async () => {
                    await DO_NOT_USE_deleteAllEvents();
                    void query.refetch();
                  }}
                >
                  Delete all events (devmode)
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {query.isError && <p>Erro ao carregar eventos</p>}
              {query.data
                ?.filter((event) => verifyEventTime(event))
                .map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="antigos">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {query.isError && <p>Erro ao carregar eventos</p>}
            {query.data
              ?.filter((event) => !verifyEventTime(event))
              .map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function verifyEventTime(event: Awaited<ReturnType<typeof getEvents>>[number]) {
  const eventTime = new Date(event.datetime).getTime();
  const currentTime = new Date().getTime();

	return eventTime > currentTime || currentTime - eventTime < SIXTY_MINUTES;
}

// possibilitar acesso a live em 10 minutos (10min * 60seg * 1000miliseg) antes do evento
// e até 60 minutos após o evento iniciado
function verifyIfUserMayAccessLive(
  event: Awaited<ReturnType<typeof getEvents>>[number],
) {
  const eventTime = new Date(event.datetime).getTime();
  const currentTime = new Date().getTime();

  if (eventTime - currentTime > TEN_MINUTES) {
    toast.error(
      `Acesso negado! A live estará disponível às ${dayjs(eventTime)
        .subtract(10, "minute")
        .format("DD/MM/YYYY HH:mm")}`,
    );
    return false;
  } else if (currentTime - eventTime > SIXTY_MINUTES) {
    toast(`A gravação do evento "${event.title}" estará disponível em breve!`);
    return false;
  }

  return true;
}

function EventCard({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[number];
}) {
  return (
    <div className="">
      <div className="group relative">
        <Play event={event} />
      </div>
      <div className="flex justify-between p-1">
        <div className=" mt-2 flex flex-col gap-1.5 ">
          <h3 className="font-semibold leading-none tracking-tight">
            {event.title.length > 50
              ? event.title.substring(0, 50) + "..."
              : event.title}
          </h3>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Criado por: <span className="font-bold">{event.User.name}</span>
          </p>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Início:{" "}
            <span className="font-bold">
              {dayjs(event.datetime).format("DD/MM/YYYY HH:mm")}
            </span>
          </p>
        </div>
        {new Date(event.datetime) > new Date() && (
          <div className="mt-2 flex w-1/5 justify-end">
            <ConfigEvent event={event} />
          </div>
        )}
      </div>
    </div>
  );
}

function Play({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[number];
}) {
  const navigate = useRouter();

  function verify(event: Awaited<ReturnType<typeof getEvents>>[number]) {
    if (verifyIfUserMayAccessLive(event)) navigate.push(`/event/${event.id}`);
  }

  return (
    <div onClick={() => verify(event)}>
      <div className="group relative">
        <Image
          alt="Stream thumbnail"
          className="aspect-[16/9] w-full rounded-lg object-cover transition-transform duration-200 group-hover:z-10 group-hover:scale-[1.05]"
          height="225"
          src={
            event.thumbnailUrl ??
            "https://generated.vusercontent.net/placeholder.svg"
          }
          width="400"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <PlayIcon className="h-10 w-10 rounded-full bg-primary p-2" />
        </div>
      </div>
    </div>
  );
}

function ConfigEvent({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[number];
}) {
  const { query } = useTeamsData();

  const initialName = event.title;
  const initialThumbnailUrl = event.thumbnailUrl;

  const teamEmails = event.invitedPrivateUsers?.flatMap((teamId) => {
    const team = query.data?.find((team) => team.id === teamId);
    const usersEmails = team?.usersEmails;
    return usersEmails ?? [];
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className="h-6 w-6 cursor-pointer text-gray-500 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-white" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <UpdateEventModal
          initialName={initialName}
          initialThumbnailUrl={initialThumbnailUrl}
          streamId={event.id}
        />
        <Separator />
        {teamEmails.length > 0 && (
          <>
            <div className="rounded bg-zinc-900 p-4">
              <h1 className="text-bold mb-4">Convidados:</h1>
              <div className="h-32 overflow-y-auto">
                <TableOfMembers
                  members={teamEmails ?? []}
                  removeMember={false}
                  removeMemberFn={null}
                />
              </div>
            </div>
            <Button variant="ghost">
              Enviar lembrete da reunião via e-mail
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
