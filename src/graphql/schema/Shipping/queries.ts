import { builder } from '@/graphql/builder';

builder.prismaObject('Shipping', {
  fields: t => ({
    id: t.exposeID('id'),

    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});
