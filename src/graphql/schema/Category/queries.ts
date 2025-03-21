import prisma from '@/lib/prisma';
import { GraphQLError } from 'graphql';
import { builder } from '../../builder';

builder.prismaObject('Category', {
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    image: t.exposeString('image'),
    products: t.relation('products'),
  }),
});

builder.queryFields(t => ({
  getCategory: t.prismaField({
    type: 'Category',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const category = await prisma.category.findFirst({
        ...query,
        where: { id: args.id },
      });
      if (!category) throw new GraphQLError('category not found');

      return category;
    },
  }),
  getCategories: t.prismaField({
    type: ['Category'],
    resolve: async query => {
      const categories = await prisma.category.findMany({
        ...query,
      });
      return categories;
    },
  }),
}));
