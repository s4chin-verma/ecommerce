import { builder } from '../../builder';

export const OrderStatus = builder.enumType('OrderStatus', {
  values: ['ORDERED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'] as const,
  description: 'Order Status',
});
