import { redirect } from 'next/navigation';
import { RedirectToSignIn } from '@clerk/nextjs';

import { ChatHeader } from '@/components/chat/header';
import { ChatInput } from '@/components/chat/input';
import { currentProfile } from '@/lib/current-profile';

import { db } from '@/lib/db';
import { ChatMessages } from '@/components/chat/messages';

type Props = {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
};
const ChannelPage = async ({ params }: Props) => {
  const profile = await currentProfile();
  if (!profile) return RedirectToSignIn;

  const { serverId, channelId } = await params;

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!member || !channel) {
    redirect(`/`);
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages
        member={member}
        name={channel.name}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
        chatId={channel.id}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelPage;
