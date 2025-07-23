'use client';

import { useEffect, useState } from 'react';
import {
  CreateServerModal,
  InviteModal,
  EditServerModal,
  ManageMembersModal,
  CreateChannelModal,
  LeaveServerModal,
  DeleteServerModal,
  DeleteChannelModal,
  EditChannelModal,
  MessageFileModal,
  DeleteMessageModal,
} from '@/components/modals';

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
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
