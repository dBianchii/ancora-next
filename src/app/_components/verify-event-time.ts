import { type getEvents } from "~/server/actions/stream";

const SIXTY_MINUTES = 60 * 60 * 1000;

export function verifyEventTime(event: Awaited<ReturnType<typeof getEvents>>[number]) {
  const eventTime = new Date(event.datetime).getTime();
  const currentTime = new Date().getTime();

  return eventTime > currentTime || currentTime - eventTime < SIXTY_MINUTES;
}