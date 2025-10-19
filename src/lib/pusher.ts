import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

if (!globalThis.pusherServerInstance) {
  globalThis.pusherServerInstance = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER_ID!,
    useTLS: true,
  });
}

if (typeof window !== 'undefined' && !globalThis.pusherClientInstance) {
  globalThis.pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER_ID!,
      channelAuthorization: {
        endpoint: '/api/pusher-auth',
        transport: 'ajax',
      },
    }
  );
}

export const pusherServer = globalThis.pusherServerInstance;
export const pusherClient = globalThis.pusherClientInstance;
