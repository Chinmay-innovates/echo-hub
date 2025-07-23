import { Hash, MessageCircle } from 'lucide-react';

type Props = {
  type: 'channel' | 'conversation';
  name: string;
};

export const ChatWelcome = ({ name, type }: Props) => {
  return (
    <div className="space-y-4 px-4 mb-6">
      {type === 'channel' ? (
        <div className="size-20 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
          <Hash className="size-10 text-zinc-600 dark:text-zinc-300" />
        </div>
      ) : (
        <div className="size-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center">
          <MessageCircle className="size-8 text-emerald-600 dark:text-emerald-400" />
        </div>
      )}

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          {type === 'channel' ? 'Welcome to #' : ''}
          {name}
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-md">
          {type === 'channel'
            ? `This is the very beginning of the #${name} channel. Feel free to kick things off!`
            : `This is the start of your conversation with ${name}.`}
        </p>
      </div>
    </div>
  );
};
