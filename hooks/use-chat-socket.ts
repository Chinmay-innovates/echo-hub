import { useEffect } from 'react';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { useSocket } from '@/components/providers/socket-provider';
import { MessageWithMemberWithProfile } from '@/prisma/types';

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  onMessage?: (message: MessageWithMemberWithProfile) => void;
};

type PaginatedMessages = {
  items: MessageWithMemberWithProfile[];
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
  onMessage,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData<InfiniteData<PaginatedMessages>>(
        [queryKey],
        (oldData) => {
          if (!oldData) return oldData;

          const updatedPages = oldData.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item.id === message.id ? message : item
            ),
          }));

          return {
            ...oldData,
            pages: updatedPages,
          };
        }
      );
    };

    const handleAdd = (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData<InfiniteData<PaginatedMessages>>(
        [queryKey],
        (oldData) => {
          if (!oldData) {
            return {
              pages: [{ items: [message] }],
              pageParams: [],
            };
          }

          const newPages = [...oldData.pages];
          newPages[0] = {
            ...newPages[0],
            items: [message, ...(newPages[0].items || [])],
          };

          return {
            ...oldData,
            pages: newPages,
          };
        }
      );

      // 🔥 Trigger optional external handler (e.g. for unread detection)
      if (typeof onMessage === 'function') {
        onMessage(message);
      }
    };

    socket.on(addKey, handleAdd);
    socket.on(updateKey, handleUpdate);

    return () => {
      socket.off(addKey, handleAdd);
      socket.off(updateKey, handleUpdate);
    };
  }, [socket, queryClient, queryKey, addKey, updateKey, onMessage]);
};
