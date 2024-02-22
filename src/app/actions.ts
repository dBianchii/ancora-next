"use server";

import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { enforceLoggedIn } from "~/server/utils";

export const getEvents = async () => {
  const session = await enforceLoggedIn();

  const events = await db.events.findMany({
    where: {
      adminId: session.user.id,
    },
    include: {
      admin: {
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

  const data: Prisma.EventsCreateInput = {
    admin: {
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

  await db.events.create({
    data,
  });
};
