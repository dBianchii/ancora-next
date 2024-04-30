import React from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

export default function ConfirmEmailPage() {
	return (
		<div className="container relative grid m-auto flex-col items-center justify-items-center mt-20">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>
						<h1 className="font-extrabold md:text-xl lg:text-2xl">
							Verifique o seu e-mail
						</h1>
					</CardTitle>
					<CardDescription>
						<p className="text-sm m-1"> 
							Acesse a sua conta através do link enviado
						</p>
					</CardDescription>
				</CardHeader>
			</Card>
		</div>
	);
}
