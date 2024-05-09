"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "../../../../components/ui/use-toast";
import Image from "next/image";
import { type getUser } from "~/server/actions/user";

const profileFormSchema = (defaultValues: {name: string}) => z.object({
  name: z
    .string()
    .min(2, {
      message: "O nome do usuário precisa ser maior do que 2 caracteres",
    })
    .max(30, {
      message: "O nome do usuário precisa ser menor do que 30 caracteres",
    })
		.default(defaultValues.name),
	channelName: z
		.string()
		.min(2, { message: "O canal deve ter pelo menos 2 caracteres" }),
  email: z
    .string({
      required_error: "Por favor, informe um e-mail valido",
    })
    .email()
		.optional(),
  bio: z.string().max(160).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Por favor, informe uma URL válida" }),
      }),
    )
    .optional(),
});

type ProfileFormValues = {
  name: string;
  channelName: string;
  email: string;
  bio: string;
  urls: Array<{ value: string }>;
};

export function ProfileForm({ user }: { user: Awaited<ReturnType<typeof getUser>>}) {

	const defaultValues: ProfileFormValues = {
		name: user?.name ?? "",
		channelName: user?.channelName ?? "",
		email: user?.email ?? "",
		bio: user?.bio ?? "",
		urls: [{ value: 'http://default.com' }],
		// ToDo: fix this
	};

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema(defaultValues)),
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={defaultValues.name}/>
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
                <FormControl>
                   <Input {...field} defaultValue={defaultValues.email} disabled/>
                </FormControl>
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
                    className=" w-full resize-none"
                    {...field}
										defaultValue={defaultValues.bio}
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
              Adicionar URL
            </Button>
          </div>
          <Button type="submit" className="mt-2">
            Salvar alterações
          </Button>
        </form>
      </Form>
    </>
  );
}

export function ProfileCard({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  const name = user?.name ?? "";
  const email = user?.email ?? "";
	const channelName = user?.channelName ?? "";

  return (
    <>
      <div className="">
        <div className="flex flex-col gap-4 w-full items-center rounded-xl border bg-card text-card-foreground shadow p-4">
          <div>
            <Image
              src={user?.image ?? "/bg.png"}
              alt={name}
              className="mx-auto h-32 w-32 rounded-full object-cover"
              width={120}
              height={120}
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h2 className="md:text-xl lg:text-2xl font-semibold leading-none tracking-tight">
              {name}
            </h2>
            <div className="text-sm flex flex-col gap-1 text-muted-foreground">
							<p className="text-base">{channelName}</p>
							<p>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
