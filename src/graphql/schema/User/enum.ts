import { builder } from '../../builder';

export const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
  description: 'User Role',
});
