import { builder } from '../../builder';
import prisma from '@/lib/prisma';
import { OrderStatus } from './enum';
import { GraphQLError } from 'graphql';

builder.prismaObject('Order', {
  fields: t => ({
    id: t.exposeID('id'),
    orderNumber: t.exposeString('orderNumber'),
    userId: t.exposeString('userId'),
    userName: t.exposeString('userName'),
    userPhone: t.exposeString('userPhone'),
    productId: t.exposeString('productId'),
    paymentToken: t.exposeString('paymentToken', { nullable: true }),
    quantity: t.exposeInt('quantity'),
    addressId: t.exposeString('addressId'),
    deliveryFee: t.exposeFloat('deliveryFee'),
    serviceFee: t.exposeFloat('serviceFee'),
    discount: t.exposeFloat('discount', { nullable: true }),
    subtotal: t.exposeFloat('subtotal'),
    paid: t.exposeBoolean('paid'),
    orderDate: t.expose('orderDate', { type: 'DateTime' }),
    deliveryTime: t.expose('deliveryTime', {
      type: 'DateTime',
      nullable: true,
    }),
    status: t.expose('status', { type: OrderStatus }),
    deliveryAddress: t.relation('deliveryAddress'),
    User: t.relation('User', { nullable: true }),
    product: t.relation('product', { nullable: true }),
    Payment: t.relation('Payment'),
    Shipping: t.relation('Shipping'),
  }),
});

builder.queryFields(t => ({
  getOrderByUserId: t.prismaField({
    type: ['Order'],
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      return prisma.order.findMany({
        ...query,
        where: { userId: args.userId },
        include: {
          deliveryAddress: true,
          User: true,
          product: true,
        },
      });
    },
  }),

  getOrderByOrderId: t.prismaField({
    type: 'Order',
    args: {
      orderId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const order = await prisma.order.findUnique({
        ...query,
        where: { id: args.orderId },
        include: {
          deliveryAddress: true,
          User: true,
        },
      });

      if (!order) throw new GraphQLError('Order not found');
      return order;
    },
  }),
}));
