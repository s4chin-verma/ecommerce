import { builder } from '@/graphql/builder';

builder.prismaObject('Shipping', {
  fields: t => ({
    id: t.exposeID('id'),
    orderId: t.exposeString('orderId'),
    trackingNumber: t.exposeString('trackingNumber'),
    carrier: t.exposeString('carrier'),
    status: t.exposeString('status'),
    estimatedDelivery: t.expose('estimatedDelivery', { type: 'DateTime' }),
    order: t.relation('order'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
