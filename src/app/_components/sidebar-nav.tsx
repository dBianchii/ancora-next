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

export function SidebarNav() {
  const items = [
    {
      href: "/",
      title: "Página inicial",
    },
    {
      href: "/biblioteca",
      title: "Biblioteca",
    },
    {
      href: "/destinos",
      title: "Destinos",
    },
    {
      href: "/equipes",
      title: "Equipes",
    },
  ];

  return (
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
          active={pathname === href}
          className={cn(
            navigationMenuTriggerStyle(),
            "justify-start text-center font-bold lg:w-60",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
