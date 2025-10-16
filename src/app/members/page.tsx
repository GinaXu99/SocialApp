import MemberCard from './MemberCard';
import { getMembers } from '@/app/actions/memberActions';
import React from 'react';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';

export default async function MembersPage() {
  const members = await getMembers();

  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
      {members &&
        members.map((member) => (
          <MemberCard likeIds={likeIds} member={member} key={member.id} />
        ))}
    </div>
  );
}
