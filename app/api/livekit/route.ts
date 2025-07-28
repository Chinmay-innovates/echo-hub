import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room');
  const username = req.nextUrl.searchParams.get('username');

  if (!room) {
    return NextResponse.json("Missing 'room' query parameter", { status: 400 });
  }
  if (!username) {
    return NextResponse.json("Missing 'username' query parameter", {
      status: 400,
    });
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const websocketUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !websocketUrl) {
    return NextResponse.json('Server Misconfigured', { status: 500 });
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: username,
    ttl: '10m',
  });

  at.addGrant({
    room,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  });

  return NextResponse.json({
    token: at.toJwt(),
  });
}
