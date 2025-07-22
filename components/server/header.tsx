'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  Settings2,
  Trash2,
  LogOut,
  PlusCircle,
  UserPlus,
  Users,
} from 'lucide-react';

import { MemberRole } from '@/app/generated/prisma';
import { ServerWithMembersWithProfiles } from '@/prisma/types';
import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const [open, setOpen] = useState(false);

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const isMobile = useIsMobile();

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        {!isMobile && (
          <button className="w-full text-black dark:text-white font-semibold px-3 flex items-center h-12 border-neutral-200 dark:bg-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            {server.name}
            <ChevronDown
              className={cn(
                'size-5 ml-auto transition-transform',
                open && 'rotate-180'
              )}
            />
          </button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-sm font-medium text-black dark:text-neutral-300 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', { server })}
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 flex items-center justify-between hover:bg-indigo-500/10 dark:hover:bg-indigo-400/20 transition"
          >
            Invite People
            <UserPlus className="size-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('editServer', { server })}
              className="px-3 py-2 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
            >
              Server Settings
              <Settings2 className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('manageMembers', { server })}
              className="px-3 py-2 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
            >
              Manage Members
              <Users className="size-4" />
            </DropdownMenuItem>
          </>
        )}

        {isModerator && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('createChannel', { server })}
              className="px-3 py-2 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
            >
              Create Channel
              <PlusCircle className="size-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {isAdmin ? (
          <DropdownMenuItem
            onClick={() => onOpen('deleteServer', { server })}
            className="text-rose-600 dark:text-red-400 px-3 py-2 flex items-center justify-between hover:bg-rose-500/10 dark:hover:bg-red-400/10 transition"
          >
            Delete Server
            <Trash2 className="size-4" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onOpen('leaveServer', { server })}
            className="text-rose-600 dark:text-red-400 px-3 py-2 flex items-center justify-between hover:bg-rose-500/10 dark:hover:bg-red-400/10 transition"
          >
            Leave Server
            <LogOut className="size-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
