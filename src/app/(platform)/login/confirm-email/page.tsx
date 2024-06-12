import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ConfirmEmailPage() {
  return (
    <div className="container relative m-auto mt-20 grid flex-col items-center justify-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="font-extrabold md:text-xl lg:text-2xl">
            Verifique o seu e-mail
          </CardTitle>
          <CardDescription className="m-1 text-sm">
            Acesse a sua conta através do link enviado
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
