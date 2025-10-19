import {
  deleteMessage,
  getMessagesByContainer,
} from '@/app/actions/messageActions';
import { MessageDto } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useMessageStore from './useMessageStore';
import { useState, useCallback, Key, useEffect, useRef } from 'react';

const outboxColumns = [
  { key: 'receipientName', label: 'Recipient' },
  { key: 'text', label: 'Message' },
  { key: 'created', label: 'Date sent' },
  { key: 'actions', label: 'Actions' },
];

const inboxColumns = [
  { key: 'senderName', label: 'Sender' },
  { key: 'text', label: 'Message' },
  { key: 'created', label: 'Date Received' },
  { key: 'actions', label: 'Actions' },
];

export default function UseMessages(
  initialMessages: MessageDto[],
  nextCursor?: string
) {
  const set = useMessageStore((state) => state.set);
  const remove = useMessageStore((state) => state.remove);
  const messages = useMessageStore((state) => state.messages);
  const updateUnReadCount = useMessageStore((state) => state.updateUnreadCount);
  const resetMessages = useMessageStore((state) => state.resetMessages);

  const cursorRef = useRef(nextCursor);
  const searchParams = useSearchParams();
  const container = searchParams.get('container');

  const router = useRouter();

  const isOutbox = container === 'outbox';
  const [isDeleting, setDeleting] = useState({
    id: '',
    loading: false,
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const columns = isOutbox ? outboxColumns : inboxColumns;

  useEffect(() => {
    set(initialMessages);
    cursorRef.current = nextCursor;

    return () => {
      resetMessages();
    };
  }, [initialMessages, set, nextCursor]);

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true);
      const { messages, nextCursor } = await getMessagesByContainer(
        container,
        cursorRef.current
      );
    }
    set(messages);
    cursorRef.current = nextCursor;
    setLoadingMore(false);
  }, [container, set]);

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setDeleting({
        id: message.id,
        loading: true,
      });
      await deleteMessage(message.id, isOutbox);
      remove(message.id);
      if (!message.dateRead && !isOutbox) updateUnReadCount(-1);
      setDeleting({ id: '', loading: false });
    },
    [isOutbox, router, updateUnReadCount]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + '/chat');
  };

  return {
    isOutbox,
    columns,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
    isDeleting,
    messages,
    loadingMore,
    loadMore,
    hasMore: !!cursorRef.current,
  };
}
