import { createYoga, createSchema } from 'graphql-yoga';
import { builder } from '@/graphql/builder';

// Assuming 'builder.toSchema()' correctly returns a GraphQL schema
// const schema = builder.toSchema({});

const { handleRequest } = createYoga({
  schema: builder.toSchema(),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
