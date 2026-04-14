import { GraphQLError } from 'graphql';

export function assertAffected(
  count: number,
  message = 'Resource not found',
  code = 'NOT_FOUND',
) {
  if (count === 0) {
    throw new GraphQLError(message, {
      extensions: { code },
    });
  }
}