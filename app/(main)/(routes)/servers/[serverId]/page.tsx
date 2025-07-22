import { redirect } from 'next/navigation';
import { RedirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

type Props = {
  params: Promise<{
    serverId: string;
  }>;
};

export default async function Server({ params }: Props) {
  const profile = await currentProfile();
  if (!profile) return RedirectToSignIn;

  const { serverId } = await params;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: { profileId: profile.id },
      },
    },
    include: {
      channels: {
        where: { name: 'general' },
        orderBy: { createdAt: 'asc' },
        take: 1,
      },
    },
  });

  if (!server || server.channels.length === 0) {
    return redirect('/');
  }

  const generalChannel = server.channels[0];

  return redirect(`/servers/${serverId}/channels/${generalChannel.id}`);
}
