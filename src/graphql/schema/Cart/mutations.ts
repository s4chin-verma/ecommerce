import { checkUserAuth } from '@/graphql/ctx';
import { builder } from '../../builder';
import prisma from '@/lib/prisma';
import { GraphQLError } from 'graphql';

builder.mutationFields(t => ({
  addToCart: t.prismaField({
    type: 'CartProduct',
    args: {
      productId: t.arg.string({ required: true }),
      quantity: t.arg.int({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const user = checkUserAuth(context);

      const existingCartItem = await prisma.cartProduct.findFirst({
        where: {
          userId: user.id,
          productId: args.productId,
        },
      });

      if (existingCartItem) {
        return await prisma.cartProduct.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + args.quantity },
        });
      } else {
        return await prisma.cartProduct.create({
          ...query,
          data: {
            userId: user.id,
            productId: args.productId,
            quantity: args.quantity,
          },
        });
      }
    },
  }),

  updateCartItemQuantity: t.prismaField({
    type: 'CartProduct',
    args: {
      cartItemId: t.arg.string({ required: true }),
      change: t.arg.int({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const user = checkUserAuth(context);

      const cartItem = await prisma.cartProduct.findFirst({
        where: { id: args.cartItemId, userId: user.id },
      });

      if (!cartItem) {
        throw new GraphQLError('Cart item not found');
      }

      const newQuantity = cartItem.quantity + args.change;
      if (newQuantity <= 0) {
        await prisma.cartProduct.delete({ where: { id: cartItem.id } });
        return null;
      }

      return await prisma.cartProduct.update({
        where: { id: cartItem.id },
        data: { quantity: newQuantity },
      });
    },
  }),

  deleteCartItem: t.prismaField({
    type: 'CartProduct',
    args: {
      cartItemId: t.arg.string({ required: true }),
    },
    resolve: async (_, __, args, context) => {
      const user = checkUserAuth(context);

      const cartItem = await prisma.cartProduct.findFirst({
        where: { id: args.cartItemId, userId: user.id },
      });

      if (!cartItem) {
        throw new GraphQLError('Cart item not found');
      }

      await prisma.cartProduct.delete({ where: { id: cartItem.id } });
      return cartItem;
    },
  }),
}));
