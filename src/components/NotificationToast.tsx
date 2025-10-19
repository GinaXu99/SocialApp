import Link from 'next/link';
import React from 'react';
import { Image } from '@/components/ui/heroui';
import { toast } from 'react-toastify';
import { MessageDto } from '@/types';

type Props = {
  image?: string | null;
  href: string;
  title: string;
  subtitle?: string;
};
export default function NotificationToast({
  image,
  href,
  title,
  subtitle,
}: Props) {
  return (
    <Link href={href} className='flex items-center'>
      <div className='mr-28'>
        <Image
          src={image || '/images/user.png'}
          width={50}
          height={50}
          alt='sender image'
        />
      </div>
      <div className='flex flex-grow flex-col justify-center'>
        <div className='font-semibold'>{title}</div>
        <div className='text-sm'>{subtitle || 'click to view'}</div>
      </div>
    </Link>
  );
}

export const newMessageToast = (message: MessageDto) => {
  toast(
    <NotificationToast
      image={message.senderImage}
      href={`/members/${message.senderId}/chat`}
      title={`${message.senderName} has send you a message}`}
    />
  );
};

export const newLikeToast = (
  name: string,
  image: string | null,
  userId: string
) => {
  toast(
    <NotificationToast
      image={image}
      href={`/members/${userId}`}
      title={`You have been liked by ${name}`}
      subtitle='Click to view more'
    />
  );
};
