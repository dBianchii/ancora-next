import { type Session } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { ConnectModal } from "./_components/connect-modal";
import { KeyCard } from "./_components/key-card";
import { UrlCard } from "./_components/url-card";

export default async function KeysPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/login");

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <Suspense
          fallback={
            <div className="space-y-6">
              <Skeleton className="h-20 bg-card" />
              <Skeleton className="h-32 bg-card" />
            </div>
          }
        >
          <Cards session={session} />
        </Suspense>
      </div>
    </div>
  );
}

async function Cards({ session }: { session: Session }) {
  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      streamKey: true,
      serverUrl: true,
    },
  });
  if (!user) throw new Error("User not found");
  return (
    <>
      <UrlCard value={user.serverUrl} />
      <KeyCard value={user.streamKey} />
    </>
  );
}