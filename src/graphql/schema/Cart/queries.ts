import { builder } from '../../builder';
import prisma from '@/lib/prisma';

builder.prismaObject('Cart', {
  fields: t => ({
    id: t.exposeID('id'),
    user: t.relation('user'),
    userId: t.exposeString('userId'),
    products: t.relation('products'),
    totalAmount: t.exposeFloat('totalAmount'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.prismaObject('CartProduct', {
  fields: t => ({
    id: t.exposeID('id'),
    product: t.relation('product'),
    productId: t.exposeString('productId'),
    cart: t.relation('cart'),
    cartId: t.exposeString('cartId'),
    quantity: t.exposeInt('quantity'),
  }),
});
