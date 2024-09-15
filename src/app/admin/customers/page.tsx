import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';

type UserWithAddress = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: {
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
  }[];
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getUsers(): Promise<UserWithAddress[]> {
  await delay(3000);

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: {
        select: {
          addressLine1: true,
          city: true,
          state: true,
          postalCode: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });
}

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>Recent Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SR. No</TableHead>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.address.length > 0
                      ? `${user.address[0].addressLine1}, ${user.address[0].city}, ${user.address[0].state} ${user.address[0].postalCode}`
                      : 'No address provided'}
                  </TableCell>
                  <TableCell>{user.phone || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
