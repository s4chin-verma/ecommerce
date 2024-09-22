import { builder } from '../../builder';
import { OrderStatus } from './enum';
import prisma from '@/lib/prisma';

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

builder.mutationFields(t => ({
  createOrder: t.prismaField({
    type: 'Order',
    args: {
      userName: t.arg.string({ required: true }),
      userId: t.arg.string({ required: true }),
      userEmail: t.arg.string({ required: true }),
      userPhone: t.arg.string({ required: true }),
      addressId: t.arg.string({ required: true }),
      note: t.arg.string(),
      total: t.arg.float({ required: true }),
    },
    resolve: async (query, _, args) => {
      const orderNumber = generateOrderNumber();
      const order = await prisma.order.create({
        ...query,
        data: {
          ...args,
          orderNumber,
        },
      });
      return order;
    },
  }),

  updateStatus: t.prismaField({
    type: 'Order',
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg({ type: OrderStatus, required: true }),
    },
    resolve: async (query, _, args) => {
      const order = await prisma.order.update({
        ...query,
        where: { id: args.id },
        data: { status: args.status },
      });
      return order;
    },
  }),

  updateOrder: t.prismaField({
    type: 'Order',
    args: {
      id: t.arg.string({ required: true }),
      status: t.arg({ type: OrderStatus }),
      paid: t.arg.boolean(),
      paymentToken: t.arg.string(),
      deliveryTime: t.arg.string(),
      note: t.arg.string(),
    },
    resolve: async (query, _, args) => {
      const order = await prisma.order.update({
        ...query,
        where: { id: args.id },
        data: {
          status: args.status ?? undefined,
          paid: args.paid ?? undefined,
          paymentToken: args.paymentToken,
          deliveryTime: args.deliveryTime
            ? new Date(args.deliveryTime)
            : undefined,
          note: args.note,
        },
      });
      return order;
    },
  }),
}));
