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
import Link from "next/link";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export function EventsSection() {
  const { query } = useEventsData();

  return (
    <section className="h-full py-6 lg:pl-8 lg:border-l">
      <h2 className="space-y-1 text-2xl font-semibold tracking-tight pb-4">
        Meus eventos
      </h2>
      <Tabs defaultValue="proximos" className="h-full space-y-6" >
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
                ?.filter((event) => new Date(event.datetime) > new Date())
                .map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="antigos">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {query.isError && <p>Erro ao carregar eventos</p>}
            {query.data
              ?.filter((event) => new Date(event.datetime) < new Date())
              .map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function EventCard({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[number];
}) {
  const { query } = useTeamsData();

  const teamEmails = event.invitedPrivateUsers?.flatMap((teamId) => {
    const team = query.data?.find((team) => team.id === teamId);
    const usersEmails = team?.usersEmails;
    return usersEmails ?? [];
  });

	const buttonName = event.isLive 
  ? "Assistir agora" 
  : event.datetime < new Date() 
    ? "Assistir evento gravado" 
    : "Entrar no evento";
	

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative">
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
          <div className="mt-2 flex flex-col gap-1.5">
            <h3 className="font-semibold leading-none tracking-tight">
              {event.title}
            </h3>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
              Hosted by <span className="font-bold">{event.User.name}</span>
            </p>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
              Starts at{" "}
              <span className="font-bold">
                {dayjs(event.datetime).format("DD/MM/YYYY HH:mm")}
              </span>
            </p>
          </div>
        </div>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <Button variant="default">
            <Link href={`/event/${event.id}`}>
							{buttonName}
						</Link>
          </Button>
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
