'use client';

import { NextPage } from 'next';
import { useQuery } from 'urql';
import {
  UserDataWithRelation,
  UsersDataTable,
} from '@/app/admin/customers/components/UserDataTable';
import {
  GetCustomersDocument,
  GetCustomersQuery,
  GetCustomersQueryVariables,
} from '@/graphql/generated';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Page: NextPage = () => {
  const [{ data, fetching, error }] = useQuery<
    GetCustomersQuery,
    GetCustomersQueryVariables
  >({ query: GetCustomersDocument });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        {fetching ? (
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        ) : error ? (
          <div className="p-4 text-red-500 border border-red-500 rounded-lg text-center">
            <p className="text-lg font-semibold">Error loading customers</p>
            <p className="text-sm">{error.message}</p>
          </div>
        ) : (
          <UsersDataTable data={data?.getUsers as UserDataWithRelation[]} />
        )}
      </CardContent>
    </Card>
  );
};

export default Page;
