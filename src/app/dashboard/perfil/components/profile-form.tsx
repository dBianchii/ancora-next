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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Input } from "~/components/ui/input";
import { cn } from "~/components/ui/lib/utils";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import Image from "next/image";
import { type getUser } from "~/server/actions/user";

import { ChevronRight, Globe } from "lucide-react";
import { socialIcons } from "./socialIcons";

const profileFormSchema = (defaultValues: { name: string }) =>
  z.object({
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
          value: z
            .string()
            .url({ message: "Por favor, informe uma URL válida" }),
        }),
      )
      .optional(),
  });

type ProfileFormValues = {
  name: string;
  channelName: string;
  email: string;
  bio: string;
  xUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  twitchUrl: string;
  tiktokUrl: string;
};

export function ProfileForm({
  user,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  const defaultValues: ProfileFormValues = {
    name: user?.name ?? "",
    channelName: user?.channelName ?? "",
    email: user?.email ?? "",
    bio: user?.bio ?? "",
    xUrl: user?.xUrl ?? "",
    facebookUrl: user?.facebookUrl ?? "",
    instagramUrl: user?.instagramUrl ?? "",
    linkedinUrl: user?.linkedinUrl ?? "",
    youtubeUrl: user?.youtubeUrl ?? "",
    twitchUrl: user?.twitchUrl ?? "",
    tiktokUrl: user?.tiktokUrl ?? "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema(defaultValues)),
    mode: "onChange",
  });

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={defaultValues.name} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="channelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Nickname
                </FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={defaultValues.channelName} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500 dark:text-gray-400">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={defaultValues.email}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
            <h4>Social media:</h4>

            <FormField
              control={form.control}
              name="xUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
                    {socialIcons("x")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={defaultValues.xUrl} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
									{socialIcons("facebook")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.facebookUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
									{socialIcons("instagram")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.instagramUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
									{socialIcons("linkedin")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.linkedinUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
									{socialIcons("youtube")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={defaultValues.youtubeUrl} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitchUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
									{socialIcons("twitch")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={defaultValues.twitchUrl} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktokUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
									{socialIcons("tiktok")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={defaultValues.tiktokUrl} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-2">
            Salvar alterações
          </Button>
        </form>
      </Form>
    </>
  );
}

export function ProfileCard({
  user,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const channelName = user?.channelName ?? "";
  const bio = user?.bio ?? "aaa";

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
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
            <h2 className="font-semibold leading-none tracking-tight md:text-xl lg:text-2xl">
              {name}
            </h2>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p className="text-base">{channelName}</p>
              <p>{email}</p>
            </div>
            <AboutDialog user={user} />
          </div>
        </div>
        <AlterInfoDialog user={user} />
      </div>
    </>
  );
}

function AlterInfoDialog({
  user,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Alterar informações</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar informações</DialogTitle>
        </DialogHeader>
        <ProfileForm user={user} />
      </DialogContent>
    </Dialog>
  );
}

function AboutDialog({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          Sobre
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sobre</DialogTitle>
        </DialogHeader>
        <About user={user} />
      </DialogContent>
    </Dialog>
  );
}

function About({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  const bio = user?.bio ?? "";

  return (
    <>
      {bio ? <p>{bio}</p> : <p>...</p>}
      <h3 className="text-lg font-medium">Detalhes do usuário</h3>
      <div className="flex items-center gap-x-2 dark:text-gray-300">
        <Globe />
        <p className="text-sm ">
          http://localhost:3000/users/{user?.channelName}
        </p>
      </div>
    </>
  );
}
