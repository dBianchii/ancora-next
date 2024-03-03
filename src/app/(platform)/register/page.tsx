/* eslint-disable @next/next/no-img-element */
import { type Metadata } from "next";
import Link from "next/link";
// import { Command } from "lucide-react";
import UserRegisterForm from "../../../components/user-register-auth";
import AuthButton from "~/components/auth-button";

export const metadata: Metadata = {
	title: "Cadastro",
	description: "Página de cadastro"
}

export default function RegisterPage() {
	return (
		<>
			<div className="container relative h-dvh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<AuthButton page="register" />

				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<img
						alt="Imagem de fundo"
						src="/bg.png"
						className="absolute inset-0 w-full h-full object-cover"
					/>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Criar conta
							</h1>
							<p className="text-sm text-muted-foreground">
								Crie uma conta com os seus dados
							</p>
						</div>
						<UserRegisterForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
							Ao clicar em 'Criar conta', você concorda com os nossos {" "}
							<Link
								href="/"
								className="underline underline-offset-4 hover:text-primary"
							>
								Termos de Serviço
							</Link>{" "}
							e {" "}
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