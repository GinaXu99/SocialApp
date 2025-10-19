import MessageTable from './MessageTable';
import MessageSidebar from './MessageSidebar';
import { getMessagesByContainer } from '../actions/messageActions';

import React from 'react';

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ container: string }>;
}) {
  const { container } = await searchParams;
  const { messages, nextCursor } = await getMessagesByContainer(container);

  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh]'>
      <div className='col-span-2'>
        <MessageSidebar />
      </div>
      <div className='col-span-10'>
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
      </div>
    </div>
  );
}
