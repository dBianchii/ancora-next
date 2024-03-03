"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { cn } from "../lib/utils";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";


type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

interface IUser {
	email: string;
	password: string;
}

export default function UserLoginForm({ className, ...props }: UserAuthFormProps) {

	const { toast } = useToast();
	const router = useRouter();

	const [data, setData] = useState<IUser>({
		email: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		const response = await signIn("credentials", {
			...data,
			redirect: false,
		});

		if (response?.error) {
			toast({
				title: "Oooooops...!",
				description: response.error,
				variant: "destructive",
				action: (
					<ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
				)

			});
		} else {
			router.push("/");
		}

		setData({
			email: "",
			password: ""
		});

		setIsLoading(false);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setData((prev) => ({
			...prev, [event.target.name]: event.target.value
		}));
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="email"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							name="email"
							value={data.email}
							onChange={handleChange}
						/>
					</div>
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							placeholder="password"
							type="password"
							autoCapitalize="none"
							autoComplete="none"
							autoCorrect="off"
							disabled={isLoading}
							name="password"
							value={data.password}
							onChange={handleChange}
						/>

					</div>
					<div className="grid gap-1 mt-2">
						<Button disabled={isLoading}>
							{isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
							Entrar
						</Button>
					</div>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Ou continue com
					</span>
				</div>
			</div>
			<Button
				onClick={() => signIn("github", { callbackUrl: "/" })}
				variant="outline"
				type="button"
				disabled={isLoading}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.google className="mr-2 h-4 w-4" />
				)}{" "}
				Google
			</Button>
		</div>

	);
}