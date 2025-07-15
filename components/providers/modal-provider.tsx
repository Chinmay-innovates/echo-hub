'use client';

import { useEffect, useState } from 'react';

import { InviteModal } from '@/components/modals/invite';
import { EditServerModal } from '@/components/modals/edit-server';
import { CreateServerModal } from '@/components/modals/create-server';
import { ManageMembersModal } from '@/components/modals/manage-members';
import { CreateChannelModal } from '@/components/modals/create-channel';

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
    </>
  );
};
