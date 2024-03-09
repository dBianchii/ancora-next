import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (session) redirect("/dashboard");

  return (
    <main className="flex-1">
      <div className="container mb-4 flex max-w-[920px] flex-col items-center gap-6 py-4 text-center sm:mt-6 md:mt-8 lg:mt-10 lg:gap-12">
        <h1 className="w-full text-4xl font-bold lg:text-6xl">
          A maneira mais fácil de fazer transmissões ao vivo
        </h1>
        <p className="max-w-[640px] text-base lg:text-lg">
          O StreamAnchor é um estúdio de transmissão ao vivo profissional no seu
          navegador. Engage com a sua audiência e obtenha métricas.
        </p>
        <Button size="custom" className="text-base font-bold">
          Comece já: é grátis!
        </Button>
      </div>

      <div className="container mx-auto flex min-h-[250px] items-center justify-center rounded-md border-2 md:h-[400px] lg:h-[612px]">
        <h1>IMAGE / VIDEO</h1>
      </div>
    </main>
  );
}

function LoggedInViewSkeleton() {
  return (
    <div className="gap-2">
      <h2 className="pb-4 text-2xl font-bold text-center sm:text-start">Meus eventos</h2>
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-[200px] w-full" />{" "}
    </div>
  );
}
