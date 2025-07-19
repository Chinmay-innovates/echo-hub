'use client';

import { useEffect, useState } from 'react';

import { InviteModal } from '@/components/modals/invite';
import { EditServerModal } from '@/components/modals/edit-server';
import { CreateServerModal } from '@/components/modals/create-server';
import { ManageMembersModal } from '@/components/modals/manage-members';
import { CreateChannelModal } from '@/components/modals/create-channel';
import { LeaveServerModal } from '@/components/modals/leave-server';
import { DeleteServerModal } from '@/components/modals/delete-server';
import { DeleteChannelModal } from '@/components/modals/delete-channel';
import { EditChannelModal } from '@/components/modals/edit-channel';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};
