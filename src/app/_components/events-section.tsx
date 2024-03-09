"use client";

import { PlayIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
	DO_NOT_USE_deleteAllEvents,
	type getEvents,
} from "../../server/actions/stream";
import { CreateEventsButton } from "./create-events-button";
import { useEventsData } from "./hooks";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"


export function EventsSection() {
	const { query } = useEventsData();

	return (
		<section className="gap-2">
			<h2 className="pb-4 text-2xl font-bold">Meus eventos</h2>
			<Tabs defaultValue="proximos" className="w-full flex flex-col gap-4">
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
							{query.data?.filter(event => new Date(event.datetime) > new Date()).map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</div>

					</div>
				</TabsContent>
				<TabsContent value="antigos">

					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
						{query.isError && <p>Erro ao carregar eventos</p>}
						{query.data?.filter(event => new Date(event.datetime) < new Date()).map((event) => (
							<EventCard key={event.id} event={event} />
						))}
					</div>

				</TabsContent>
			</Tabs>




		</section >
	);
}

function EventCard({
	event,
}: {
	event: Awaited<ReturnType<typeof getEvents>>[number];
}) {
	return (
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
		</Link>
	);
}
