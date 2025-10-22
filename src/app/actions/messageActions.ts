'use server';
import { MessageSchema, messageSchema } from '@/lib/schemas/MessageSchema';
import { ActionResult, MessageDto } from '@/types';
import { getAuthUserId } from './authActions';
import { prisma } from '@/lib/prisma';
import { mapMessageToMessageDto } from '@/lib/mappings';
import { pusherServer } from '@/lib/pusher';
import { createChatId } from '@/lib/util';

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success)
      return { status: 'error', error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientUserId,
        senderId: userId,
      },
      select: messageSelect,
    });

    const MessageDto = mapMessageToMessageDto(message);
    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      'message:new',
      MessageDto
    );
    await pusherServer.trigger(
      `private-${recipientUserId}`,
      'message:new',
      MessageDto
    );

    return { status: 'success', data: MessageDto };
  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'Something went wrong' };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: messageSelect,
    });

    /**
 * 
 *  Logic: 
  1. Only marks incoming messages as read - Messages Bob sent TO you, not your messages to Bob
  2. Only unread messages - dateRead: null ensures already-read messages aren't updated
  3. Automatic read receipts - Bob can see you've read his messages (like WhatsApp's blue checkmarks)
  4. Happens on page load - As soon as you view the chat, messages are marked read
  This is a common messaging pattern where opening/viewing a conversation automatically marks incoming
  messages as read.
 */

    let readCount = 0;

    if (messages.length > 0) {
      const unreadMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateRead: null,
        },
        data: {
          dateRead: new Date(),
        },
      });

      readCount = unreadMessageIds.length;

      await pusherServer.trigger(
        createChatId(recipientId, userId),
        'message:read',
        unreadMessageIds
      );
    }

    return {
      messages: messages.map((message) => mapMessageToMessageDto(message)),
      readCount,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMessagesByContainer(
  container?: string | null,
  cursor?: string | null,
  limit = 2
) {
  try {
    const userId = await getAuthUserId();
    const conditions = {
      [container === 'outbox' ? 'senderId' : 'recipientId']: userId,
      ...(container === 'outbox'
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { createdAt: { lte: new Date(cursor) } } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: messageSelect,
      take: limit + 1,
    });

    let nextCursor: string | undefined;

    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.createdAt.toISOString();
    } else {
      nextCursor = undefined;
    }

    const messageToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return { messages: messageToReturn, nextCursor };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? 'senderDeleted' : 'recipientDeleted';

  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUnreadMessageCount() {
  try {
    const userId = await getAuthUserId();
    return prisma.message.count({
      where: {
        recipientId: userId,
        dateRead: null,
        recipientDeleted: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  createdAt: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
