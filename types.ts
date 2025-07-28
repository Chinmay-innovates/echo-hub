import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as ServerIOserver } from 'socket.io';

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io?: ServerIOserver;
    };
  };
};

export type QueryParams = {
  conversationId?: string;
  channelId?: string;
  [key: string]: string | number | boolean | undefined;
};

export type EmojiMartEmoji = {
  id: string;
  name: string;
  unified: string;
  skin?: number;
  shortcodes?: string;
  keywords?: string[];
  emoticons?: string[];
  native: string; // <-- added property
};
