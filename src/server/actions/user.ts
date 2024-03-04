"use server";

import { type User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { enforceLoggedIn } from "../utils/enforceLoggedIn";
import { db } from "../db";

export const updateUser = async (values: Partial<User>) => {
  const session = await enforceLoggedIn();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: session.user.id },
    data: { ...validData },
  });

  revalidatePath(`/${session.user.name}`);
  revalidatePath(`/u/${session.user.name}`);

  return user;
};
