import { redirect } from 'next/navigation';
import { RedirectToSignIn } from '@clerk/nextjs';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { ServerSidebar } from '@/components/server/sidebar';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    serverId: string;
  }>;
}) => {
  const profile = await currentProfile();
  if (!profile) return RedirectToSignIn;

  const { serverId } = await params;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect('/');

  return (
    <ResizablePanelGroup direction="horizontal" className="size-full">
      <ResizablePanel
        minSize={10}
        maxSize={30}
        defaultSize={20}
        className="hidden md:flex flex-col z-20"
      >
        <ServerSidebar serverId={serverId} />
      </ResizablePanel>
      <ResizableHandle withHandle className="hover:bg-gray-200/50" />
      <ResizablePanel defaultSize={80} className="h-full">
        <main className="size-full">{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ServerLayout;
