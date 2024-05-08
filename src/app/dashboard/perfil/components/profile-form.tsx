"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Session } from "next-auth";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { cn } from "../../../../components/ui/lib/utils";
import { Select } from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "../../../../components/ui/use-toast";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "O nome do usuário precisa ser maior do que 2 caracteres",
    })
    .max(30, {
      message: "O nome do usuário precisa ser menor do que 30 caracteres",
    }),
  email: z
    .string({
      required_error: "Por favor, informe um e-mail valido",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Por favor, informe uma URL válida" }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ session }: { session: Session }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field: _ }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <p>{session.user.name}</p>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Email
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <p>{session.user.email}</p>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Biografia
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte um pouco sobre você..."
                    className=" w-1/2 resize-none"
                    disabled
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Adicione links de suas redes sociais, blogs ou websites
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div>
          <Button type="button" className="mt-2">
            Configurações
          </Button>
        </form>
      </Form>
    </>
  );
}

export function ProfileCard({ session }: { session: Session }) {
  const name = session.user.name ?? "";
  const email = session.user.email ?? "";
	// ToDo: puxar user.channelName

  return (
    <>
      <div className="">
        <Card className="flex w-full items-center">
          <CardHeader>
            <Image
              src={session.user.image ?? "/bg.png"}
              alt={name}
              className="mx-auto h-24 w-24 rounded-full object-cover"
              width={100}
              height={100}
            />
          </CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle className="font-bold md:text-xl lg:text-2xl">
              {name}
            </CardTitle>
            <CardDescription className="text-sm flex flex-col gap-1">
							<p>@...</p>
							<p>{email}</p>
            </CardDescription>
          </div>
        </Card>
      </div>
    </>
  );
}
