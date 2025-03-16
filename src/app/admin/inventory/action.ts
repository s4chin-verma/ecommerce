'use server';

import prisma from '@/lib/prisma';

export async function getProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      sellingPrice: true,
      stock: true,
      totalSale: true,
      ratings: true,
      category: {
        select: {
          title: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
