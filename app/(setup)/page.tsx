import { redirect } from 'next/navigation';

import { InitialModal } from '@/components/modals/initial';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { Profile } from '@/prisma/types';

export default async function Page() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: (profile as Profile).id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
