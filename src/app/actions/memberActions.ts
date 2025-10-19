'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Photo } from '@prisma/client';
import { getAuthUserId } from './authActions';

export async function getMembers() {
  const session = await auth();
  if (!session?.user) return null;

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({
      where: { userId },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  const member = await prisma.member.findUnique({
    where: { userId },
    select: { photos: true },
  });
  if (!member) return null;
  return member.photos.map((p) => p) as Photo[];
}

export async function updateLastActive() {
  const userId = await getAuthUserId();
  try {
    return prisma.member.update({
      where: { userId },
      data: { updated: new Date() },
    });
  } catch (error) {
    console.log(error);
  }
}
