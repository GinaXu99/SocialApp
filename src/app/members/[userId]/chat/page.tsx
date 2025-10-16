import CardInnerWrapper from '@/components/CardInnerWrapper';
import { getMessageThread } from '@/app/actions/messageActions';
import MessageBox from './MessageBox';
import { getAuthUserId } from '@/app/actions/authActions';
import React from 'react';
import ChatForm from './ChatForm';

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const messages = await getMessageThread(params.userId);
  const userId = await getAuthUserId();

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
              currentUserId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
  return <CardInnerWrapper header='Chat' body={body} footer={<ChatForm />} />;
}
