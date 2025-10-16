import { Member } from '@prisma/client';
import React from 'react';
import { GoDot, GoDotFill } from 'react-icons/go';

type Props = {
  member: Member;
};
export default function PresenceDot({ member }: Props) {
  return (
    <>
      <GoDot
        className='fill-white absolute -top-[2px] -right-[2px]'
        size={36}
      />
      <GoDotFill size={22} className='fill-green-500 animate-pulse' />
    </>
  );
}
