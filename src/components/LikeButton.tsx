import { toggle } from '@/components/ui/heroui';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  targetId: string;
  hasLiked: boolean;
};

export default function LikeButton({ targetId, hasLiked }: Props) {
  const router = useRouter();
  async function toggleLike() {}
  return (
    <div
      onClick={toggle}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart size={24} />
    </div>
  );
}
