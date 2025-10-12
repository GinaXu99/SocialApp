'use client';

import { NavbarItem } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <NavbarItem isActive={pathName === href} as={Link} href={href}>
      <span>{label}</span>
      {/* {href === '/messages' && <span className='ml-1'>UNREAD COUNT</span>} */}
    </NavbarItem>
  );
}
