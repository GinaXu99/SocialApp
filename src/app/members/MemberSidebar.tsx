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
import PresenceDot from '@/components/PresenceDot';
type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};
export default function MemberSidebar({ member, navLinks }: Props) {
  const pathname = usePathname();

  return (
    <Card className='w-full mt-10 items-center h-[80vh]'>
      <Image
        height={200}
        width={200}
        src={member.image || '/images/user.png'}
        alt='user profile image'
        className='rounded-full mt-6 aspect-square object-cover'
      />
      <CardBody className='overflow-hidden'>
        <div className='flex flex-col items-center'>
          <div className='flex'>
            <div className='text-2xl'>
              {member.name}, {''}
              {calculateAge(member.dateOfBirth)}
            </div>
            <div>
              <PresenceDot member={member} />
            </div>
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
