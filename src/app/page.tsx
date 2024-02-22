import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { CreateEventsButton } from "./_components/create-events-button";
import { getEvents } from "./actions";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex-1 py-8">
      <MaxWidthWrapper>
        {session ? <LoggedInView /> : <NotLoggedInView />}
      </MaxWidthWrapper>
    </main>
  );
}

async function LoggedInView() {
  const events = await getEvents();

  return (
    <>
      <div className="flex justify-end">
        <CreateEventsButton />
      </div>
      <div>
        <h2>Meus eventos</h2>
        <ul>
          {events.map((evt) => (
            <div>{evt.id}</div>
          ))}
        </ul>
      </div>
    </>
  );
}

function NotLoggedInView() {
  return (
    <div className="flex justify-end">
      <CreateEventsButton />
    </div>
  );
}
