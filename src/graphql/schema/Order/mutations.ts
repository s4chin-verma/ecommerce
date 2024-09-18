import { builder } from '@/graphql/builder';

// builder.prismaObject('Order', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     user: t.relation('user'),
//     userId: t.exposeString('userId'),
//     products: t.relation('products'),
//     totalAmount: t.exposeFloat('totalAmount'),
//     shippingAddress: t.exposeString('shippingAddress'),
//     billingAddress: t.exposeString('billingAddress'),
//     status: t.exposeString('status'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//     payment: t.relation('payment'),
//     shipping: t.relation('shipping'),
//   }),
// });

builder.prismaObject('OrderProduct', {
  fields: t => ({
    id: t.exposeID('id'),
    product: t.relation('product'),
    productId: t.exposeString('productId'),
    order: t.relation('order'),
    orderId: t.exposeString('orderId'),
    quantity: t.exposeInt('quantity'),
  }),
});
