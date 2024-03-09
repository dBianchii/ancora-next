import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { SidebarNav } from "../_components/sidebar-nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  return (
    <div className="flex-1">
      {/* <div className="flex flex-col justify-center border-b pb-4">
          <h1 className="text-lg font-bold">Settings</h1>
        </div> */}
      <div className="mt-8 flex flex-col gap-4 lg:gap-0 lg:flex-row lg:space-x-6">
        <SidebarNav />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
