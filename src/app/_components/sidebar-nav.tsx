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
  Key,
  LibraryIcon,
  RadioTowerIcon,
  Users2Icon,
} from "lucide-react";

export function SidebarNav() {
  const prefix = "/dashboard";
  const items = [
    {
      href: `${prefix}`,
      title: (
        <>
          <HomeIcon className="mr-2 size-4 text-primary/70" />
          <span>Dashboard</span>
        </>
      ),
    },
    {
      href: `${prefix}/biblioteca`,
      title: (
        <>
          <LibraryIcon className="mr-2 size-4 text-primary/70" />
          <span>Biblioteca</span>
        </>
      ),
    },
    {
      href: `${prefix}/destinos`,
      title: (
        <>
          <RadioTowerIcon className="mr-2 size-4 text-primary/70" />
          <span>Destinos</span>
        </>
      ),
    },
    {
      href: `${prefix}/equipes`,
      title: (
        <>
          <Users2Icon className="mr-2 size-4 text-primary/70" />
          <span>Equipes</span>
        </>
      ),
    },
    {
      href: `${prefix}/chaves`,
      title: (
        <>
          <Key className="mr-2 size-4 text-primary/70" />
          <span>Chaves</span>
        </>
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
