import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { createContext } from './context';
import { schema } from '@/graphql/schema';

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => await createContext({ req }),
});

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}

// export { handler as GET, handler as POST };

// import { gql } from 'graphql-tag';

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Typescript: req has the type NextRequest
// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//   context: async req => ({ req }),
// });

// export { handler as GET, handler as POST };

// import { ApolloServer } from '@apollo/server';
// import { startServerAndCreateNextHandler } from '@as-integrations/next';
// import { NextRequest } from 'next/server';
// import { createContext } from './context';
// import { schema } from '@/graphql/schema';

// const server = new ApolloServer({
//   schema,
// });

// const handler = startServerAndCreateNextHandler(server, {
//   context: async req => {
//     // Ensure req is of type NextRequest
//     const nextReq = req as unknown as NextRequest;
//     return await createContext({ req: nextReq });
//   },
// });

// export async function GET(req: NextRequest) {
//   return handler(req);
// }

// export async function POST(req: NextRequest) {
//   return handler(req);
// }
