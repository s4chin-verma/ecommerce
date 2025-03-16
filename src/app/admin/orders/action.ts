'use server';

import prisma from '@/lib/prisma';

export async function getOrders() {
  return prisma.order.findMany({
    select: {
      id: true,
      orderNumber: true,
      userName: true,
      userPhone: true,
      paid: true,
      deliveryFee: true,
      serviceFee: true,
      status: true,
      orderDate: true,
      quantity: true,
      subtotal: true,
      product: {
        select: {
          id: true,
          name: true,
        },
      },
      User: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      orderDate: 'desc',
    },
  });
}
