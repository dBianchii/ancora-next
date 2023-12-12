import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await getServerAuthSession();
  let users = await db.user.findMany();
  users = [...users];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Ancora usando Next para o Next :D
        </h1>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className={cn(buttonVariants())}
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
        {session && (
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>{session.user.name?.split("")[0]}</AvatarFallback>
          </Avatar>
        )}
        {session && <p className="text-center">{JSON.stringify(session)}</p>}
        <h1 className="text-4xl font-bold">
          Lista de todos os usuarios (exemplo de como usar o prisma):
        </h1>
        <div className="flex space-x-4">
          {users?.map((user) => (
            <Avatar>
              <AvatarImage src={user.image ?? ""} alt="@shadcn" />
              <AvatarFallback>{user.name?.split("")[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </main>
  );
}
