'use client';

import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from '@urql/next';
import React, { useMemo } from 'react';
import { Toaster } from '@/components/ui/toaster';

type Props = {
  children: React.ReactNode;
  graphqlApiKey: string;
};

const GraphqlProvider = ({ children, graphqlApiKey }: Props) => {
  const [client, ssr] = useMemo(() => {
    const graphql_api = process.env.NEXT_PUBLIC_GRAPHQL_API as string;
    const ssr = ssrExchange();
    const client = createClient({
      url: graphql_api,
      exchanges: [cacheExchange, ssr, fetchExchange],
      // disable this in development for you to be able to access your sandbox

      fetchOptions: () => {
        const apiKey = graphqlApiKey;

        return {
          headers: { authorization: apiKey ? `Bearer ${apiKey}` : '' },
        };
      },
    });
    return [client, ssr];
  }, [graphqlApiKey]);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <Toaster />
      {children}
    </UrqlProvider>
  );
};

export { GraphqlProvider };
