'use client';
import { Tab, Tabs } from '@/components/ui/heroui';
import { Member } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition, Key } from 'react';
import LoadingComponent from '@/components/Loading';
import MemberCard from '../members/MemberCard';

type Props = {
  members: Member[];
  likeIds: string[];
};

export default function ListsTab({ members, likeIds }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    {
      id: 'source',
      label: 'Members I have liked',
    },
    {
      id: 'target',
      label: 'Members that like me',
    },
    { id: 'mutual', label: 'Mutual Likes' },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('type', key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className='flex w-full flex-col mt-10 gap-5'>
      <Tabs
        aria-label='like tabs'
        items={tabs}
        color='default'
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <div>
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
