import { ZodIssue } from 'zod';

type ActionResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: ZodIssue[] | string };

type MessageDto = {
  id: string;
  text: string;
  createdAt: string;
  dateRead: string | null;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    createdAt: true;
    dateRead: true;
    sender: {
      select: { userId; name; image };
    };
    recipient: {
      select: { userId; name; image };
    };
  };
}>;
