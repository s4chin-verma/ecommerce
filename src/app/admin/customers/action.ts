'use server';

import prisma from '@/lib/prisma';
import { toast } from 'sonner';

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        emailVerified: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            orderHistory: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    toast.info('Customers Fetched');
    return users;
  } catch (e) {
    toast.error('Failed to fetch customers');
    return [];
  }
};
