import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UserData,
  UsersDataTable,
} from '@/app/admin/customers/components/UserDataTable';
import { getUsers } from '@/app/admin/customers/action';
import { NextPage } from 'next';

const Page: NextPage = async () => {
  const users = await getUsers();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <UsersDataTable data={users as UserData[]} />
      </CardContent>
    </Card>
  );
};

export default Page;
