'use client';

import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from 'urql';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PersonalInfo, UserData } from '../components/personal-info';
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
import { Order, OrderHistory } from '../components/orders';

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
    console.log(addressData);
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
        title: 'Error fetching address data',
        description: ordersError.message,
      });
    }
  }, [ordersError, toast]);

  const user = {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '/placeholder-avatar.jpg',
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'addresses' && !addressData && !addressFetching) {
      executeAddressQuery();
      console.log(addressData);
    }
    if (tab === 'orders' && !ordersData && !ordersFetching) {
      executeOrdersQuery();
      console.log(ordersData);
    }
  };

  if (userFetching) {
    return (
      <div className="mx-auto py-10 mt-32 max-w-6xl px-3">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!userData) return;

  return (
    <main className="px-3 pt-40 pb-10 max-w-6xl mx-auto min-h-6xl">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">
            {userData?.getUser?.firstName} {userData?.getUser?.lastName}
          </h2>
          <p className="text-muted-foreground">{userData?.getUser?.email}</p>
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
          <PersonalInfo data={userData as UserData} />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressManagement
            addresses={addressData?.getAddressesByUserId as Address[]}
            isLoading={addressFetching}
            onAddAddress={async data => {
              // Add your mutation logic here
              console.log('Adding address:', data);
            }}
            onUpdateAddress={async (id, data) => {
              // Add your mutation logic here
              console.log('Updating address:', id, data);
            }}
            onDeleteAddress={async id => {
              // Add your mutation logic here
              console.log('Deleting address:', id);
            }}
          />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory
            orders={ordersData?.getOrderByUserId as Order[]}
            isLoading={ordersFetching}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
