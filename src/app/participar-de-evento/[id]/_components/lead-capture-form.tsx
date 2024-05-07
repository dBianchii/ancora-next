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
import { captureLead } from "../_actions/captureLeadAction";

export function LeadCaptureForm({ eventId }: { eventId: string }) {
  const form = useForm({
    schema: z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }),
  });

  const mutation = useMutation({
    mutationFn: captureLead,
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-3"
        onSubmit={form.handleSubmit((data) => {
          toast.promise(mutation.mutateAsync({ ...data, eventId }), {
            loading: "Cadastrando...",
            success: (res) => {
              if (res?.message === "user_already_registered_for_event") {
                return "Parece que você já se inscreveu neste evento. Nos vemos lá!";
              }

              return "Cadastrado com sucesso Dê uma olhada em seu email para mais informações!";
            },
            error: getErrorMessage,
            position: "top-center",
          });
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

        <Button className="mt-2" type="submit" disabled={mutation.isPending}>
          Quero participar!
        </Button>
      </form>
    </Form>
  );
}
