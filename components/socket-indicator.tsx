'use client';

import { CheckCircle, AlertCircle } from 'lucide-react';

import { useSocket } from '@/components/providers/socket-provider';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  const status = isConnected
    ? {
        text: 'Live: Real-time updates',
        className: 'bg-emerald-600',
        Icon: CheckCircle,
      }
    : {
        text: 'Fallback: Polling every 1 sec',
        className: 'bg-yellow-600',
        Icon: AlertCircle,
      };

  return (
    <div role="status" aria-live="polite">
      <Badge
        variant="outline"
        className={cn(
          'text-white border-none flex items-center gap-2 px-3 py-1',
          status.className
        )}
      >
        <status.Icon className="size-4" />
        {status.text}
      </Badge>
    </div>
  );
};
