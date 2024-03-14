import { redirect } from "next/navigation";
import { Separator } from "../../../components/ui/separator";
import { ProfileForm } from "./components/profile-form";
import { getServerAuthSession } from "~/server/auth";

export default async function Perfil() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  return (
    <div className="space-y-6">
      <div className="flex">
        <h3 className="text-lg font-medium">Perfil de usuário</h3>
      </div>
      <Separator />
      <ProfileForm session={session} />
    </div>
  );
}
