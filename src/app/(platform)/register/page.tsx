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
					<div className="absolute inset-0 bg-zinc-900" />
					{/* <div className="relative z-20 flex items-center text-lg font-medium">
						<Command className="mr-2 h-6 w-6" /> {`<NOME DO APP>`}
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
                				&ldquo;This library has saved me countless hours of work and
                				helped me deliver stunning designs to my clients faster than
                				ever before.&rdquo;
							</p>
							<footer className="text-sm">{`<NOME DO APP>`}</footer>
						</blockquote>
					</div> */}
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