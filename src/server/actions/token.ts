"use server";

import { AccessToken } from "livekit-server-sdk";

import cuid from "cuid";
import { env } from "~/env";
import { db } from "~/server/db";
import { enforceLoggedIn } from "../utils/enforceLoggedIn";

export const createViewerToken = async (hostIdentity: string) => {
  let self: { id: string; username: string };

  try {
    const session = await enforceLoggedIn();
    self = {
      id: session.user.id,
      username: session.user.name ?? "",
    };
  } catch {
    const id = cuid();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await db.user.findUnique({
    where: { id: hostIdentity },
    include: {
      AdministeredEvents: true,
    },
  });

  if (!host) {
    throw new Error("User not found");
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
    identity: isHost ? `host-${self.id}` : self.id,
    name: self.username,
  });

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
