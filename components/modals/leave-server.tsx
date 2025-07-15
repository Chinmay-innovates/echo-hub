'use client';

import axios from 'axios';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useModal } from '@/hooks/use-modal-store';
import { AlertTriangle, LogOut, X } from 'lucide-react';

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'leaveServer';
  const { server } = data;

  const [isLoading, setIsloading] = useState(false);
  const onClick = async () => {
    try {
      setIsloading(true);
      axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-50 to-slate-100 border-0 shadow-2xl max-w-md mx-auto p-0 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-lg" />

        {/* Header Section */}
        <DialogHeader className="relative pt-8 px-6 pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center shadow-md">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <DialogTitle className="text-2xl text-center font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Leave Server
          </DialogTitle>

          <DialogDescription className="text-center text-slate-600 mt-4 leading-relaxed">
            Are u sure u want to leave{' '}
            <span className="font-semibold text-sm text-indigo-500">
              {server?.name}
            </span>{' '}
            ?
          </DialogDescription>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">This action cannot be undone</p>
                <p className="text-amber-700">
                  You'll need a new invite link to rejoin this server.
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Footer Section */}
        <DialogFooter className="relative bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-4 border-t border-slate-200/50">
          <div className="flex items-center justify-between w-full gap-3">
            <Button
              disabled={isLoading}
              variant="secondary"
              onClick={onClose}
              className="flex-1  transition-all duration-200"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              onClick={onClick}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Leaving...
                </div>
              ) : (
                <div className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave Server
                </div>
              )}
            </Button>
          </div>
        </DialogFooter>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-xl -z-10" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-xl -z-10" />
      </DialogContent>
    </Dialog>
  );
};
