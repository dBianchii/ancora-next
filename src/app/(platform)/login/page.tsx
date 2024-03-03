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