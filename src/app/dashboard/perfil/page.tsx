import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { getUser } from "~/server/actions/user";
import { PerfilPageClient } from "./components/perfil-page-client";

export default async function Perfil() {
  const session = await getServerAuthSession();
	const user = await getUser();
  if (!session) redirect("/");

  return (
    <section className="h-full py-6 lg:border-l lg:pl-8">
        <h1 className="mb-4 space-y-1 text-2xl font-semibold tracking-tight ">
          Perfil do Usuário
        </h1>
      <PerfilPageClient user={user} />
    </section>
  );
}
