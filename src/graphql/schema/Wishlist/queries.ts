import { builder } from '@/graphql/builder';

builder.prismaObject('Wishlist', {
  fields: t => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    products: t.relation('products'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
