'use client';

import { Button, Navbar, NavbarBrand, NavbarContent } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { GiSelfLove } from 'react-icons/gi';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import { Session } from 'next-auth';

type TopNavClientProps = {
  session: Session | null;
};

export default function TopNavClient({ session }: TopNavClientProps) {
  const memberLinks = [
    { href: '/members', label: 'Matches' },
    { href: '/lists', label: 'Lists' },
    { href: '/messages', label: 'Messages' },
  ];

  const adminLinks = [
    { href: '/admin/moderations', label: 'Phone Moderation' },
  ];

  return (
    <>
      <Navbar>
        <NavbarBrand as={Link} href='/'>
          <GiSelfLove size={40} className='text-gray-200' />
          <div className='font-bold text-3xl flex'>
            <span className='text-grapy-200'>MatchMe</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify='center'>
          {memberLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </NavbarContent>
        <NavbarContent justify='end'>
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button
                as={Link}
                href='/login'
                variant='bordered'
                color='default'
              >
                Login
              </Button>
              <Button
                as={Link}
                href='/register'
                variant='bordered'
                color='default'
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </>
  );
}
