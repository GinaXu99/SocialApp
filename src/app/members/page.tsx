import MemberCard from './MemberCard';
import { getMembers } from '@/app/actions/memberActions';
import React from 'react';

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {members &&
        members.map((member) => <MemberCard member={member} key={member.id} />)}
    </div>
  );
}
