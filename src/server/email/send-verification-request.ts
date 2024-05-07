import type { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from "resend";

import VerificationRequestEmail from "./templates/verification-request";
import { defaultEmailFrom } from "~/utils/constants";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  try {
    await resend.emails.send({
      from: defaultEmailFrom,
      to: params.identifier,
      subject: "Ancora login verification",
      react: VerificationRequestEmail({
        magicLink: params.url,
      }),
    });
  } catch (error) {
    console.log({ error });
  }
};
