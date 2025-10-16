import CardInnerWrapper from '@/components/CardInnerWrapper';
import { getMessageThread } from '@/app/actions/messageActions';
import MessageBox from './MessageBox';
import { getAuthUserId } from '@/app/actions/authActions';
import React from 'react';
import ChatForm from './ChatForm';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const messages = await getMessageThread(userId);

  const currentUserId = await getAuthUserId();

  const body = (
    <div>
      {messages.length === 0 ? (
        'No message display'
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
  return <CardInnerWrapper header='Chat' body={body} footer={<ChatForm />} />;
}
