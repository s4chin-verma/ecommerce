import { builder } from '../../builder';
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
        ...query,
        data: { ...args },
      });
      return newProduct;
    },
  }),

  updateProduct: t.prismaField({
    type: 'Product',
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      description: t.arg.string(),
      price: t.arg.float(),
      sellingPrice: t.arg.float(),
      categoryId: t.arg.string(),
      images: t.arg.stringList(),
      stock: t.arg.int(),
    },
    resolve: async (query, _, args, context) => {
      if ((await context).user?.role !== 'ADMIN')
        throw new GraphQLError('You are not authorized to perform this action');

      const product = await prisma.product.update({
        ...query,
        where: { id: args.id },
        data: {
          name: args.name ?? undefined,
          description: args.description ?? undefined,
          price: args.price ?? undefined,
          sellingPrice: args.sellingPrice ?? undefined,
          categoryId: args.categoryId ?? undefined,
          images: args.images ?? undefined,
          stock: args.stock ?? undefined,
        },
      });

      if (!product) throw new GraphQLError('Product not found');
      return product;
    },
  }),

  deleteProduct: t.prismaField({
    type: 'Product',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_, __, args, context) => {
      if ((await context).user?.role !== 'ADMIN')
        throw new GraphQLError('You are not authorized to perform this action');

      const product = await prisma.product.delete({
        where: { id: args.id },
      });

      if (!product) throw new GraphQLError('Product not found');
      return product;
    },
  }),

  updateStock: t.prismaField({
    type: 'Product',
    args: {
      id: t.arg.string({ required: true }),
      stock: t.arg.int({ required: true }),
    },
    resolve: async (_, __, args, context) => {
      if ((await context).user?.role !== 'ADMIN')
        throw new GraphQLError('You are not authorized to perform this action');

      const product = await prisma.product.update({
        where: { id: args.id },
        data: {
          stock: args.stock,
        },
      });

      if (!product) throw new GraphQLError('Product not found');
      return product;
    },
  }),
}));
