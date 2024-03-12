import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { UserProfileButton } from "./user-profile-button";
import HeaderRemover from "~/components/header-remover";
import { Anchor } from "lucide-react";

export default async function Header() {
  const session = await getServerAuthSession();
  return (
    <HeaderRemover>
      <header className="border-b px-4 py-2">
        <div className="mx-auto flex max-w-screen-2xl items-center">
          <Link
            href={session ? "/dashboard" : "/"}
            className="flex gap-2 text-bold text-xl font-medium text-primary"
          >
						<Anchor color="white"/>
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text font-extrabold tracking-tight text-transparent">
              ANC.
            </span>
          </Link>

          <div className="ml-auto flex items-center space-x-4">
            {!!session && <UserProfileButton session={session} />}
            {!session && (
              <div className="mr-5 space-x-2">
                <Link href="/login" className={buttonVariants()}>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </HeaderRemover>
  );
}
