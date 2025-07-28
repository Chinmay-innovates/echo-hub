'use client';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Smile } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EmojiMartEmoji } from '@/types';

type Props = {
  onChange: (value: string) => void;
};

export const EmojiPicker = ({ onChange }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="Emoji Picker"
          type="button"
          className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700  hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Smile className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none mb-16 drop-shadow-none"
      >
        <Picker
          data={data}
          theme={resolvedTheme}
          onEmojiSelect={(emoji: EmojiMartEmoji) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
