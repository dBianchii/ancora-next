"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../actions";
import dayjs from "dayjs";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  Form,
} from "~/components/ui/form";
import { z } from "zod";
import { DatePicker } from "~/components/ui/date-picker";
import { ClockIcon, TimerIcon } from "@radix-ui/react-icons";
import { TimePickerInput } from "~/components/ui/time-picker/time-picker-input";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MultiSelect } from "~/components/ui/multi-select";

export function CreateEventsButton() {
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof createEvent>[0]) => createEvent(data),
  });

  const form = useForm({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      datetime: z.date(),
      private: z.boolean(),
      invitedPrivateUsers: z.array(z.string()),
    }),
    defaultValues: {
      datetime: dayjs().add(1, "day").toDate(),
      private: false,
    },
  });

  const [parent] = useAutoAnimate();

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar novo evento</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              mutation.mutate(form.getValues());
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
                              dayjs(date).isBefore(dayjs(new Date()))
                            }
                            date={field.value}
                            setDate={(newDate) =>
                              form.setValue(
                                "datetime",
                                newDate ?? dayjs(new Date()).toDate(),
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
                <FormField
                  control={form.control}
                  name="private"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evento privado?</FormLabel>
                      <FormControl>
                        <div>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              form.setValue("invitedPrivateUsers", []);
                              field.onChange(value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div ref={parent}>
                  {form.getValues().private && (
                    <FormField
                      control={form.control}
                      name="invitedPrivateUsers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participantes</FormLabel>
                          <FormControl>
                            <MultiSelect
                              selected={field.value}
                              options={[
                                { label: "User 1", value: "user1" },
                                { label: "User 2", value: "user2" },
                                { label: "User 3", value: "user3" },
                              ]}
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
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  mutation.mutate({
                    name: "Meu evento",
                    datetime: dayjs().add(1, "day").toDate(),
                    description: "A cool event",
                    private: false,
                    fireReminderEmailAt: new Date(),
                    invitedPrivateUsers: [],
                  });
                }}
              >
                Agendar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
