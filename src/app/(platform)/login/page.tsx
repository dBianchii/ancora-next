/* eslint-disable @next/next/no-img-element */
import { type Metadata } from "next";
// import { Command } from "lucide-react";
import UserLoginForm from "../../../components/user-login-auth";
import AuthButton from "../../../components/auth-button";

export const metadata: Metadata = {
	title: "Login",
	description: "Página de login"
}

export default function LoginPage() {
	return (
		<>
			<div className="container relative h-dvh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<AuthButton page="login" />

				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<img
						alt="Imagem de fundo"
						src="/bg.png"
						className="absolute inset-0 w-full h-full object-cover"
					/>
				</div>
				<div className="lg:p-8 min-w-[400px]">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Entrar
							</h1>
							<p className="text-sm text-muted-foreground">
								Entre com os seus dados
							</p>
						</div>
						<UserLoginForm />
					</div>
				</div>
			</div>
		</>
	);
}