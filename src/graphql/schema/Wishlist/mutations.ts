import { builder } from '../../builder';
import { GraphQLError } from 'graphql';
import { checkUserAuth } from '@/graphql/ctx';
import prisma from '@/lib/prisma';

builder.mutationField('addToWishlist', t =>
  t.prismaField({
    type: 'Wishlist',
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, context) => {
      const user = checkUserAuth(context);

      try {
        const product = await prisma.product.findUnique({
          where: { id: args.productId },
        });

        if (!product) {
          throw new GraphQLError('Product not found');
        }

        const existingWishlist = await prisma.wishlist.findFirst({
          where: {
            userId: user.id,
            productId: args.productId,
          },
        });

        if (existingWishlist) {
          throw new GraphQLError('Product already in wishlist');
        }

        return await prisma.wishlist.create({
          data: {
            userId: user.id,
            productId: args.productId,
          },
        });
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to add item to wishlist');
      }
    },
  })
);

builder.mutationField('removeFromWishlist', t =>
  t.field({
    type: 'Boolean',
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, context) => {
      const user = checkUserAuth(context);

      try {
        const deleted = await prisma.wishlist.deleteMany({
          where: {
            userId: user.id,
            productId: args.productId,
          },
        });

        return deleted.count > 0;
      } catch (error) {
        throw new GraphQLError('Failed to remove item from wishlist');
      }
    },
  })
);
