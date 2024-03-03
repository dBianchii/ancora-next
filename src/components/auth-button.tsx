"use client";
import { cn } from "../lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export default function AuthButton({ page }: { page: string }) {
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated";
	const name = session?.user?.name?.split(" ")[0];

	return (
		<>
			{!isAuthenticated ? (
				<Link
					href={page === "register" ? "/login" : "register"}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"absolute right-4 top-4 md:right-8 md:top-8"
					)}
				>
					{page === "register" ? "Entrar" : "Criar Conta"}
				</Link>
			) : (
				<div className="absolute flex gap-3 items-center right-4 top-4 md:right-8 md:top-8">
					<p>Olá, {name}</p>
					<Button
						onClick={() => signOut({ callbackUrl: "/login" })}
						className={cn(
							buttonVariants({ variant: "ghost" }),
							""
						)}
					>
						Sair
					</Button>
				</div>
			)}
		</>
	);
}