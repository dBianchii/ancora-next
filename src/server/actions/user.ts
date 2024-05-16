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

export const getUser = async () => {
  const session = await enforceLoggedIn();

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return user;
};

export const verifyIfChannelIsAvailable = async (channelName: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        channelName,
      },
    });

    if (user) {
      throw new Error("Nome indisponível");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

// ToDo: need to test and implement this function
export const updateUser2 = async (values: Partial<User>) => {
  const session = await enforceLoggedIn();

  try {
    // const validData: Partial<User> = {};
		// if (values.name) validData.name = values.name;
		// if (values.channelName) validData.channelName = values.channelName;
		// if (values.bio) validData.bio = values.bio;
		// if (values.xUrl) validData.xUrl = values.xUrl;
		// if (values.facebookUrl) validData.facebookUrl = values.facebookUrl;
		// if (values.instagramUrl) validData.instagramUrl = values.instagramUrl;
		// if (values.linkedinUrl) validData.linkedinUrl = values.linkedinUrl;
		// if (values.youtubeUrl) validData.youtubeUrl = values.youtubeUrl;
		// if (values.twitchUrl) validData.twitchUrl = values.twitchUrl;
		// if (values.tiktokUrl) validData.tiktokUrl = values.tiktokUrl;
		
		const validData: Partial<User> = {
      name: values.name,
      channelName: values.channelName,
      bio: values.bio,
      xUrl: values.xUrl,
      facebookUrl: values.facebookUrl,
      instagramUrl: values.instagramUrl,
      linkedinUrl: values.linkedinUrl,
      youtubeUrl: values.youtubeUrl,
      twitchUrl: values.twitchUrl
    };

		const user = await db.user.update({
      where: { id: session.user.id },
      data: { ...validData },
    });

    return user;
		
  } catch (error) {
		throw error;
	}
};
