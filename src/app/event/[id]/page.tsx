import { notFound } from "next/navigation";

import { db } from "~/server/db";
import { NotSoFastMyFriendClientComponent } from "../_components/not-so-fast-my-friend-client-component";
import { StreamPlayer } from "../_components/stream-player";

interface EventPage {
  params: {
    id: string;
  };
}

const TEN_MINUTES = 10 * 60 * 1000;
const SIXTY_MINUTES = 60 * 60 * 1000;

function verifyIfUserMayAccessLive(event: Date) {
  const eventTime = new Date(event).getTime();
  const currentTime = new Date().getTime();

  if (eventTime - currentTime > TEN_MINUTES) {
    return false;
  } else if (currentTime - eventTime > SIXTY_MINUTES) {
    return false;
  }

  return true;
}

const EventPage = async ({ params }: EventPage) => {
  const stream = await db.stream.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      isLive: true,
      isChatDelayed: true,
      isChatEnabled: true,
      datetime: true,
      userId: true,
      thumbnailUrl: true,
      title: true,
      description: true,
      User: {
        select: {
          id: true,
          bio: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!stream) notFound();

  if (!stream.User) {
    notFound();
  }

  if (!verifyIfUserMayAccessLive(stream.datetime))
    return <NotSoFastMyFriendClientComponent />;

  return <StreamPlayer user={stream.User} stream={stream} />;
};

export default EventPage;
