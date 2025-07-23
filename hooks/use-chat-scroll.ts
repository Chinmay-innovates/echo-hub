import { useEffect, useRef, useState } from 'react';

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const isAutoScrolling = useRef(false);

  // Infinite scroll: Load older messages when scrolled to top
  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    const handleScroll = () => {
      if (chat.scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }

      const distFromBottom =
        chat.scrollHeight - chat.scrollTop - chat.clientHeight;
      setIsAtBottom(distFromBottom <= 100);
    };

    chat.addEventListener('scroll', handleScroll);
    return () => chat.removeEventListener('scroll', handleScroll);
  }, [chatRef, shouldLoadMore, loadMore]);

  // Scroll to bottom on new message
  useEffect(() => {
    const chat = chatRef.current;
    const bottom = bottomRef.current;
    if (!chat || !bottom) return;

    const distFromBottom =
      chat.scrollHeight - chat.scrollTop - chat.clientHeight;
    const isUserNearBottom = distFromBottom <= 100;

    // On first load, scroll all the way down
    if (!hasInitialized) {
      setHasInitialized(true);
      bottom.scrollIntoView({ behavior: 'auto' });
      return;
    }

    // On new message, auto-scroll if user is near bottom
    if (isUserNearBottom && !isAutoScrolling.current) {
      isAutoScrolling.current = true;
      requestAnimationFrame(() => {
        bottom.scrollIntoView({ behavior: 'smooth' });
        isAutoScrolling.current = false;
      });
    }
  }, [count, chatRef, bottomRef, hasInitialized]);

  return { isAtBottom };
};
