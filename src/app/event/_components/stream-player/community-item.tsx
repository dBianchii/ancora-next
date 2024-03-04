"use client";

import { cn } from "~/components/ui/lib/utils";

export const CommunityItem = ({
  participantName,
}: {
  participantName?: string;
}) => {
  return (
    <div
      className={cn(
        "group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5",
      )}
    >
      <p style={{ color: "color" }}>{participantName}</p>
    </div>
  );
};
