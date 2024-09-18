import { createContext } from '@/app/api/graphql/context';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import RelayPlugin from '@pothos/plugin-relay';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import prisma from '../lib/prisma';

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Awaited<ReturnType<typeof createContext>>;
  Scalars: {
    DateTime: { Input: Date; Output: Date };
    JSON: {
      Input: any;
      Output: any;
    };
  };
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: { client: prisma },
  relayOptions: {},
});

builder.queryType({});
builder.mutationType({});

builder.addScalarType('DateTime', DateTimeResolver, {});
builder.addScalarType('JSON', JSONResolver, {});
