import { notFound } from "next/navigation";

import { db } from "~/server/db";
import { StreamPlayer } from "../_components/stream-player";

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      bio: true,
      name: true,
      image: true,
      Stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  if (!user?.Stream) {
    notFound();
  }

  return <StreamPlayer user={user} stream={user.Stream} />;
};

export default UserPage;
