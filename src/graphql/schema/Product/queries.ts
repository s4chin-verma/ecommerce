import { builder } from '../../builder';
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
    resolve: async (query, _parent, args, _context) => {
      const products = await prisma.product.findMany({
        ...query,
        orderBy: {
          createdAt: 'desc', // Or any other ordering you prefer
        },
      });
      return products;
    },
  }),
}));

// getProducts: t.prismaConnection({
//   type: 'Product',
//   cursor: 'id',
//   args: {
//     first: t.arg.int(),
//     after: t.arg.string(),
//     before: t.arg.string(),
//     last: t.arg.int(),
//   },
//   resolve: async (query, _parent, args, _context) => {
//     const products = await prisma.product.findMany({
//       ...query,
//       take: (args.first as number) ?? (args.last as number), // Use 'first' for forward, 'last' for backward
//       skip: 1, // Skip the current cursor
//       cursor: args.after
//         ? { id: args.after } // Use 'after' cursor for forward
//         : args.before
//         ? { id: args.before } // Use 'before' cursor for backward
//         : undefined,
//       orderBy: {
//         id: args.after ? 'asc' : 'desc', // Ensure proper ordering for forward/backward
//       },
//     });

//     return products;
//   },
// }),
