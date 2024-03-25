import { redirect } from "next/navigation";
import { Separator } from "../../../components/ui/separator";
import { ProfileForm } from "./components/profile-form";
import { getServerAuthSession } from "~/server/auth";

export default async function Perfil() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  return (
    <section className="h-full py-6 lg:border-l lg:pl-8">
        <h2 className="mb-4 space-y-1 text-2xl font-semibold tracking-tight ">
          Perfil do Usuário
        </h2>
      <ProfileForm session={session} />
    </section>
  );
}
