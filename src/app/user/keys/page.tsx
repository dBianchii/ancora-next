import React from "react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { ConnectModal } from "./_components/connect-modal";
import { UrlCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function KeysPage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/login");

  const stream = await db.stream.findFirst({
    where: {
      userId: session.user.id,
    },
  });
  if (!stream) throw new Error("Stream not found");

  return (
    <MaxWidthWrapper>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Keys & URLs</h1>
          <ConnectModal />
        </div>
        <div className="space-y-4">
          <UrlCard value={stream.serverUrl} />
          <KeyCard value={stream.streamKey} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
