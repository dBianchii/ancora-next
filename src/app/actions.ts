"use server";

import { db } from "~/server/db";
import { enforceLoggedIn } from "~/server/utils";

export const getEvents = async () => {
  const session = await enforceLoggedIn();

  const events = await db.events.findMany({
    where: {
      adminId: session.user.id,
    },
  });
  return events;
};

export const createEvent = async (input: {
  name: string;
  datetime: Date;
  description: string;
  private: boolean;
  fireReminderEmailAt: Date;
  invitedPrivateUsers: string[];
}) => {
  const session = await enforceLoggedIn();

  await db.events.create({
    data: {
      adminId: session.user.id,
      name: input.name,
      datetime: input.datetime,
      description: input.description,
      private: input.private,
      fireReminderEmailAt: input.fireReminderEmailAt,
      invitedPrivateUsers: {
        connect: input.invitedPrivateUsers.map((id) => ({ id })),
      },
    },
  });
};
