import { getUserByChannelName } from "~/server/actions/user";
import { getEventsByChannelName } from "~/server/actions/stream";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  ChevronRight,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitch,
} from "lucide-react";
import { Button } from "~/components/ui/button";



export default async function ChannelPage({
  params: { channelName },
}: {
  params: { channelName: string };
}) {
  
	const channel = channelName.replace("%40", "@");
	const events = await getEventsByChannelName(channel);
  const user = await getUserByChannelName(channel);

  return (
		<ProfileCard user={user}/>
	);
}



export function ProfileCard({
  user,
}: {
  user: Awaited<ReturnType<typeof getUserByChannelName>>;
}) {
  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const channelName = user?.channelName ?? "";
  const image = user?.image ?? "/bg.png";

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-col items-center gap-4 rounded-xl border bg-card p-4 text-card-foreground shadow">
          <div className="relative">
            <Image
              src={image}
              alt={name}
              className="mx-auto h-32 w-32 rounded-full object-cover"
              width={120}
              height={120}
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <h2 className="font-semibold leading-none tracking-tight md:text-xl lg:text-2xl">
              {name}
            </h2>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p className="text-base">{channelName}</p>
              <p>{email}</p>
            </div>
            <AboutDialog user={user} />
          </div>
        </div>
      </div>
    </>
  );
}



function AboutDialog({ user }: { user: Awaited<ReturnType<typeof getUserByChannelName>> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          Sobre
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sobre</DialogTitle>
        </DialogHeader>
        <About user={user} />
      </DialogContent>
    </Dialog>
  );
}

function About({ user }: { user: Awaited<ReturnType<typeof getUserByChannelName>> }) {
  const bio = user?.bio ?? "";
  const x = user?.xUrl ?? "";
  const facebook = user?.facebookUrl ?? "";
  const instagram = user?.instagramUrl ?? "";
  const linkedin = user?.linkedinUrl ?? "";
  const youtube = user?.youtubeUrl ?? "";
  const twitch = user?.twitchUrl ?? "";
  const tiktok = user?.tiktokUrl ?? "";

  const isSocialMedia =
    x || facebook || instagram || linkedin || youtube || twitch || tiktok;

  return (
    <div className="flex flex-col gap-6">
      {bio ? <p>{bio}</p> : <p>...</p>}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Detalhes do usuário</h3>
        <div className="flex items-center gap-x-2 dark:text-gray-300">
          <Globe />
          <p className="text-sm ">
            http://localhost:3000/users/{user?.channelName}
          </p>
        </div>
      </div>
      {isSocialMedia && (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Social Media</h3>
          <div className="flex flex-col gap-2">
            {x && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Twitter color="#5AA4D7" />
                <p className="text-sm">{x}</p>
              </div>
            )}
            {facebook && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Facebook color="#0866FF" />
                <p className="text-sm">{facebook}</p>
              </div>
            )}
            {instagram && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Instagram color="#DD3E7C" />
                <p className="text-sm">{instagram}</p>
              </div>
            )}
            {linkedin && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Linkedin color="#0A66C2" />
                <p className="text-sm">{linkedin}</p>
              </div>
            )}
            {youtube && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Youtube color="#FF0000" />
                <p className="text-sm">{youtube}</p>
              </div>
            )}
            {twitch && (
              <div className="flex items-center gap-x-2 dark:text-gray-300">
                <Twitch color="#8D44F8" />
                <p className="text-sm">{twitch}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

