import prisma from '@/lib/prisma';
import { builder } from '../../builder';
import { Role } from './enum';
import { GraphQLError } from 'graphql';
import bcryptjs from 'bcryptjs';
import { checkUserAuth } from '@/graphql/ctx';

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
    resolve: async (_, __, args, context) => {
      const roleEnum: any = args.role;
      if (context.user?.role !== 'ADMIN')
        throw new GraphQLError('Only admins can be allowed to change the role');

      const newRole = await prisma.user.update({
        where: { id: args.id },
        data: { role: roleEnum },
      });

      return newRole;
    },
  }),
  updateUser: t.prismaField({
    type: 'User',
    args: {
      firstName: t.arg.string({ required: false }),
      lastName: t.arg.string({ required: false }),
      email: t.arg.string({ required: false }),
      emailVerified: t.arg.boolean({ required: false }),
      password: t.arg.string({ required: false }),
      phone: t.arg.string({ required: false }),
      role: t.arg({ type: Role, required: false }),
    },
    resolve: async (query, _, args, context) => {
      const user = checkUserAuth(context);

      if (!user) {
        throw new GraphQLError('User ID is required');
      }

      const updatedUser = await prisma.user.update({
        ...query,
        where: { id: user.id },
        data: {
          firstName: args.firstName ?? undefined,
          lastName: args.lastName ?? undefined,
          email: args.email ?? undefined,
          emailVerified: args.emailVerified ?? undefined,
          password: args.password
            ? await bcryptjs.hash(args.password, 10)
            : undefined,
          phone: args.phone ?? undefined,
          role: args.role ?? undefined,
        },
      });

      return updatedUser;
    },
  }),
}));
