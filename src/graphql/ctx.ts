import { GraphQLError } from 'graphql';

export const checkUserAuth = (context: any) => {
  if (
    !context.user ||
    (context.user.role !== 'USER' && context.user.role !== 'ADMIN')
  )
    throw new GraphQLError('UNAUTHENTICATED');
  return context.user;
};

export const checkAdminAuth = (context: any) => {
  if (context.user && context.user.role !== 'ADMIN')
    throw new GraphQLError('You are not authorized to perform this action');
  return context.user;
};

export const checkUserOrAdminAuth = (context: any) => {
  if (!context.user) throw new GraphQLError('You must be logged in');
  return context.user;
};
