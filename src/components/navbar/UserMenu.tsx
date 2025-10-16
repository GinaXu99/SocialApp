'use client';
import { signOutUser } from '@/app/actions/authActions';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@/components/ui/heroui';
import { Session } from 'next-auth';
import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  userInfo: {
    name: string | null;
    image: string | null;
  } | null;
};

export default function UserMenu({ userInfo }: Props) {
  const router = useRouter();

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          color='default'
          name={userInfo?.name || 'user avatar'}
          size='sm'
          src={userInfo?.image || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant='flat' aria-label='user actions menu'>
        <DropdownSection showDivider>
          <DropdownItem
            key='username'
            isReadOnly
            as='span'
            className='h-13 flex flex-row'
            aria-label='username'
          >
            Sign in as {userInfo?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key='profile'
          onClick={() => router.push('/members/edit')}
        >
          Edit profile
        </DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          onClick={async () => signOutUser()}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
