import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "../../../../components/ui/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../../../components/ui/context-menu";

import { type Album } from "../data/albums";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  width,
  height,
  aspectRatio,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={album.cover}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Adicionar Favoritos</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              {" "}
              {/*<PlusCircledIcon className="mr-2 h-4 w-4" />*/}
              Nova Playlist
            </ContextMenuSubTrigger>
            {/*<ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Nova Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
            </ContextMenuSubContent>*/}
          </ContextMenuSub>
          <ContextMenuSeparator />
          {/*<ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />*/}
          <ContextMenuItem>Curti</ContextMenuItem>
          <ContextMenuItem>Compartilhar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y- text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <div className="flex justify-between">
          <p className="text-xs text-muted-foreground">{album.artist}</p>
          <p className="text-xs text-muted-foreground">{album.tempo}</p>
        </div>
      </div>
    </div>
  );
}
