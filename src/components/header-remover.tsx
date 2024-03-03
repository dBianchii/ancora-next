"use client";

import { usePathname } from "next/navigation";

export default function HeaderRemover({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const blockedPaths = ["/login"];

  if (blockedPaths.includes(pathname)) {
    return null;
  }
  return <>{children}</>;
}
