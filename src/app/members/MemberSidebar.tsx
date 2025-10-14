'use client';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@/components/ui/heroui';
import { calculateAge } from '@/lib/util';
import { Member } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
type Props = {
  member: Member;
};
export default function MemberSidebar({ member }: Props) {
  const pathname = usePathname();
  const basePath = `/members/${member.userId}`;
  const navLinks = [
    { name: 'Profile', href: `${basePath}` },
    { name: 'Photos', href: `${basePath}/photos` },
    { name: 'Chat', href: `${basePath}/chat` },
  ];
  return (
    <Card>
      <Image
        height={200}
        width={200}
        src={member.image || '/images/user.png'}
        alt='user profile image'
        className='rounded-full mt-6 aspect-square object-cover'
      />
      <CardBody>
        <div className='flex flex-col items-center'>
          <div className='text-2xl'>
            {member.name}, {''}
            {calculateAge(member.dateOfBirth)}
          </div>
          <div className='text-sm text-neutral-500'>
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className='my-3' />
        <nav className='flex flex-col p-4 ml-4 text-2xl gap-4'>
          {navLinks.map((link) => (
            <Link
              className={`block rounded ${
                pathname === link.href
                  ? 'text-default'
                  : 'hover:text-default-50'
              }`}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href='/members'
          fullWidth
          color='default'
          variant='bordered'
        >
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
}
