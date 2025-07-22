'use client';

import { useParams, useRouter } from 'next/navigation';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Member, Profile } from '@/prisma/types';
import { UserAvatar } from '@/components/user-avatar';
import { MemberRole } from '@/app/generated/prisma';

interface ServerMemberProps {
  member: Member & {
    profile: Profile;
  };
}
const roleMapIcon = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="size-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="size-4 ml-2 text-rose-500" />,
};
export const ServerMember = ({ member }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleMapIcon[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="size-8 md:size-8 " />
      {icon}
      <p
        className={cn(
          'font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.memberId === member.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-wrap'
        )}
      >
        {member.profile.name}
      </p>
    </button>
  );
};
