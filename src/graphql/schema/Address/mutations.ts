import { builder } from '../../builder';
import { GraphQLError } from 'graphql';
import prisma from '@/lib/prisma';

builder.mutationFields(t => ({
  createAddress: t.prismaField({
    type: 'Address',
    args: {
      userId: t.arg.string({ required: true }),
      addressLine1: t.arg.string({ required: true }),
      addressLine2: t.arg.string(),
      city: t.arg.string({ required: true }),
      state: t.arg.string({ required: true }),
      postalCode: t.arg.string({ required: true }),
      country: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const userRole = (await context).user?.role;
      if (userRole !== 'USER' && userRole !== 'ADMIN') {
        throw new GraphQLError('You must be logged in to create an address');
      }
      return prisma.address.create({
        ...query,
        data: args,
      });
    },
  }),
  updateAddress: t.prismaField({
    type: 'Address',
    args: {
      id: t.arg.string({ required: true }),
      addressLine1: t.arg.string(),
      addressLine2: t.arg.string(),
      city: t.arg.string(),
      state: t.arg.string(),
      postalCode: t.arg.string(),
      country: t.arg.string(),
    },
    resolve: async (query, _, args, context) => {
      const userRole = (await context).user?.role;
      if (userRole !== 'USER' && userRole !== 'ADMIN') {
        throw new GraphQLError('You must be logged in to update an address');
      }
      const { id, ...data } = args;
      return prisma.address.update({
        ...query,
        where: { id },
        data,
      });
    },
  }),
  deleteAddress: t.prismaField({
    type: 'Address',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const userRole = (await context).user?.role;
      if (userRole !== 'USER' && userRole !== 'ADMIN') {
        throw new GraphQLError('You must be logged in to delete an address');
      }
      return prisma.address.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
