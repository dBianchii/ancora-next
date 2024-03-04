import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Skeleton } from "~/components/ui/skeleton";
import { getServerAuthSession } from "~/server/auth";
import { EventsSection } from "./_components/events-section";
import { getEvents } from "../server/actions/stream";

export default async function HomePage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex-1 py-8">
      <MaxWidthWrapper>
        {session ? (
          <Suspense fallback={LoggedInViewSkeleton()}>
            <LoggedInView />
          </Suspense>
        ) : (
          <NotLoggedInView />
        )}
      </MaxWidthWrapper>
    </main>
  );
}

function LoggedInViewSkeleton() {
  return (
    <div className="gap-2">
      <h2 className="pb-4 text-2xl font-bold">Eventos</h2>
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-[200px] w-full" />{" "}
    </div>
  );
}

async function LoggedInView() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <div className="gap-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EventsSection />
      </HydrationBoundary>
    </div>
  );
}

function NotLoggedInView() {
  return <div className="flex justify-end">Vc ta desloggado. Logga ai!</div>;
}
