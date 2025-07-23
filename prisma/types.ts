import type * as Prisma from '@/app/generated/prisma';

export type Profile = Prisma.Profile;
export type Member = Prisma.Member;
export type Server = Prisma.Server;
export type Channel = Prisma.Channel;
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & {
    profile: Profile;
  })[];
};
export type MessageWithMemberWithProfile = Prisma.Message & {
  member: Member & {
    profile: Profile;
  };
};

export type MemberWithProfile = Prisma.Member & { profile: Profile };
