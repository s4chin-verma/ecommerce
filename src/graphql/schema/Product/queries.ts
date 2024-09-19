import { builder } from '@/graphql/builder';
import prisma from '@/lib/prisma';
import { GraphQLError } from 'graphql';

builder.prismaObject('Product', {
  fields: t => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    price: t.exposeFloat('price'),
    sellingPrice: t.exposeFloat('sellingPrice'),
    stock: t.exposeInt('stock'),
    totalSale: t.exposeInt('totalSale'),
    images: t.exposeStringList('images'),
    categoryId: t.exposeString('categoryId'),
    category: t.relation('category'),
    wishlistId: t.exposeString('wishlistId'),
    ratings: t.exposeFloat('ratings', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

builder.queryFields(t => ({
  getProduct: t.prismaField({
    type: 'Product',
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args) => {
      const product = await prisma.product.findFirst({
        ...query,
        where: {
          id: args.id,
        },
      });
      if (!product) throw new GraphQLError('Product not found');

      return product;
    },
  }),

  getProducts: t.prismaConnection({
    type: 'Product',
    cursor: 'id',
    resolve: async (query, _parent, _args, _context) => {
      const menus = await prisma.product.findMany({ ...query });
      return menus;
    },
  }),
}));
