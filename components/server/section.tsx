'use client';

import { Plus, Settings2 } from 'lucide-react';

import { ActionTooltip } from '@/components/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

import { ChannelType, MemberRole } from '@/app/generated/prisma';
import { ServerWithMembersWithProfiles } from '@/prisma/types';

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
  label,
  sectionType,
  channelType,
  role,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs uppercase font-semibold text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
        {label}
      </p>
      <div className="flex items-center gap-2">
        {role !== MemberRole.GUEST && sectionType === 'channels' && (
          <ActionTooltip label="Create Channel" side="right">
            <button
              aria-label="Create Channel"
              onClick={() => onOpen('createChannel', { channelType })}
              className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <Plus className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
            </button>
          </ActionTooltip>
        )}
        {role === MemberRole.ADMIN && sectionType === 'members' && (
          <ActionTooltip label="Manage Members" side="right">
            <button
              aria-label="Manage Members"
              onClick={() => onOpen('manageMembers', { server })}
              className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <Settings2 className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
            </button>
          </ActionTooltip>
        )}
      </div>
    </div>
  );
};
