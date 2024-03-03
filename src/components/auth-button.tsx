"use client";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";

export default function AuthButton({
  page,
  session,
}: {
  page: string;
  session: Session | null;
}) {
  const name = session?.user?.name?.split(" ")[0];

  return (
    <>
      {!session ? (
        <Link
          href={page === "register" ? "/login" : "register"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          {page === "register" ? "Entrar" : "Criar Conta"}
        </Link>
      ) : (
        <div className="absolute right-4 top-4 flex items-center gap-3 md:right-8 md:top-8">
          <p>Olá, {name}</p>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(buttonVariants({ variant: "ghost" }), "")}
          >
            Sair
          </Button>
        </div>
      )}
    </>
  );
}
