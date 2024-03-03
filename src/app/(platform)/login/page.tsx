/* eslint-disable @next/next/no-img-element */
import { type Metadata } from "next";
// import { Command } from "lucide-react";
import UserLoginForm from "../../../components/user-login-auth";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

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
        <div className="min-w-[400px] lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
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
