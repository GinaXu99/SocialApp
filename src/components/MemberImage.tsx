'use client';
import { auth } from '@/auth';
import { Photo } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { Button, Image } from '@/components/ui/heroui';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  const router = useRouter();

  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt='member image'
          src={photo.publicId}
          width={300}
          height={300}
          crop='fill'
          gravity='faces'
          className={clsx('rounded-2xl', {
            'opacity-40': !photo.url,
          })}
          priority
        />
      ) : (
        <Image src={photo?.url || '/images/user.png'} alt='user image' />
      )}
    </div>
  );
}
