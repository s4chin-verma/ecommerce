import { builder } from '../../builder';
import { GraphQLError } from 'graphql';
import { Role } from './enum';
import prisma from '@/lib/prisma';

builder.prismaObject('User', {
  fields: t => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    email: t.exposeString('email'),
    emailVerified: t.exposeBoolean('emailVerified'),
    password: t.exposeString('password'),
    address: t.relation('address'),
    phone: t.exposeString('phone', { nullable: true }),
    orderHistory: t.relation('orderHistory'),
    wishlist: t.relation('wishlist', { nullable: true }),
    role: t.expose('role', { type: Role }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    review: t.relation('review'),
    payment: t.relation('payment'),
  }),
});

builder.queryFields(t => ({
  getUsers: t.prismaField({
    type: ['User'],
    resolve: async (query, _, _args, context) => {
      if ((await context).user?.role !== 'ADMIN') {
        throw new GraphQLError(
          "You don't have permission to perform this action"
        );
      }
      const adminUsers = await prisma.user.findMany({
        ...query,
      });
      return adminUsers;
    },
  }),

  getUser: t.prismaField({
    type: 'User',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const userRole = (await context).user?.role;
      if (userRole !== 'USER' && userRole !== 'ADMIN') {
        throw new GraphQLError(
          'You must be logged in as a user or an admin to perform this action'
        );
      }
      const user = await prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: args?.id },
      });
      return user;
    },
  }),
}));
