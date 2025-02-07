import { GraphQLError } from 'graphql';
import { builder } from '../../builder';
import prisma from '@/lib/prisma';
import { checkUserAuth } from '@/graphql/ctx';

builder.prismaObject('Wishlist', {
  fields: t => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    productId: t.exposeString('productId'),
  }),
});

builder.queryFields(t => ({
  isWishListed: t.field({
    type: 'Boolean',
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, context) => {
      try {
        const user = checkUserAuth(context);
        const wishlist = await prisma.wishlist.findFirst({
          where: { userId: user.id, productId: args.productId },
        });
        return wishlist !== null;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError(
          'Something went wrong while checking the wishlist.'
        );
      }
    },
  }),

  wishListedProducts: t.prismaField({
    type: ['Wishlist'],
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      try {
        const data = prisma.wishlist.findMany({
          where: { userId: args.userId },
          ...query,
        });
        if (!data)
          throw new GraphQLError('There is no product in your wishlist');
        return data;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError(
          'Something went wrong while fetching wishlisted products.'
        );
      }
    },
  }),
}));
