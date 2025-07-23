import React from 'react';
import { redirect } from 'next/navigation';
import { RedirectToSignIn } from '@clerk/nextjs';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { getOrCreateConversation } from '@/lib/conversation';

import { ChatHeader } from '@/components/chat/header';
import { ChatMessages } from '@/components/chat/messages';
import { ChatInput } from '@/components/chat/input';

interface Props {
  params: Promise<{
    serverId: string;
    memberId: string;
  }>;
}

const ConversationPage = async ({ params }: Props) => {
  const profile = await currentProfile();
  if (!profile) return RedirectToSignIn;

  const { serverId, memberId } = await params;

  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) return redirect('/');

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) return redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={serverId}
        type="conversation"
      />
      <ChatMessages
        member={currentMember}
        name={otherMember.profile.name}
        chatId={conversation.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        paramKey="conversationId"
        paramValue={conversation.id}
        socketUrl="/api/socket/direct-messages"
        socketQuery={{
          conversationId: conversation.id,
        }}
      />
      <ChatInput
        name={otherMember.profile.name}
        type="conversation"
        apiUrl="/api/socket/direct-messages"
        query={{
          conversationId: conversation.id,
        }}
      />
    </div>
  );
};

export default ConversationPage;
