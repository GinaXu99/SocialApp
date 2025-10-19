'use client';

import { getUnreadMessageCount } from '@/app/actions/messageActions';
import useMessageStore from '@/hooks/useMessageStore';
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HeroUIProvider } from '@/components/ui/heroui';
import React, { useCallback, useEffect, useRef, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useNotificationChannel } from '@/hooks/useNotificationChannel';
export default function Providers({
  children,
  userId,
  profileComplete,
}: {
  children: ReactNode;
  userId: string | null;
  profileComplete: boolean;
}) {
  const isUnreadCountSet = useRef(false);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
    }
    isUnreadCountSet.current = true;
  }, [userId, setUnreadCount]);

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);

  return (
    <SessionProvider>
      <HeroUIProvider>
        <ToastContainer position='bottom-right' hideProgressBar />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
