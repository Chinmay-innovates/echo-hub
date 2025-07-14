import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const requireAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError('Unauthorized');
  return { userId };
};

const handleUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: {
    userId: string;
  };
  file: {
    ufsUrl: string;
  };
}) => {
  console.log(`Upload complete for userId: ${metadata.userId}`);
  console.log('File URL:', file.ufsUrl);
  return {
    uploadedBy: metadata.userId,
  };
};

export const ourFileRouter = {
  serverImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(() => requireAuth())
    .onUploadComplete(handleUploadComplete),

  messageFile: f(['image', 'pdf'])
    .middleware(() => requireAuth())
    .onUploadComplete(handleUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
