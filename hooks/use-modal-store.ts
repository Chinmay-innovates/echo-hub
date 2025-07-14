import { create } from 'zustand';

import { ChannelType } from '@/app/generated/prisma';
import { Channel, Server } from '@/prisma/types';

export type ModalType = 'createServer';

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) =>
    set({
      type,
      isOpen: true,
      data,
    }),
  onClose: () =>
    set({
      type: null,
      isOpen: false,
    }),
}));
