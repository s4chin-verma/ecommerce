import { builder } from '../../builder';
import prisma from '@/lib/prisma';
import { GraphQLError } from 'graphql';
import { argsToArgsConfig } from 'graphql/type/definition';

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
    resolve: async (query, _parent, _, _context) => {
      const products = await prisma.product.findMany({
        ...query,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return products;
    },
  }),

  getProductByCategory: t.prismaField({
    type: ['Product'],
    args: {
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _context) => {
      const products = await prisma.product.findMany({
        where: { categoryId: args.categoryId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        ...query,
      });
      if (products.length < 0) throw new GraphQLError('No products found');
      return products;
    },
  }),

  getLimitedProduct: t.prismaField({
    type: ['Product'],
    args: {
      limit: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, context) => {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: args.limit,
        ...query,
      });

      if (products.length === 0) throw new GraphQLError('No products found');
      return products;
    },
  }),

  searchProducts: t.prismaField({
    type: ['Product'],
    args: {
      query: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _context) => {
      const searchTerm = args.query.trim();

      if (!searchTerm || searchTerm.length < 2) {
        return [];
      }

      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            {
              category: {
                title: { contains: searchTerm, mode: 'insensitive' },
              },
            },
          ],
        },
        include: {
          category: true,
        },
        orderBy: {
          name: 'asc',
        },
        take: 10,
        ...query,
      });

      return products;
    },
  }),
}));
