import { builder } from '@/graphql/builder';

builder.prismaObject('Payment', {
  fields: t => ({
    id: t.exposeID('id'),
    user: t.relation('user'),
    userId: t.exposeString('userId'),
    order: t.relation('order'),
    orderId: t.exposeString('orderId'),
    amount: t.exposeFloat('amount'),
    paymentMethod: t.exposeString('paymentMethod'),
    status: t.exposeString('status'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
