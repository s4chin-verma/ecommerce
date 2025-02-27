import { GraphQLError } from 'graphql';

export const checkUserAuth = (context: any) => {
  if (
    !context.user ||
    (context.user.role !== 'USER' && context.user.role !== 'ADMIN')
  )
    throw new GraphQLError('You are not authorized to perform this action');
  return context.user;
};
