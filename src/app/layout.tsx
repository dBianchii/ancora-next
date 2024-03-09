import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { ReactQueryProvider, ThemeProvider } from "~/components/providers";
import { ModeToggle } from "~/components/theme-toggle";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/components/ui/lib/utils";
import Header from "./_components/header/header";
import { SidebarNav } from "./_components/sidebar-nav";
import { Separator } from "~/components/ui/separator";
import { getServerAuthSession } from "~/server/auth";
import MaxWidthWrapper from "~/components/max-width-wrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ancora app",
  description: "O aplicativo de streaming da Ancora",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

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
              <MaxWidthWrapper>
                <Header />
                <Toaster richColors />
                {session ? (
                  <div className="space-y-6 p-10 pb-16 md:block ">
                    <div className="space-y-0.5">
                      <h2 className="text-2xl font-bold tracking-tight">
                        Minha área
                      </h2>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                      <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav />
                      </aside>
                      <div className="flex-1">{children}</div>
                    </div>
                  </div>
                ) : (
                  children
                )}
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
