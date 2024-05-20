import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { db } from "~/server/db";

const f = createUploadthing();

export const ourFileRouter = {
  genericImageUpload: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { fileUrl: file.url };
  }),
  thumbnailEdit: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ id: z.string() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          id: metadata.input.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
  userImageEdit: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ id: z.string() }))
    .middleware(async ({ input }) => {
      return { input };
    })	
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: {
          id: metadata.input.id,
        },
        data: {
          image: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
