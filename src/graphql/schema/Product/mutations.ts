import { builder } from '@/graphql/builder';
import { GraphQLError } from 'graphql';
import prisma from '@/lib/prisma';

builder.mutationFields(t => ({
  addProduct: t.prismaField({
    type: 'Product',
    args: {
      name: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      price: t.arg.float({ required: true }),
      sellingPrice: t.arg.float({ required: true }),
      categoryId: t.arg.string({ required: true }),
      images: t.arg.stringList({ required: true }),
      stock: t.arg.int({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      if ((await context).user?.role !== 'ADMIN')
        throw new GraphQLError('You are not authorized to perform this action');

      const newProduct = await prisma.product.create({
        data: { ...args },
      });
      return newProduct;
    },
  }),
}));
