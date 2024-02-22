import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "~/components/providers";
import { cn } from "~/lib/utils";
import Header from "./_components/header/header";
import { ReactQueryProvider } from "./_components/providers";
import { ModeToggle } from "~/components/theme-toggle";
import { Toaster } from "~/components/ui/sonner";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ancora app",
  description: "O aplicativo de streaming da Ancora",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
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
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <ReactQueryProvider>
              <Toaster richColors />
              <Header />
              {children}
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
