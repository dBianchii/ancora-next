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
import { Settings } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export function EventsSection() {
  const { query } = useEventsData();

  return (
    <section className="h-full py-6 lg:border-l lg:pl-8">
      <h2 className="space-y-1 text-2xl font-semibold tracking-tight ">
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
  return (
    <div className="">
      <div className="group relative">
        <Link className="group relative" href={`/event/${event.id}`}>
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
        </Link>
      </div>
      <div className="flex justify-between p-1">
        <div className=" mt-2 flex flex-col gap-1.5 ">
          <h3 className="font-semibold leading-none tracking-tight">
					{event.title.length > 50 ? event.title.substring(0, 50) + '...' : event.title}
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
        <div className="w-1/5 flex justify-end mt-2">
          <ConfigEvent event={event} />
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

  const teamEmails = event.invitedPrivateUsers?.flatMap((teamId) => {
    const team = query.data?.find((team) => team.id === teamId);
    const usersEmails = team?.usersEmails;
    return usersEmails ?? [];
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
        </DialogHeader>
        <p className="text-yellow-600">
          ToDo: possibilitar alterações do nome/data/thumbnail
        </p>
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
