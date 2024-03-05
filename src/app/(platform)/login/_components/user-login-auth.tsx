"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Icons } from "../../../../components/icons";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { cn } from "../../../../components/ui/lib/utils";

import { toast } from "sonner";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface IUser {
	email: string;
}

export default function UserLoginForm({
	className,
	...props
}: UserAuthFormProps) {
	const router = useRouter();

	const [data, setData] = useState<IUser>({
		email: "",
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		const response = await signIn("email", {
			...data,
			redirect: false,
		});

		// if (response?.ok) {
		// 	toast("Por favor, verifique o seu email para continuar.");
		// 	router.push("/login/confirm-email");
		// }

		if (response?.error) {
			toast.error("Houve um erro ao tentar entrar. Tente novamente.");
		} else {
			router.push("/login/confirm-email");
		}

		setData({
			email: "",
		});

		setIsLoading(false);
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
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
							placeholder="e-mail"
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
					<div className="mt-2 grid gap-1">
						<Button disabled={isLoading}>
							{isLoading && (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							)}
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
				onClick={async () => {
					setIsLoading(true);
					await signIn("google", { callbackUrl: "/" });
				}}
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
