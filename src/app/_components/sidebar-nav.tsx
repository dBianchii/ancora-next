"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "../../components/ui/lib/utils";
import {
  HomeIcon,
	VideoIcon,
  Key,
  LibraryIcon,
  RadioTowerIcon,
  Users2Icon,
  UserRound,
} from "lucide-react";

export function SidebarNav() {
  const prefix = "/dashboard";
  const items = [
    {
      href: `${prefix}`,
      title: (
        <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
          <HomeIcon className="size-4 text-primary/70" />
          <span className="hidden sm:block">Dashboard</span>
        </div>
      ),
    },
		{
      href: `${prefix}/eventos`,
      title: (
        <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
          <VideoIcon className="size-4 text-primary/70" />
          <span className="hidden sm:block">Eventos</span>
        </div>
      ),
    },
    // {
    //   href: `${prefix}/biblioteca`,
    //   title: (
    //     <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
    //       <LibraryIcon className="size-4 text-primary/70" />
    //       <span className="hidden sm:block">Biblioteca</span>
    //     </div>
    //   ),
    // },
    // {
    //   href: `${prefix}/destinos`,
    //   title: (
    //     <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
    //       <RadioTowerIcon className="flex size-4 text-primary/70" />
    //       <span className="hidden sm:block">Destinos</span>
    //     </div>
    //   ),
    // },
    {
      href: `${prefix}/equipes`,
      title: (
        <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
          <Users2Icon className="size-4 text-primary/70" />
          <span className="hidden sm:block">Equipes</span>
        </div>
      ),
    },
    {
      href: `${prefix}/chaves`,
      title: (
        <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
          <Key className="size-4 text-primary/70" />
          <span className="hidden sm:block">Chaves</span>
        </div>
      ),
    },
    {
      href: `${prefix}/perfil`,
      title: (
        <div className="m-auto sm:m-0 sm:flex sm:items-center sm:gap-4 sm:align-middle">
          <UserRound className="size-4 text-primary/70" />
          <span className="hidden sm:block">Perfil</span>
        </div>
      ),
    },
  ];
  return (
    <aside>
      <NavigationMenu className="flex w-full max-w-4xl self-start">
        <NavigationMenuList
          className={cn("flex w-full flex-row space-y-2 lg:flex-col")}
        >
          {items.map((item, i) => (
            <NavigationItem key={i} href={item.href}>
              {item.title}
            </NavigationItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}

function NavigationItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "justify-start text-center font-bold lg:w-60",
            pathname.endsWith(href) && "bg-muted",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
