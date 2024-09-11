import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  # User Type
  type User {
    id: ID!
    name: String!
    email: String!
    emailVerified: DateTime
    password: String!
    address: [Address!]!
    phone: String
    orderHistory: [Order!]!
    wishlist: Wishlist
    role: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    review: [Review!]!
    cart: [Cart!]!
    payment: [Payment!]!
  }

  # Address Type
  type Address {
    id: ID!
    user: User!
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String!
    postalCode: String!
    country: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Product Type
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: Category!
    images: [String!]!
    stock: Int!
    reviews: [Review!]!
    ratings: Float
    createdAt: DateTime!
    updatedAt: DateTime!
    orderProduct: [OrderProduct!]!
    cartProduct: [CartProduct!]!
    wishlist: Wishlist
  }

  # Review Type
  type Review {
    id: ID!
    product: Product!
    user: User!
    rating: Int!
    comment: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Order Type
  type Order {
    id: ID!
    user: User!
    products: [OrderProduct!]!
    totalAmount: Float!
    shippingAddress: String!
    billingAddress: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    payment: [Payment!]!
    shipping: [Shipping!]!
  }

  # OrderProduct Type
  type OrderProduct {
    id: ID!
    product: Product!
    order: Order!
    quantity: Int!
  }

  # Category Type
  type Category {
    id: ID!
    name: String!
    description: String!
    products: [Product!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Cart Type
  type Cart {
    id: ID!
    user: User!
    products: [CartProduct!]!
    totalAmount: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # CartProduct Type
  type CartProduct {
    id: ID!
    product: Product!
    cart: Cart!
    quantity: Int!
  }

  # Wishlist Type
  type Wishlist {
    id: ID!
    user: User!
    products: [Product!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Payment Type
  type Payment {
    id: ID!
    user: User!
    order: Order!
    amount: Float!
    paymentMethod: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Shipping Type
  type Shipping {
    id: ID!
    order: Order!
    trackingNumber: String!
    carrier: String!
    status: String!
    estimatedDelivery: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Scalar DateTime
  scalar DateTime

  # Query Root Type
  type Query {
    users: [User!]!
    user(id: ID!): User
    products: [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
    order(id: ID!): Order
    categories: [Category!]!
  }

  # Mutation Root Type
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createProduct(
      name: String!
      description: String!
      price: Float!
      categoryId: ID!
    ): Product!
    createOrder(
      userId: ID!
      products: [OrderProductInput!]!
      totalAmount: Float!
      shippingAddress: String!
      billingAddress: String!
    ): Order!
    createReview(
      productId: ID!
      userId: ID!
      rating: Int!
      comment: String!
    ): Review!
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }
`;
