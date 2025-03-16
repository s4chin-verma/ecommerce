'use server';

import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersDataTable } from './UserDataTable';

export async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      emailVerified: true,
      phone: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          orderHistory: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
}
// Page component that fetches data and renders the data table
export default async function CustomersPage() {
  const users = await getUsers();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <UsersDataTable data={users} />
      </CardContent>
    </Card>
  );
}
