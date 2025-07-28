'use client';

import axios from 'axios';
import { Check, Copy, Link, RefreshCw, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';

import { cn } from '@/lib/utils';

export const InviteModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Clipboard copy failed:', error);
      alert('Your browser does not support copying to clipboard.');
    }
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen('invite', { server: response.data });
    } catch (error) {
      console.error('Failed to generate new invite code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-50 to-slate-100 border-0 shadow-2xl max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg" />

        <DialogHeader className="relative pt-8 px-6 pb-2">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Invite Friends
          </DialogTitle>

          <p className="text-center text-slate-600 text-sm mt-2">
            Share this link to invite others to&nbsp;
            <span className="font-semibold text-slate-700">{server?.name}</span>
          </p>
        </DialogHeader>

        <div className="relative px-6 pb-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2 capitalize">
                <Link className="size-4" />
                Server invite link
              </Label>

              <div className="relative">
                <div className="flex items-center gap-2 p-1 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <Input
                    readOnly
                    value={inviteUrl}
                    disabled={isLoading}
                    className="border-0 bg-transparent focus-visible:ring-0 text-slate-700 focus-visible:ring-offset-0 font-mono text-sm"
                  />
                  <Button
                    disabled={isLoading}
                    size="sm"
                    onClick={onCopy}
                    className={cn(
                      'min-w-[80px] transition-all duration-200 shadow-sm',
                      isCopied
                        ? 'bg-gradient-to-r from-indigo-400 to-indigo-700 text-white'
                        : 'bg-gradient-to-r from-gray-200 to-gray-500'
                    )}
                  >
                    {isCopied ? (
                      <>
                        <Check className="size-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-2">
              <Button
                disabled={isLoading}
                onClick={onNew}
                size="sm"
                variant="ghost"
                className="text-slate-600 hover:text-slate-800 transition-all duration-200 group"
              >
                <RefreshCw
                  className={cn(
                    'size-4 mr-2 transition-transform duration-200',
                    isLoading ? 'animate-spin' : 'group-hover:rotate-180'
                  )}
                />
                Generate a new link
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl -z-10" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl -z-10" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
