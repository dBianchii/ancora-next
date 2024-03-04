"use server";

import { type Prisma } from "@prisma/client";
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

export const createEvent = async (input: {
  title: string;
  datetime: Date;
  description: string;
  invitedPrivateUsers: string[];
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
  };

  if (input.invitedPrivateUsers.length > 0) {
    data.invitedPrivateUsers = input.invitedPrivateUsers;
  }

  await db.stream.create({
    data,
  });
};

//TODO deletar
export const DO_NOT_USE_deleteAllEvents = async () => {
  await db.stream.deleteMany({});
};
