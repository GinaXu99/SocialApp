import { MessageDto } from '@/types';
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@/components/ui/heroui';
import { AiFillDelete } from 'react-icons/ai';
import { useRouter, useSearchParams } from 'next/navigation';
import { truncateString } from '@/lib/util';
import React, { Key, useCallback, useState } from 'react';
import { deleteMessage } from '../actions/messageActions';
import { Message } from 'postcss';

type Props = {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
};
export default function MessageTableCell({
  item,
  columnKey,
  isOutbox,
  deleteMessage,
  isDeleting,
}: Props) {
  const cellValue = item[columnKey as keyof MessageDto];

  switch (columnKey) {
    case 'recipientName':
    case 'senderName':
      return (
        <div className='flex items-center gap-2 cursor-pointer'>
          <Avatar
            alt='member image'
            src={
              (isOutbox ? item.recipientImage : item.senderImage) ||
              '/images/user.png'
            }
          />
          <span>{cellValue}</span>
        </div>
      );
    case 'text':
      return <div>{truncateString(cellValue, 80)}</div>;
    case 'createdAt':
      return cellValue;
    default:
      return (
        <Button
          isIconOnly
          variant='light'
          onClick={() => deleteMessage(item)}
          isLoading={isDeleting}
        >
          <AiFillDelete size={24} className='text-danger' />
        </Button>
      );
  }
}
