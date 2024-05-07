/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { LeadCaptureForm } from "./_components/lead-capture-form";

export default async function Component({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const event = await db.stream.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      thumbnailUrl: true,
      title: true,
      description: true,
      datetime: true,
      User: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!event) return notFound();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            alt="Event"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            src={
              event.thumbnailUrl ??
              "https://generated.vusercontent.net/placeholder.svg"
            }
          />
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <p className="text-xl text-muted-foreground">
                Participe do evento de{" "}
                <span className="font-semibold text-foreground">
                  {event.User.name}
                </span>
                !
              </p>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {event.title}
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                {event.description}
              </p>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                {event.datetime.toLocaleDateString()}
                {" às "}
                {event.datetime.toLocaleTimeString()}
              </p>
            </div>

            <div className="w-full max-w-sm space-y-2">
              <LeadCaptureForm eventId={event.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
