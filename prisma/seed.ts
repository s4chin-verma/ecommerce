// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Create categories
//   console.log('Seeding Database...');

//   const electronics = await prisma.category.create({
//     data: {
//       name: 'Electronics',
//     },
//   });

//   const clothing = await prisma.category.create({
//     data: {
//       name: 'Clothing',
//     },
//   });

//   // Create users
//   const user1 = await prisma.user.create({
//     data: {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       password: 'password123',
//       phone: '1234567890',
//       address: {
//         create: [
//           {
//             addressLine1: '123 Main St',
//             city: 'Anytown',
//             state: 'Anystate',
//             postalCode: '12345',
//             country: 'USA',
//           },
//         ],
//       },
//       role: 'user',
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       password: 'password123',
//       phone: '0987654321',
//       address: {
//         create: [
//           {
//             addressLine1: '456 Another St',
//             city: 'Othertown',
//             state: 'Otherstate',
//             postalCode: '67890',
//             country: 'USA',
//           },
//         ],
//       },
//       role: 'user',
//     },
//   });

//   const user3 = await prisma.user.create({
//     data: {
//       name: 'Sachin Verma',
//       email: 'shivamvarma346@gmail.com',
//       password: '111Sachin',
//       phone: '6387975718',
//       address: {
//         create: [
//           {
//             addressLine1: '456 Another St',
//             city: 'Jaipur',
//             state: 'Rajasthan',
//             postalCode: '302028',
//             country: 'INDIA',
//           },
//         ],
//       },
//       role: 'user',
//     },
//   });

//   // Create products
//   const product1 = await prisma.product.create({
//     data: {
//       name: 'Smartphone',
//       description: 'Latest model smartphone',
//       price: 699.99,
//       categoryId: electronics.id,
//       images: ['smartphone.jpg'],
//       stock: 50,
//     },
//   });

//   const product2 = await prisma.product.create({
//     data: {
//       name: 'T-Shirt',
//       description: 'Comfortable cotton t-shirt',
//       price: 19.99,
//       categoryId: clothing.id,
//       images: ['tshirt.jpg'],
//       stock: 200,
//     },
//   });

//   // Create orders
//   const order1 = await prisma.order.create({
//     data: {
//       userId: user1.id,
//       totalAmount: 719.98,
//       shippingAddress: '123 Main St, Anytown, Anystate, 12345, USA',
//       billingAddress: '123 Main St, Anytown, Anystate, 12345, USA',
//       status: 'pending',
//       products: {
//         create: [
//           {
//             productId: product1.id,
//             quantity: 1,
//           },
//           {
//             productId: product2.id,
//             quantity: 1,
//           },
//         ],
//       },
//     },
//   });

//   // Create reviews
//   const review1 = await prisma.review.create({
//     data: {
//       productId: product1.id,
//       userId: user1.id,
//       rating: 5,
//       comment: 'Great product!',
//     },
//   });

//   const review2 = await prisma.review.create({
//     data: {
//       productId: product2.id,
//       userId: user2.id,
//       rating: 4,
//       comment: 'Good quality t-shirt.',
//     },
//   });

//   // Create a cart
//   const cart1 = await prisma.cart.create({
//     data: {
//       userId: user1.id,
//       totalAmount: 719.98,
//       products: {
//         create: [
//           {
//             productId: product1.id,
//             quantity: 1,
//           },
//           {
//             productId: product2.id,
//             quantity: 1,
//           },
//         ],
//       },
//     },
//   });

//   // Create payments
//   const payment1 = await prisma.payment.create({
//     data: {
//       userId: user1.id,
//       orderId: order1.id,
//       amount: 719.98,
//       paymentMethod: 'Credit Card',
//       status: 'pending',
//     },
//   });

//   console.log({
//     electronics,
//     clothing,
//     user1,
//     user2,
//     user3,
//     product1,
//     product2,
//     order1,
//     review1,
//     review2,
//     cart1,
//     payment1,
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
