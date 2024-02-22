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
import { Form } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/ui/form";
import { z } from "zod";

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
    }),
    defaultValues: {
      datetime: dayjs().add(1, "day").toDate(),
      private: false,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar novo evento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              //mutation.mutate(form.getValues());
            })}
          >
            <DialogHeader>
              <DialogTitle>Criar evento</DialogTitle>
              <DialogDescription>Crie aqui seu evento!</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
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
                        <Input placeholder="Descrição" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descrição do seu evento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Input id="description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="datetime" className="text-right">
                  Data e hora
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="private" className="text-right">
                  Privado
                </Label>
                <Checkbox id="private" />
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
