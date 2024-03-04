"use server";

import { type Prisma, type Stream } from "@prisma/client";

import { db } from "../db";

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
