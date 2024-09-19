import { builder } from '@/graphql/builder';
import { GraphQLError } from 'graphql';
import prisma from '@/lib/prisma';

builder.prismaObject('Address', {
  fields: t => ({
    id: t.exposeID('id'),
    user: t.relation('user'),
    userId: t.exposeString('userId'),
    addressLine1: t.exposeString('addressLine1'),
    addressLine2: t.exposeString('addressLine2', { nullable: true }),
    city: t.exposeString('city'),
    state: t.exposeString('state'),
    postalCode: t.exposeString('postalCode'),
    country: t.exposeString('country'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.queryFields(t => ({
  getAddress: t.prismaField({
    type: 'Address',
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const userRole = (await context).user?.role;
      if (userRole !== 'USER' && userRole !== 'ADMIN') {
        throw new GraphQLError(
          'You must be logged in as a user or an admin to perform this action'
        );
      }
      const address = await prisma.address.findUniqueOrThrow({
        ...query,
        where: { userId: args.userId },
      });
      return address;
    },
  }),
}));
