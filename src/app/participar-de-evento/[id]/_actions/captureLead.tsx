"use server";

import { db } from "~/server/db";
import { resend } from "~/server/email/send-verification-request";
import ParticiparDeEventoEmail from "../_components/participar-de-evento-email";

export const captureLead = async (data: {
  name: string;
  email: string;
  eventId: string;
}) => {
  const event = await db.stream.findUnique({
    where: {
      id: data.eventId,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  if (!event) throw new Error("Event not found");

  await db.leads.create({
    data: {
      name: data.name,
      email: data.email,
      Events: {
        connect: {
          id: data.eventId,
        },
      },
    },
  });

  await resend.emails.send({
    from: "Ancora <ancoranotification@kodix.com.br>",
    to: data.email,
    subject: "Você se inscreveu no evento!",
    react: <ParticiparDeEventoEmail userFirstname={data.name} event={event} />,
  });
};
