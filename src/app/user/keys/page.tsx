import { type Session } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
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
    <MaxWidthWrapper>
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
    </MaxWidthWrapper>
  );
}

async function Cards({ session }: { session: Session }) {
  const stream = await db.stream.findFirst({
    where: {
      userId: session.user.id,
    },
  });
  if (!stream) throw new Error("Stream not found");
  return (
    <>
      <UrlCard value={stream.serverUrl} />
      <KeyCard value={stream.streamKey} />
    </>
  );
}
