import { PrismaClient } from '@prisma/client';
import { GraphQLScalarType, Kind } from 'graphql';

const prisma = new PrismaClient();

export const resolvers = {
  // DateTime Scalar to handle DateTime values in GraphQL
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A DateTime scalar type to handle date and time values',
    parseValue(value: string) {
      return new Date(value); // From the client
    },
    serialize(value: Date) {
      return value.toISOString(); // To the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  // Query Resolvers
  Query: {
    // Fetch all users
    users: async () => {
      return await prisma.user.findMany();
    },

    // Fetch a single user by ID
    user: async (_parent: unknown, args: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id: args.id },
      });
    },
  },

  // Mutation Resolvers
  Mutation: {
    // Create a new user
    createUser: async (
      _parent: unknown,
      args: { name: string; email: string; password: string }
    ) => {
      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password, // Remember to hash passwords in production
        },
      });
    },

    // Update an existing user by ID
    updateUser: async (
      _parent: unknown,
      args: { id: string; name?: string; email?: string }
    ) => {
      return await prisma.user.update({
        where: { id: args.id },
        data: {
          name: args.name ?? undefined,
          email: args.email ?? undefined,
        },
      });
    },

    // Delete a user by ID
    deleteUser: async (_parent: unknown, args: { id: string }) => {
      return await prisma.user.delete({
        where: { id: args.id },
      });
    },
  },
};
