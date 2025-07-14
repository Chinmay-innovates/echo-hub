import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PATCH(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{
      serverId: string;
    }>;
  }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await params;

    if (!profile) return new NextResponse('unauthorized', { status: 401 });

    if (!serverId)
      return new NextResponse('Server Id Missing', { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log('[INVITE_CODE_PATCH]', error);
    return new Response('Internal error', { status: 500 });
  }
}
