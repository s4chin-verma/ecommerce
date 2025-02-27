import { builder } from '../../builder';
import { GraphQLError } from 'graphql';
import { checkUserAuth } from '@/graphql/ctx';
import prisma from '@/lib/prisma';

builder.mutationFields(t => ({
  createAddress: t.prismaField({
    type: 'Address',
    args: {
      name: t.arg.string({ required: true }),
      postalCode: t.arg.string({ required: true }),
      phone: t.arg.string({ required: true }),
      addressLine: t.arg.string({ required: true }),
      landmark: t.arg.string({ required: true }),
      city: t.arg.string({ required: true }),
      state: t.arg.string({ required: true }),
      alternatePhone: t.arg.string(),
    },
    resolve: async (query, _, args, context) => {
      checkUserAuth(context);
      return prisma.address.create({
        ...query,
        data: {
          name: args.name,
          postalCode: args.postalCode,
          phone: args.phone,
          addressLine: args.addressLine,
          landmark: args.landmark,
          city: args.city,
          state: args.state,
          alternatePhone: args.alternatePhone,
          user: { connect: { id: context.user?.id } },
        },
      });
    },
  }),
  updateAddress: t.prismaField({
    type: 'Address',
    args: {
      id: t.arg.string({ required: true }),
      name: t.arg.string(),
      postalCode: t.arg.string(),
      phone: t.arg.string(),
      addressLine: t.arg.string(),
      landmark: t.arg.string(),
      city: t.arg.string(),
      state: t.arg.string(),
      alternatePhone: t.arg.string(),
    },
    resolve: async (query, _, args, context) => {
      checkUserAuth(context);

      return prisma.address.update({
        ...query,
        where: { id: args.id },
        data: {
          name: args.name ?? undefined,
          postalCode: args.postalCode ?? undefined,
          phone: args.phone ?? undefined,
          addressLine: args.addressLine ?? undefined,
          landmark: args.landmark ?? undefined,
          city: args.city ?? undefined,
          state: args.state ?? undefined,
          alternatePhone: args.alternatePhone ?? undefined,
        },
      });
    },
  }),
  deleteAddress: t.prismaField({
    type: 'Address',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const user = checkUserAuth(context);
      return prisma.address.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
