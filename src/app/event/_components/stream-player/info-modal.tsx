"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition, type ElementRef } from "react";
import { toast } from "sonner";
import { Hint } from "~/components/hint";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { updateStream } from "~/server/actions/stream";
import { UploadDropzone } from "~/server/utils/uploadthing";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
  streamId: string;
}

export const InfoModal = ({
  initialName: initialTitle,
  initialThumbnailUrl,
  streamId,
}: InfoModalProps) => {
  // const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(initialTitle);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onRemove = () => {
    startTransition(() => {
      updateStream({
        streamId,
        values: {
          thumbnailUrl: null,
        },
      })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({
        streamId,
        values: {
          title,
        },
      })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
				<Button variant="link" className="ml-auto">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar informações do evento</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={title}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <div className="absolute right-2 top-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  input={{ id: streamId }}
                  endpoint="thumbnailEdit"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    res[0]?.url && setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
