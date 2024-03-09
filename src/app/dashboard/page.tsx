import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getEvents } from "~/server/actions/stream";
import { EventsSection } from "../_components/events-section";

export default async function LoggedInView() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventsSection />
    </HydrationBoundary>
  );
}
