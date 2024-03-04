import { notFound } from "next/navigation";

import { db } from "~/server/db";
import { StreamPlayer } from "../_components/stream-player";

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
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

  return <StreamPlayer user={stream.User} stream={stream} />;
};

export default UserPage;
