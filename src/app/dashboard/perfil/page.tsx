import { redirect } from "next/navigation";
// import { ProfileForm } from "./components/profile-form";
import { ProfileCard } from "./components/profile-form";
import { getServerAuthSession } from "~/server/auth";

export default async function Perfil() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  return (
    <section className="h-full py-6 lg:border-l lg:pl-8">
        <h1 className="mb-4 space-y-1 text-2xl font-semibold tracking-tight ">
          Perfil do Usuário
        </h1>
      {/* <ProfileForm session={session} /> */}
			<ProfileCard session={session} /> 
    </section>
  );
}
