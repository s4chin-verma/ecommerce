import { builder } from '../../builder';
import prisma from '@/lib/prisma';
import { OrderStatus } from './enum';

builder.prismaObject('Order', {
  fields: t => ({
    id: t.exposeID('id'),
    orderNumber: t.exposeID('orderNumber'),
    deliveryTime: t.expose('deliveryTime', { type: 'DateTime' }),
    userName: t.exposeID('userName'),
    userId: t.exposeID('userId'),
    userEmail: t.exposeID('userEmail'),
    user: t.relation('user'),
    userPhone: t.exposeString('userPhone'),
    paymentToken: t.exposeString('paymentToken'),
    paid: t.exposeBoolean('paid'),
    delivery: t.relation('delivery'),
    addressId: t.exposeID('addressId'),
    deliveryAddress: t.relation('deliveryAddress'),
    deliveryFee: t.exposeFloat('deliveryFee'),
    serviceFee: t.exposeFloat('serviceFee'),
    status: t.expose('status', { type: OrderStatus }),
    note: t.exposeString('note'),
    discount: t.exposeFloat('discount'),
    total: t.exposeFloat('total'),
    orderProduct: t.relation('OrderProduct'),
    payment: t.relation('Payment'),
    shipping: t.relation('Shipping'),
  }),
});

builder.prismaObject('OrderProduct', {
  fields: t => ({
    id: t.exposeID('id'),
    product: t.relation('Product'),
    productId: t.exposeString('productId'),
    order: t.relation('Order'),
    orderId: t.exposeString('orderId'),
    quantity: t.exposeInt('quantity'),
  }),
});
