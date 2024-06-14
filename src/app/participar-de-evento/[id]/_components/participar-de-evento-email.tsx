import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { getBaseUrl } from "~/utils/getBaseUr";

interface AncWelcomeEmailProps {
  userFirstname: string;
  event: {
    id: string;
    title: string;
  };
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ParticiparDeEventoEmail = ({
  userFirstname,
  event,
}: AncWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Obrigado por se inscrever no evento!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/favicon.png`}
          width="170"
          height="50"
          alt="Anc"
          style={logo}
        />
        <Text style={paragraph}>Olá {userFirstname},</Text>
        <Text style={paragraph}>
          Obrigado por se inscrever no evento! Você pode acessar o evento aqui:
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={`${getBaseUrl()}/event/${event.id}`}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>Time Ancora</Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

ParticiparDeEventoEmail.PreviewProps = {
  userFirstname: "Alan",
} as AncWelcomeEmailProps;

export default ParticiparDeEventoEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
