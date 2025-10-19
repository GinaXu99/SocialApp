'use client';
import { NavbarItem } from '@/components/ui/heroui';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import useMessageStore from '@/hooks/useMessageStore';

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathName = usePathname();

  const unreadCount = useMessageStore((state) => state.unreadCount);
  return (
    <NavbarItem isActive={pathName === href} as={Link} href={href}>
      <span>{label}</span>
      {href === '/messages' && unreadCount > 0 && (
        <span className='ml-1'>({unreadCount})</span>
      )}
    </NavbarItem>
  );
}
