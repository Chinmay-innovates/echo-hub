'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowDown, Loader2, ServerCrash } from 'lucide-react';

import { cn, format } from '@/lib/utils';
import { useChatQuery } from '@/hooks/use-chat-query';
import { Member, MessageWithMemberWithProfile } from '@/prisma/types';

import { ChatItem } from './item';
import { ChatWelcome } from './welcome';

import { useChatSocket } from '@/hooks/use-chat-socket';
import { useChatScroll } from '@/hooks/use-chat-scroll';

const DATE_FORMAT = 'dd MMM yyyy, HH:mm';

type Props = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  paramValue: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  type: 'channel' | 'conversation';
};

export const ChatMessages = ({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}: Props) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [hasUnread, setHasUnread] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatQuery({
      apiUrl,
      paramKey,
      paramValue,
      queryKey,
    });
  const { isAtBottom } = useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0].item?.length ?? 0,
  });
  useChatSocket({
    addKey,
    updateKey,
    queryKey,
    onMessage: () => {
      if (!isAtBottom) {
        setHasUnread(true);
        setUnreadCount((prev) => prev + 1);
      }
    },
  });

  useEffect(() => {
    if (isAtBottom && hasUnread) {
      setHasUnread(false);
      setUnreadCount(0);
    }
  }, [isAtBottom, hasUnread]);

  if (status === 'pending') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="size-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="size-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }
  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}

      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
              aria-label="Load previous messages"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      {hasUnread && (
        <div className="flex justify-center mb-4 relative z-20">
          <button
            onClick={() => {
              bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
              setHasUnread(false);
            }}
            className="group px-4 py-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-xl border border-white/20 backdrop-blur-sm"
            role="button"
            aria-label={`Scroll to latest ${unreadCount} unread message${
              unreadCount > 1 ? 's' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-xs font-medium">
              <ArrowDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
              {`New message${unreadCount > 1 ? 's' : ''} (${unreadCount})`}
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </span>
          </button>
        </div>
      )}

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                member={message.member}
                currentMember={member}
                content={message.content}
                deleted={message.deleted}
                isUpdated={message.updatedAt !== message.createdAt}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                fileUrl={message.fileUrl}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
