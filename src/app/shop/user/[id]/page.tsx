'use client';

import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from 'urql';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfo, UserData } from '../components/personal-info';
import { Order, OrderHistory } from '../components/orders';
import { AddressManagement } from '../components/address';
import { Address } from '@prisma/client';
import { use } from 'react';
import {
  GetAddressesByUserIdDocument,
  GetAddressesByUserIdQuery,
  GetAddressesByUserIdQueryVariables,
  GetOrderByUserIdDocument,
  GetOrderByUserIdQuery,
  GetOrderByUserIdQueryVariables,
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
} from '@/graphql/generated';

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { toast } = useToast();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [
    { data: userData, fetching: userFetching, error: userError },
    executeUserQuery,
  ] = useQuery<GetUserQuery, GetUserQueryVariables>({
    query: GetUserDocument,
    variables: { getUserId: id },
    pause: true,
  });

  const [
    { data: addressData, fetching: addressFetching, error: addressError },
    executeAddressQuery,
  ] = useQuery<GetAddressesByUserIdQuery, GetAddressesByUserIdQueryVariables>({
    query: GetAddressesByUserIdDocument,
    variables: { userId: id },
    pause: true,
  });

  const [
    { data: ordersData, fetching: ordersFetching, error: ordersError },
    executeOrdersQuery,
  ] = useQuery<GetOrderByUserIdQuery, GetOrderByUserIdQueryVariables>({
    query: GetOrderByUserIdDocument,
    variables: { userId: id },
    pause: true,
  });

  useEffect(() => {
    if (!id) return;
    if (userFetching) return;
    executeUserQuery();
    return;
  }, [id, userFetching, executeUserQuery]);

  useEffect(() => {
    if (userError) {
      toast({
        title: 'Error fetching user data',
        description: userError.message,
      });
    }
  }, [userError, toast]);

  useEffect(() => {
    if (addressError) {
      toast({
        title: 'Error fetching address data',
        description: addressError.message,
      });
    }
  }, [addressError, toast]);

  useEffect(() => {
    if (ordersError) {
      toast({
        title: 'Error fetching orders data',
        description: ordersError.message,
      });
    }
  }, [ordersError, toast]);

  const handleTabChange = (tab: string) => {
    if (tab === 'addresses' && !addressData && !addressFetching) {
      executeAddressQuery();
    }
    if (tab === 'orders' && !ordersData && !ordersFetching) {
      executeOrdersQuery();
    }
  };

  if (userFetching) {
    return (
      <main className="mx-auto pt-40 max-w-6xl px-3">
        <ProfileSkeleton />
      </main>
    );
  }
  const user = userData?.getUser;

  if (!userData) return;

  return (
    <main className="px-3 pt-40 pb-10 max-w-6xl mx-auto min-h-6xl">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-20 w-20 rounded-full bg-orange-50 flex items-center justify-center">
          <h3 className="text-xl  font-semibold">
            {user?.firstName?.[0]?.toUpperCase() ?? ''}
            {user?.lastName?.[0]?.toUpperCase() ?? ''}
          </h3>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <Tabs
        defaultValue="personal-info"
        className="space-y-4"
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <PersonalInfo user={user as UserData} />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressManagement
            addresses={addressData?.getAddressesByUserId as Address[]}
            isLoading={addressFetching}
            refetchAddresses={async () => {
              executeAddressQuery({
                requestPolicy: 'network-only',
              });
            }}
          />
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory
            orders={ordersData?.getOrderByUserId as Order[]}
            isLoading={ordersFetching}
            onRefresh={async () => {
              executeOrdersQuery({
                requestPolicy: 'network-only',
              });
            }}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
