import { getServerAuthSession } from "../auth";

export const enforceLoggedIn = async () => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  return session;
};
