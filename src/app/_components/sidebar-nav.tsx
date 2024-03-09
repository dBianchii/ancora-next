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
  const prefix = "/dashboard";
  const items = [
    {
      href: `${prefix}/`,
      title: "Página inicial",
    },
    {
      href: `${prefix}/biblioteca`,
      title: "Biblioteca",
    },
    {
      href: `${prefix}/destinos`,
      title: "Destinos",
    },
    {
      href: `${prefix}/equipes`,
      title: "Equipes",
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
