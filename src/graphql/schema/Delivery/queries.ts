import { builder } from '../../builder';

builder.prismaObject('Delivery', {
  fields: t => ({
    id: t.exposeID('id'),
    driverName: t.exposeString('driverName'),
    driverEmail: t.exposeString('driverEmail'),
    driverPhone: t.exposeString('driverPhone'),
    order: t.relation('order'),
    orderNum: t.exposeString('orderNum'),
  }),
});
