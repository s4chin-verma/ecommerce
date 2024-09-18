import prisma from '@/lib/prisma';

async function main() {
  console.log('Seeding Database for Jewelry E-commerce...');

  const categories = await prisma.category.createMany({
    data: [
      {
        title: 'Rings',
        description: 'Beautiful rings for all occasions',
      },
      {
        title: 'Necklaces',
        description: 'Elegant necklaces to complement any outfit',
      },
      {
        title: 'Bracelets',
        description: 'Stylish bracelets for wrist adornment',
      },
      {
        title: 'Earrings',
        description: 'Stunning earrings for every style',
      },
    ],
  });

  const [rings, necklaces, bracelets, earrings] =
    await prisma.category.findMany();

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Diamond Solitaire Ring',
        description: 'Classic 1 carat diamond solitaire ring in 18k white gold',
        price: 2999.99,
        sellingPrice: 2999.99,
        categoryId: rings.id,
        images: ['diamond-solitaire-ring.jpg'],
        stock: 10,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pearl Strand Necklace',
        description: 'Elegant 18-inch strand of Akoya pearls',
        price: 1499.99,
        sellingPrice: 1499.99,
        categoryId: necklaces.id,
        images: ['pearl-necklace.jpg'],
        stock: 15,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gold Tennis Bracelet',
        description: '14k gold tennis bracelet with 2 carats of diamonds',
        price: 1999.99,
        categoryId: bracelets.id,
        images: ['gold-tennis-bracelet.jpg'],
        stock: 8,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sapphire Stud Earrings',
        description: 'Beautiful blue sapphire studs in 14k white gold',
        price: 599.99,
        categoryId: earrings.id,
        images: ['sapphire-studs.jpg'],
        stock: 20,
      },
    }),
  ]);

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    },
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: 4499.98,
      //   shippingAddress:
      //     '789 Jewelry Lane, Gemstone City, Crystal State, 54321, USA',
      //   billingAddress:
      //     '789 Jewelry Lane, Gemstone City, Crystal State, 54321, USA',
      status: 'ORDERED',
      // OrderProduct: {
      //   create: [
      //     {
      //       productId: products[0].id,
      //       quantity: 1,
      //     },
      //     {
      //       productId: products[1].id,
      //       quantity: 1,
      //     },
      //   ],
      // },
    },
  });

  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        productId: products[0].id,
        userId: user.id,
        rating: 5,
        comment: 'Absolutely stunning ring! The diamond sparkles beautifully.',
      },
    }),
    prisma.review.create({
      data: {
        productId: products[1].id,
        userId: user.id,
        rating: 4,
        comment: 'Lovely pearls, but the clasp could be stronger.',
      },
    }),
  ]);

  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
      totalAmount: 2599.98,
      products: {
        create: [
          {
            productId: products[2].id,
            quantity: 1,
          },
          {
            productId: products[3].id,
            quantity: 1,
          },
        ],
      },
    },
  });

  const payment = await prisma.payment.create({
    data: {
      userId: user.id,
      orderId: order.id,
      amount: 4499.98,
      paymentMethod: 'Credit Card',
      status: 'completed',
    },
  });

  console.log({
    categories,
    products,
    user,
    order,
    reviews,
    cart,
    payment,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
