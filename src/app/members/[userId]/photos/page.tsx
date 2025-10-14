import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import CardInnerWrapper from '@/components/CardInnerWrapper';

import { Image } from '@/components/ui/heroui';
import React from 'react';

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <CardInnerWrapper
      header='Photos'
      body={
        <div className='grid grid-cols-5 gap-3'>
          {photos && photos.length > 0 ? (
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  src={photo.url}
                  alt='member image'
                  className='object-cover aspect-square'
                />
              </div>
            ))
          ) : (
            <div>No photos available</div>
          )}
        </div>
      }
    />
  );
}
