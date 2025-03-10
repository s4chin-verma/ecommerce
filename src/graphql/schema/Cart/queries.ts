import { checkUserAuth } from '@/graphql/ctx';
import { builder } from '../../builder';
import prisma from '@/lib/prisma';

builder.prismaObject('CartProduct', {
  fields: t => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    user: t.relation('user'),
    productId: t.exposeString('productId'),
    product: t.relation('product'),
    quantity: t.exposeInt('quantity'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.queryFields(t => ({
  getCartItems: t.prismaField({
    type: ['CartProduct'],
    resolve: async (query, _, args, context) => {
      const user = checkUserAuth(context);
      return await prisma.cartProduct.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        ...query,
      });
    },
  }),
}));
