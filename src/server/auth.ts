import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { cache } from "react";
import { env } from "~/env";
import { db } from "~/server/db";
import { sendVerificationRequest } from "~/server/email/send-verification-request";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: {
    ...PrismaAdapter(db),
    createUser: async (data) => {
      const channelName = `@${data.email?.split("@")[0]}`; 
			// ToDo: verificar se channelName ja existe

      return db.user.create({
        data: {
          ...data,
          channelName,
        },
      }) as Promise<AdapterUser>;
    },
    // createUser: async (data) => {
    //   return db.user.create({
    //     data: {
    //       ...data,
    //     },
    //   }) as Promise<AdapterUser>; // Add the type assertion to ensure the correct return type
    // },
  },
  providers: [
    EmailProvider({
      server: "",
      from: "ancora@kodix.com.br",
      sendVerificationRequest,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = cache(() => getServerSession(authOptions));
