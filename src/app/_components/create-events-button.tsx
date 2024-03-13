"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ClockIcon, PlusIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { DatePicker } from "~/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { MultiSelect } from "~/components/ui/multi-select";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { TimePickerInput } from "~/components/ui/time-picker/time-picker-input";
import { useEventsData, useTeamsData } from "./hooks";
import { Loader2, X } from "lucide-react";
import { UploadDropzone } from "~/server/utils/uploadthing";
import Image from "next/image";

export function CreateEventsButton() {
  const { query } = useTeamsData();
  const [isPrivate, setIsPrivate] = useState(false);

  const form = useForm({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      datetime: z.date(),
			// invitedPrivateUsers: z.array(z.string().email()).refine((values) => {
      //   if (isPrivate) {
      //     if (values.length > 0) return true;
      //     return false;
      //   }
      //   return true;
      // }, "Se o seu evento é privado, você deve convidar pelo menos um usuário."),
      invitedPrivateUsers: z.array(z.string()).refine((values) => {
        if (isPrivate) {
          if (values.length > 0) return true;
          return false;
        }
        return true;
      }, "Se o seu evento é privado, você deve convidar pelo menos um usuário."),
      thumbnailUrl: z.string().optional(),
    }),
    defaultValues: {
      datetime: dayjs().toDate(),
      invitedPrivateUsers: [],
    },
  });

  const [parent] = useAutoAnimate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutation } = useEventsData();

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        form.reset();
        setIsPrivate(false);
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" /> Criar novo evento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate(form.getValues(), {
                onSuccess: () => {
                  setDialogOpen(false);
                },
              });
            })}
          >
            <DialogHeader>
              <DialogTitle>Criar evento</DialogTitle>
              <DialogDescription>Crie aqui seu evento!</DialogDescription>
            </DialogHeader>
            <div className="grid w-full items-center gap-4 py-4">
              <div className="flex flex-col space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Titulo" {...field} />
                      </FormControl>
                      <FormDescription>O título do seu evento</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descrição" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descrição do seu evento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="datetime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data e horário</FormLabel>
                      <FormControl>
                        <div className="flex flex-row gap-2">
                          <DatePicker
                            disabledDate={(date) =>
                              dayjs(date).isBefore(dayjs(), 'day')
                            }
                            date={field.value}
                            setDate={(newDate) =>
                              form.setValue(
                                "datetime",
                                newDate ?? dayjs().toDate(),
                              )
                            }
                          />
                          <div className="flex items-center gap-1 pl-4">
                            <ClockIcon className="h-5 w-5 text-muted-foreground" />
                            <TimePickerInput
                              picker={"hours"}
                              date={field.value}
                              setDate={(date) =>
                                form.setValue("datetime", date ?? field.value)
                              }
                            />
                            <TimePickerInput
                              picker={"minutes"}
                              date={field.value}
                              setDate={(date) =>
                                form.setValue("datetime", date ?? field.value)
                              }
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Quando a transmissão ocorrerá?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <Label htmlFor="private">Evento privado?</Label>
                  <Switch
                    id="private"
                    onCheckedChange={(value) => {
                      if (value === false)
                        form.setValue("invitedPrivateUsers", []);

                      setIsPrivate(value);
                    }}
                    checked={isPrivate}
                  />
                </div>
                <div ref={parent}>
                  {isPrivate && (
                    <FormField
                      control={form.control}
                      name="invitedPrivateUsers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participantes</FormLabel>
                          <FormControl>
                            <MultiSelect
                              options={
                                query.data?.map((team) => ({
                                  label: team.name,
                                  value: JSON.stringify(team.usersEmails),
                                })) ?? []
                              }
                              // options={[
                              //   { label: "User 1", value: "joao@gmail.com" },
                              //   { label: "User 2", value: "joao@gmail.com" },
                              //   { label: "User 3", value: "joao@gmail.com" },
                              // ]}
                              customValues
															customValuesSchema={z.string()}
                              // customValuesSchema={z.string().email()}
                              selected={field.value ?? []}
                              onChange={(newValues: string[]) => {
                                form.setValue("invitedPrivateUsers", newValues);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {form.getValues().thumbnailUrl ? (
                  <div className="relative flex">
                    <Image
                      className="hover:opacity- transition-opacity duration-300"
                      src={form.getValues().thumbnailUrl!}
                      alt="Thumbnail"
                      width={200}
                      height={200}
                    />
                    <div className="absolute min-w-fit p-3">
                      <Button
                        onClick={() => form.setValue("thumbnailUrl", undefined)}
                        variant={"outline"}
                        size="icon"
                        className="p-2"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="genericImageUpload"
                    appearance={{
                      label: {
                        color: "#FFFFFF",
                      },
                      allowedContent: {
                        color: "#FFFFFF",
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      res[0]?.url &&
                        form.setValue("thumbnailUrl", res?.[0]?.url);
                    }}
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {mutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Agendar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
