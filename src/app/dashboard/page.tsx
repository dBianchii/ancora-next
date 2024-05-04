import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getEvents } from "~/server/actions/stream";
import { DashboardSection } from "../_components/dashboard-section";

export default async function LoggedInView() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardSection />
    </HydrationBoundary>
  );
}
