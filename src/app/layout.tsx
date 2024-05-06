import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { ReactQueryProvider, ThemeProvider } from "~/components/providers";
import { ModeToggle } from "~/components/theme-toggle";
import { cn } from "~/components/ui/lib/utils";
import { Toaster } from "~/components/ui/sonner";
import Header from "./_components/header/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ANC.",
  description: "O aplicativo de streaming da Ancora",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
        >
          <div className="flex min-h-screen flex-col">
            <ReactQueryProvider>
              <MaxWidthWrapper>
                <Header />
                <Toaster richColors />
                {children}
              </MaxWidthWrapper>
              <div className="fixed bottom-1 z-50 flex flex-row items-center space-x-1">
                <ModeToggle />
              </div>
            </ReactQueryProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
