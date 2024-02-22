"use client";

import { PlayIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import Image from "next/image";
import { type getEvents } from "../actions";
import { CreateEventsButton } from "./create-events-button";
import { useEventsData } from "./hooks";

export function EventsSection({
  events,
}: {
  events: Awaited<ReturnType<typeof getEvents>>;
}) {
  const { query } = useEventsData({ initialData: events });

  return (
    <div className="gap-2">
      <h2 className="pb-4 text-2xl font-bold">Meus eventos</h2>
      <div className="space-y-2">
        <CreateEventsButton />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {query.data?.map((event) => <EventCard event={event} />)}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[number];
}) {
  return (
    <div className="group relative">
      <Image
        alt="Stream thumbnail"
        className="aspect-[16/9] w-full rounded-lg object-cover transition-transform duration-200 group-hover:z-10 group-hover:scale-[1.05]"
        height="225"
        src="https://generated.vusercontent.net/placeholder.svg"
        width="400"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <PlayIcon className="h-10 w-10 rounded-full bg-primary p-2" />
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        <h3 className="font-semibold leading-none tracking-tight">
          {event.title}
        </h3>
        <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Hosted by <span className="font-bold">{event.admin.name}</span>
        </p>
        <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
          Starts at{" "}
          <span className="font-bold">
            {dayjs(event.datetime).format("DD/MM/YYYY HH:mm")}
          </span>
        </p>
      </div>
    </div>
  );
}
