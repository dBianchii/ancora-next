"use client";

import { LucideHand } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function NotSoFastMyFriendClientComponent() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      void router.push("/");
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <LucideHand className="size-12" />
        <div className="text-2xl font-bold">Não tão rápido!</div>
        <div className="text-center text-sm">
          Este evento ainda não começou. Você será redirecionado para a página
          inicial em alguns segundos...
        </div>
      </div>
    </div>
  );
}
