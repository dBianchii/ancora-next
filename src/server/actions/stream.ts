"use server";

import { type Stream, type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { enforceLoggedIn } from "../utils/enforceLoggedIn";

export const getEvents = async () => {
  const session = await enforceLoggedIn();

  const events = await db.stream.findMany({
    orderBy: {
      datetime: "asc",
    },
    where: {
      userId: session.user.id,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return events;
};

export const getEventsByChannelName = async (channelName: string) => {
	const events = await db.stream.findMany({
		where: {
			User: {
				channelName
			}
		},
		include: {
			User: {
				select: {
					name: true,
					image: true,
				},
			},
		},
	})

	return events;
}

export const createEvent = async (input: {
  title: string;
  datetime: Date;
  description: string;
  invitedPrivateUsers: string[];
  thumbnailUrl?: string;
}) => {
  const session = await enforceLoggedIn();

  const data: Prisma.StreamCreateInput = {
    User: {
      connect: {
        id: session.user.id,
      },
    },
    title: input.title,
    datetime: input.datetime,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl,
  };

  if (input.invitedPrivateUsers.length > 0) {
    data.invitedPrivateUsers = input.invitedPrivateUsers;
  }

  await db.stream.create({
    data,
  });
};

export const DO_NOT_USE_deleteAllEvents = async () => {
  await db.stream.deleteMany({});
};
export const updateStream = async ({
  streamId,
  values,
}: {
  streamId: string;
  values: Partial<Stream>;
}) => {
  try {
    const validData: Prisma.StreamUpdateInput = {
      thumbnailUrl: values.thumbnailUrl,
      title: values.title,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: streamId,
      },
      data: {
        ...validData,
      },
    });

    // revalidatePath(`/u/${self.name}/chat`);
    // revalidatePath(`/u/${self.name}`);
    // revalidatePath(`/${self.name}`);
    return stream;
  } catch {
    throw new Error("Internal Error");
  }
};

export const deleteEvent = async (streamId: string) => {
  await db.stream.delete({
    where: {
      id: streamId,
      userId: (await enforceLoggedIn()).user.id,
    },
  });
};
