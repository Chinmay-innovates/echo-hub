import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';

import { NavigationAction } from './action';
import { NavigationItem } from './item';

export const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect('/');

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center size-full text-primary dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto w-10" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              key={server.id}
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              avatarBox:
                'w-12 h-12 rounded-full ring-2 ring-indigo-500/50 shadow-md transition duration-200 hover:scale-105 size-[48px]',
            },
          }}
        />
      </div>
    </div>
  );
};
