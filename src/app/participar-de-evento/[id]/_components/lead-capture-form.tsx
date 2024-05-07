"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { getErrorMessage } from "~/utils/getErrorMessage";
import { captureLead } from "../_actions/captureLead";

export function LeadCaptureForm({ eventId }: { eventId: string }) {
  const form = useForm({
    schema: z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }),
  });

  const mutation = useMutation({
    mutationFn: captureLead,
    onSuccess: async () => {
      toast.success("Evento criado com sucesso!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-3"
        onSubmit={form.handleSubmit((data) => {
          mutation.mutate({ ...data, eventId });
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="nome" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-2" type="submit">
          Quero participar!
        </Button>
      </form>
    </Form>
  );
}
