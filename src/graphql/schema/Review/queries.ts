import { builder } from '../../builder';

builder.prismaObject('Review', {
  fields: t => ({
    id: t.exposeID('id'),
    productId: t.exposeID('productId'),
    userId: t.exposeID('userId'),
    rating: t.exposeInt('rating'),
    comment: t.exposeString('comment'),
    user: t.relation('user'),
    product: t.relation('product'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
