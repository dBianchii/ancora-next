"use client";
import { type ElementRef, useRef, useState } from "react";
import { type User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Input } from "~/components/ui/input";
// import { cn } from "~/components/ui/lib/utils";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
import { type getUser } from "~/server/actions/user";

import {
  ChevronRight,
  Globe,
  Check,
  RefreshCw,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitch,
  Loader2,
  Pencil,
} from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyIfChannelIsAvailable } from "~/server/actions/user";
import { updateUser2 } from "~/server/actions/user";
import { UploadDropzone } from "~/server/utils/uploadthing";

const profileFormSchema = () =>
  z.object({
    name: z
      .string()
      .min(2, {
        message: "O nome do usuário precisa ser maior do que 2 caracteres",
      })
      .max(30, {
        message: "O nome do usuário precisa ser menor do que 30 caracteres",
      })
      .optional(),
    channelName: z
      .string()
      .min(2, { message: "O canal deve ter pelo menos 2 caracteres" })
      .max(30, { message: "O canal deve ter no maximo 30 caracteres" })
      .refine((value) => /^[a-zA-Z0-9_]{1,30}$/.test(value), {
        message:
          "O nome do canal deve conter apenas letras, números e sublinhados, e ter entre 1 e 15 caracteres",
      })
      .optional(),
    bio: z.string().max(160).optional(),
    xUrl: z.string().url().optional(),
    facebookUrl: z.string().url().optional(),
    instagramUrl: z.string().url().optional(),
    linkedinUrl: z.string().url().optional(),
    youtubeUrl: z.string().url().optional(),
    twitchUrl: z.string().url().optional(),
    tiktokUrl: z.string().url().optional(),
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
  closeRef,
}: {
  user: Awaited<ReturnType<typeof getUser>>;
  closeRef?: React.RefObject<HTMLButtonElement>;
}) {
  const defaultValues: ProfileFormValues = {
    name: user?.name ?? "",
    channelName: user?.channelName?.replace("@", "") ?? "",
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

  const [channel, setChannel] = useState(defaultValues.channelName);
  const [verificado, setVerificado] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema()),
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const mutationOnVerify = useMutation({
    mutationFn: verifyIfChannelIsAvailable,
    onSuccess: async () => {
      toast.success(`Canal @${channel} disponível`);
      setVerificado(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const mutationUpdateUser = useMutation({
    mutationFn: updateUser2,
    onSuccess: async () => {
      void queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast.success(`Informações atualizadas`);
      closeRef?.current?.click();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit() {
    const values = form.getValues();
    const {
      name,
      bio,
      xUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      youtubeUrl,
      twitchUrl,
      tiktokUrl,
    } = values;
    const data: Partial<User> = {
      name,
      bio,
      xUrl,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      youtubeUrl,
      twitchUrl,
      tiktokUrl,
    };
    if (verificado) {
      data.channelName = `@${channel}`;
    }
    if (JSON.stringify(data) === "{}") {
      toast.success(`Nenhum dado foi alterado`);
      return;
    }
    mutationUpdateUser.mutate(data);
  }

  function handleVerificar() {
    if (channel.length >= 2 && channel.length <= 30) {
      mutationOnVerify.mutate(`@${channel}`);
    } else {
      toast.error("O canal deve ter entre 2 e 30 caracteres");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const filteredValue = value.replace(/[^A-Za-z0-9_]/g, "");
    setChannel(filteredValue);
    setVerificado(false);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-h-[calc(100vh-96px)] space-y-4 overflow-y-auto px-1"
        >
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
                  <div className="flex items-center gap-x-2">
                    @
                    <Input
                      {...field}
                      defaultValue={defaultValues.channelName}
                      onChange={(e) => handleChange(e)}
                      value={channel}
                    />
                    <Button
                      variant={"default"}
                      disabled={
                        channel === defaultValues.channelName || verificado
                      }
                      type="button"
                      onClick={handleVerificar}
                    >
                      {channel === defaultValues.channelName || verificado ? (
                        <Check />
                      ) : mutationOnVerify.isPending ? (
                        <RefreshCw className="animate-spin" />
                      ) : (
                        <RefreshCw />
                      )}
                    </Button>
                  </div>
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
            <h4>Social media:</h4>

            <FormField
              control={form.control}
              name="xUrl"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-4">
                  <FormLabel className="mt-1 text-gray-500 dark:text-gray-400">
                    <Twitter color="#5AA4D7" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.xUrl}
                      placeholder="https://x.com"
                    />
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
                    <Facebook color="#0866FF" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.facebookUrl}
                      placeholder="https://facebook.com"
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
                    <Instagram color="#DD3E7C" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.instagramUrl}
                      placeholder="https://instagram.com"
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
                    <Linkedin color="#0A66C2" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.linkedinUrl}
                      placeholder="https://linkedin.com"
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
                    <Youtube color="#FF0000" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.youtubeUrl}
                      placeholder="https://youtube.com"
                    />
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
                    <Twitch color="#8D44F8" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue={defaultValues.twitchUrl}
                      placeholder="https://twitch.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {mutationUpdateUser.isPending ? (
            <div className="flex justify-end">
              <Button type="submit" className="mt-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button type="submit" className="mt-2">
                Salvar alterações
              </Button>
            </div>
          )}
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
  const image = user?.image ?? "/bg.png";

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
          <div className="relative">
            <Image
              src={image}
              alt={`Imagem do usuário ${name}`}
              className="mx-auto h-32 w-32 rounded-full object-cover"
              width={120}
              height={120}
            />
            <div className="absolute bottom-0 right-0">
              <PhotoDialog user={user} />
            </div>
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
  const closeRef = useRef<ElementRef<"button">>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Alterar informações</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar informações</DialogTitle>
        </DialogHeader>
        <ProfileForm user={user} closeRef={closeRef} />
        <div className="absolute bottom-6 left-6">
          <DialogClose ref={closeRef} asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </div>
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
  const x = user?.xUrl ?? "";
  const facebook = user?.facebookUrl ?? "";
  const instagram = user?.instagramUrl ?? "";
  const linkedin = user?.linkedinUrl ?? "";
  const youtube = user?.youtubeUrl ?? "";
  const twitch = user?.twitchUrl ?? "";
  const tiktok = user?.tiktokUrl ?? "";

  const isSocialMedia =
    x || facebook || instagram || linkedin || youtube || twitch || tiktok;

  return (
    <div className="flex flex-col gap-6">
      {bio ? <p>{bio}</p> : <p>...</p>}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Detalhes do usuário</h3>
        <div className="flex items-center gap-x-2 dark:text-gray-300">
          <Globe />
          <p className="text-sm ">
            http://localhost:3000/users/{user?.channelName}
          </p>
        </div>
      </div>
      {isSocialMedia && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Social Media</h3>
          <div className="flex flex-col gap-2">
            {x && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Twitter color="#5AA4D7" />
                <p className="text-sm">{x}</p>
              </div>
            )}
            {facebook && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Facebook color="#0866FF" />
                <p className="text-sm">{facebook}</p>
              </div>
            )}
            {instagram && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Instagram color="#DD3E7C" />
                <p className="text-sm">{instagram}</p>
              </div>
            )}
            {linkedin && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Linkedin color="#0A66C2" />
                <p className="text-sm">{linkedin}</p>
              </div>
            )}
            {youtube && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Youtube color="#FF0000" />
                <p className="text-sm">{youtube}</p>
              </div>
            )}
            {twitch && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Twitch color="#8D44F8" />
                <p className="text-sm">{twitch}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PhotoDialog({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar imagem</DialogTitle>
        </DialogHeader>
        <Photo user={user} />
      </DialogContent>
    </Dialog>
  );
}

function Photo({ user }: { user: Awaited<ReturnType<typeof getUser>> }) {
  const name = user?.name ?? "";
  const image = user?.image ?? "/bg.png";

  return (
    <div>
      <Image
        src={image}
        alt={`Imagem do usuário ${name}`}
        className="mx-auto h-32 w-32 rounded-full object-cover"
        width={120}
        height={120}
      />
      {/* <div className="rounded-xl border outline-dashed outline-muted">
        <UploadDropzone
          input={{ id: streamId }}
          endpoint="thumbnailEdit"
          appearance={{
            label: {
              color: "#FFFFFF",
            },
            allowedContent: {
              color: "#FFFFFF",
            },
          }}
          onClientUploadComplete={(res) => {
            res[0]?.url && setThumbnailUrl(res?.[0]?.url);
            router.refresh();
            closeRef?.current?.click();
          }}
        />
      </div> */}
    </div>
  );
}
