import { builder } from '@/graphql/builder';
import prisma from '@/lib/prisma';
import { GraphQLError } from 'graphql';
import { Role } from './enum';

builder.prismaObject('User', {
  fields: t => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email'),
    emailVerified: t.exposeBoolean('emailVerified'),
    password: t.exposeString('password'),
    // address: t.relation('address'),
    phone: t.exposeString('phone', { nullable: true }),
    // orderHistory: t.relation('orderHistory'),
    // wishlist: t.relation('wishlist', { nullable: true }),
    // role: t.expose('role', { type: Role }),
    // createdAt: t.expose('createdAt', { type: 'DateTime' }),
    // updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    // review: t.relation('review'),
    // cart: t.relation('cart'),
    // payment: t.relation('payment'),
  }),
});

builder.queryFields(t => ({
  getUsers: t.prismaField({
    type: ['User'],
    resolve: async (query, _, _args, context) => {
      // if ((await context).user?.role !== 'ADMIN') {
      //   throw new GraphQLError(
      //     "You don't have permission to perform this action"
      //   );
      // }
      const adminUsers = await prisma.user.findMany({
        ...query,
      });
      return adminUsers;
    },
  }),

  getUser: t.prismaField({
    type: 'User',
    args: {
      email: t.arg.string({ required: true }),
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
        where: { email: args?.email },
      });
      return user;
    },
  }),
}));

// builder.prismaObject('Review', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     product: t.relation('product'),
//     productId: t.exposeString('productId'),
//     user: t.relation('user'),
//     userId: t.exposeString('userId'),
//     rating: t.exposeInt('rating'),
//     comment: t.exposeString('comment'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// builder.prismaObject('Product', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     name: t.exposeString('name'),
//     description: t.exposeString('description'),
//     price: t.exposeFloat('price'),
//     category: t.relation('category'),
//     categoryId: t.exposeString('categoryId'),
//     images: t.exposeStringList('images'),
//     stock: t.exposeInt('stock'),
//     reviews: t.relation('reviews'),
//     ratings: t.exposeFloat('ratings', { nullable: true }),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// builder.prismaObject('Order', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     user: t.relation('user'),
//     userId: t.exposeString('userId'),
//     products: t.relation('products'),
//     totalAmount: t.exposeFloat('totalAmount'),
//     shippingAddress: t.exposeString('shippingAddress'),
//     billingAddress: t.exposeString('billingAddress'),
//     status: t.exposeString('status'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//     payment: t.relation('payment'),
//     shipping: t.relation('shipping'),
//   }),
// });

// builder.prismaObject('OrderProduct', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     product: t.relation('product'),
//     productId: t.exposeString('productId'),
//     order: t.relation('order'),
//     orderId: t.exposeString('orderId'),
//     quantity: t.exposeInt('quantity'),
//   }),
// });

// builder.prismaObject('Category', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     name: t.exposeString('name'),
//     products: t.relation('products'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// builder.prismaObject('Cart', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     user: t.relation('user'),
//     userId: t.exposeString('userId'),
//     products: t.relation('products'),
//     totalAmount: t.exposeFloat('totalAmount'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// builder.prismaObject('CartProduct', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     product: t.relation('product'),
//     productId: t.exposeString('productId'),
//     cart: t.relation('cart'),
//     cartId: t.exposeString('cartId'),
//     quantity: t.exposeInt('quantity'),
//   }),
// });

// // Define Payment model
// builder.prismaObject('Payment', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     user: t.relation('user'),
//     userId: t.exposeString('userId'),
//     order: t.relation('order'),
//     orderId: t.exposeString('orderId'),
//     amount: t.exposeFloat('amount'),
//     paymentMethod: t.exposeString('paymentMethod'),
//     status: t.exposeString('status'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// // Define Address model
// builder.prismaObject('Address', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     user: t.relation('user'),
//     userId: t.exposeString('userId'),
//     addressLine1: t.exposeString('addressLine1'),
//     addressLine2: t.exposeString('addressLine2', { nullable: true }),
//     city: t.exposeString('city'),
//     state: t.exposeString('state'),
//     postalCode: t.exposeString('postalCode'),
//     country: t.exposeString('country'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// // Define Wishlist model
// builder.prismaObject('Wishlist', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     userId: t.exposeString('userId'),
//     products: t.relation('products'),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// // Define Shipping model
// builder.prismaObject('Shipping', {
//   fields: t => ({
//     id: t.exposeID('id'),
//     order: t.relation('order'),
//     orderId: t.exposeString('orderId'),
//     trackingNumber: t.exposeString('trackingNumber'),
//     carrier: t.exposeString('carrier'),
//     status: t.exposeString('status'),
//     estimatedDelivery: t.expose('estimatedDelivery', { type: 'DateTime' }),
//     createdAt: t.expose('createdAt', { type: 'DateTime' }),
//     updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
//   }),
// });

// builder.mutationField('addProduct', t =>
//   t.prismaField({
//     type: 'Product',
//     args: {
//       name: t.arg.string({ required: true }),
//       description: t.arg.string({ required: true }),
//       price: t.arg.float({ required: true }),
//       categoryId: t.arg.string({ required: true }),
//       stock: t.arg.int({ required: true }),
//       images: t.arg.stringList({ required: true }),
//     },
//     resolve: async (query, _parent, args) => {
//       const newProduct = await prisma.product.create({
//         ...query,
//         data: {
//           name: args.name,
//           description: args.description,
//           price: args.price,
//           categoryId: args.categoryId,
//           stock: args.stock,
//           images: { set: args.images },
//         },
//       });
//       return newProduct;
//     },
//   })
// );

// builder.queryFields(t => ({
//   getCategory: t.prismaField({
//     type: 'Category',
//     args: {
//       id: t.arg.string({ required: true }),
//     },
//     resolve: async (query, _, args) => {
//       const category = await prisma.category.findFirst({
//         ...query,
//         where: {
//           id: args.id,
//         },
//       });
//       if (!category) {
//         throw new GraphQLError('category not found');
//       }
//       return category;
//     },
//   }),
//   getCategories: t.prismaField({
//     type: ['Category'],
//     resolve: query => prisma.category.findMany(query),
//   }),
// }));
