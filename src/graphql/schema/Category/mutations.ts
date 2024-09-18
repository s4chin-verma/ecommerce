import { builder } from '@/graphql/builder';
import prisma from '@/lib/prisma';
import { GraphQLError } from 'graphql';

builder.mutationFields(t => ({
  addCategory: t.prismaField({
    type: 'Category',
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const newCategory = await prisma.category.create({
        data: { ...args },
      });
      return newCategory;
    },
  }),
  editMenu: t.prismaField({
    type: 'Category',
    args: {
      id: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: async (_query, _, args, context) => {
      if (context.user?.role !== 'ADMIN') {
        throw new GraphQLError('You are not authorized to perform this action');
      }
      const updatedCategory = await prisma.category.update({
        where: { id: args.id },
        data: { title: args.title, description: args.description },
      });
      return updatedCategory;
    },
  }),
  deleteMenu: t.prismaField({
    type: 'Category',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_query, _, args, context) => {
      if (context.user?.role !== 'ADMIN') {
        throw new GraphQLError('You are not authorized to perform this action');
      }

      const deleteMenu = await prisma.category.delete({
        where: { id: args.id },
      });
      return deleteMenu;
    },
  }),
}));
