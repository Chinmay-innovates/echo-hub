'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Paperclip, Plus, Send, Smile } from 'lucide-react';
import queryString from 'query-string';
import axios from 'axios';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useModal } from '@/hooks/use-modal-store';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EmojiPicker } from '../emoji-picker';

type Props = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
};

const formSchema = z.object({
  content: z.string().min(1),
});
export const ChatInput = ({ apiUrl, name, query, type }: Props) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const hasContent = form.watch('content').length > 0;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (hasContent && !isLoading) {
        form.handleSubmit(onSubmit)();
      }
    }
  };
  return (
    <div className="px-4 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'relative flex items-center bg-white dark:bg-zinc-800/50 border-2 transition-all duration-200 ease-in-out rounded-2xl shadow-sm',
                      isFocused
                        ? 'border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600',
                      isLoading && 'opacity-50'
                    )}
                  >
                    {/* File Upload Button */}
                    <button
                      type="button"
                      onClick={() => onOpen('messageFile', { apiUrl, query })}
                      disabled={isLoading}
                      className="ml-3 p-2.5 rounded-full
                        bg-gradient-to-br from-blue-500 to-blue-600
                        hover:from-blue-600 hover:to-blue-700
                        dark:from-blue-600 dark:to-blue-700
                        dark:hover:from-blue-500 dark:hover:to-blue-600
                        text-white shadow-md hover:shadow-lg
                        transition-all duration-200 transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                        group"
                    >
                      <Paperclip className="size-4 group-hover:rotate-12 transition-transform duration-200" />
                    </button>

                    {/* Text Input */}
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder={`Message ${
                        type === 'conversation' ? name : '#' + name
                      }`}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={handleKeyDown}
                      className="
                        flex-1 mx-3 p-3 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-medium
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-2 mr-3">
                      {/* Emoji Picker */}
                      <EmojiPicker
                        onChange={(emoji) =>
                          field.onChange(`${field.value} ${emoji}`)
                        }
                      />

                      {/* Send Button */}
                      <button
                        type="submit"
                        className={cn(
                          'p-2.5 rounded-full transition-all duration-200 transform',
                          hasContent && !isLoading
                            ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg hover:scale-105'
                            : 'bg-gray-100 dark:bg-zinc-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        )}
                        disabled={!hasContent || isLoading}
                      >
                        {isLoading ? (
                          <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex items-center justify-between mt-2 px-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span
          className={cn(
            'transition-opacity duration-200',
            hasContent ? 'opacity-100' : 'opacity-0'
          )}
        >
          {form.watch('content')?.length || 0} characters
        </span>
      </div>
    </div>
  );
};
