import MaxWidthWrapper from "~/components/max-width-wrapper";
import { getServerAuthSession } from "~/server/auth";
import { EventsSection } from "./_components/events-section";
import { getEvents } from "./actions";
import { Suspense } from "react";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex-1 py-8">
      <MaxWidthWrapper>
        {session ? (
          <Suspense>
            <LoggedInView />
          </Suspense>
        ) : (
          <NotLoggedInView />
        )}
      </MaxWidthWrapper>
    </main>
  );
}

async function LoggedInView() {
  const events = await getEvents();

  return (
    <div className="gap-2">
      <EventsSection events={events} />
    </div>
  );
}

function NotLoggedInView() {
  return <div className="flex justify-end">Vc ta desloggado. Logga ai!</div>;
}
