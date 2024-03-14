import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "../../../components/ui/button";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { Separator } from "../../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { AlbumArtwork } from "./components/album-artwork";

import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";

export default function Biblioteca() {
  return (
    <>
      <div>
        <div className="bg-background">
          <div className="grid lg:grid-cols-1">
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full py-6 lg:pl-8">
                <Tabs defaultValue="lives" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="lives" className="relative">
                        Gravados
                      </TabsTrigger>
                      <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
                      <TabsTrigger value="live" disabled>
                        Historico
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent
                    value="lives"
                    className="border-none p-0 outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Veja agora
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Últimos <b>lançamentos</b>
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-10 pb-4">
                          {listenNowAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              aspectRatio="portrait"
                              width={300}
                              height={330}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                    <div className="mt-6 space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Feitos para você
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Talvez você se interesse...
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className="w-[200px]"
                              aspectRatio="square"
                              width={400}
                              height={150}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="favoritos"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Favoritos
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Suas lives favoritas
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <PodcastEmptyPlaceholder />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
