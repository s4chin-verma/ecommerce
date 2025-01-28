import { builder } from '../../builder';

export const OrderStatus = builder.enumType('OrderStatus', {
  values: [
    'ORDERED',
    'CONFIRMED',
    'SHIPPED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
    'RETURNED',
  ] as const,
  description: 'Order Status',
});
