import prisma from '@/lib/prisma';
import { builder } from '../../builder';
import { Role } from './enum';
import { GraphQLError } from 'graphql';
import bcryptjs from 'bcryptjs';

builder.mutationFields(t => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      firstName: t.arg.string({ required: true }),
      lastName: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      phone: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const hashedPassword = await bcryptjs.hash(args.password, 10);
      const emailExists = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (emailExists) throw new GraphQLError('Email already exists');

      const newUser = await prisma.user.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
          password: hashedPassword,
          emailVerified: false,
        },
      });
      return newUser;
    },
  }),
  editUserRole: t.prismaField({
    type: 'User',
    args: {
      role: t.arg({ type: Role, required: true }),
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, context) => {
      const roleEnum: any = args.role;
      if ((await context).user?.role !== 'ADMIN') {
        throw new GraphQLError('You are not authorized to perform this action');
      }

      const newRole = await prisma.user.update({
        where: { id: args.id },
        data: { role: roleEnum },
      });

      return newRole;
    },
  }),
}));
