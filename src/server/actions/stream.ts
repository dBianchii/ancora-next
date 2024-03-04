"use server";

import { type Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { enforceLoggedIn } from "../utils/enforceLoggedIn";
import { db } from "../db";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const session = await enforceLoggedIn();
    const currentUserStream = await db.stream.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!currentUserStream) {
      throw new Error("Stream not found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        id: currentUserStream.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.name}/chat`);
    revalidatePath(`/u/${self.name}`);
    revalidatePath(`/${self.name}`);

    return stream;
  } catch {
    throw new Error("Internal Error");
  }
};
