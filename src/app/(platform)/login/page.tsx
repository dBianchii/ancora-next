/* eslint-disable @next/next/no-img-element */
import { type Metadata } from "next";
// import { Command } from "lucide-react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/components/ui/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import UserLoginForm from "./_components/user-login-auth";

export const metadata: Metadata = {
	title: "Login",
	description: "Página de login",
};

export default async function LoginPage() {
	const session = await getServerAuthSession();
	if (session) redirect("/");

	return (
		<>
			<div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<Image
						alt="Imagem de fundo"
						src="/bg.png"
						className="absolute inset-0 h-full w-full object-cover"
						width={2000}
						height={1500}
					/>
				</div>
				<div className="h-full min-w-[400px] lg:p-8">
					<Link
						href={"/"}
						className={cn(
							buttonVariants({ variant: "outline" }),
							"left-4 top-4",
						)}
					>
						{<ArrowLeftIcon className="h-5 w-5" />}
					</Link>
					<div className="flex h-1/3 w-full items-center">
						<Link
							href="/"
							className="mx-auto bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent"
						>
							Nome do Nosso App
						</Link>
					</div>
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
						<div className="flex flex-col space-y-2 text-center">
							<div>
								<h1 className="text-2xl font-semibold tracking-tight">
									Entrar
								</h1>
								<p className="text-sm text-muted-foreground">
									Entre com o seu e-mail
								</p>
							</div>
						</div>
						<UserLoginForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
              					Ao clicar em entrar, você aceita os nossos{" "}<br/>
							<Link
								href="/"
								className="underline underline-offset-4 hover:text-primary"
							>
                				Termos de Serviço
							</Link>{" "}
              				e{" "}
							<Link
								href="/"
								className="underline underline-offset-4 hover:text-primary"
							>
               					Política de Privacidade
							</Link>
              .
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
