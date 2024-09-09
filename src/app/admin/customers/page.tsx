import { NextPage } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Page: NextPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="text-right">Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#1001</TableCell>
              <TableCell>Olivia Martin</TableCell>
              <TableCell>olivia.martin@email.com</TableCell>
              <TableCell className="text-right">$3,249.00</TableCell>
              <TableCell className="text-right">2023-06-15</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1002</TableCell>
              <TableCell>Jackson Lee</TableCell>
              <TableCell>jackson.lee@email.com</TableCell>
              <TableCell className="text-right">$839.00</TableCell>
              <TableCell className="text-right">2023-06-10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1003</TableCell>
              <TableCell>Isabella Nguyen</TableCell>
              <TableCell>isabella.nguyen@email.com</TableCell>
              <TableCell className="text-right">$1,599.00</TableCell>
              <TableCell className="text-right">2023-06-09</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1004</TableCell>
              <TableCell>William Kim</TableCell>
              <TableCell>william.kim@email.com</TableCell>
              <TableCell className="text-right">$499.00</TableCell>
              <TableCell className="text-right">2023-06-05</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#1005</TableCell>
              <TableCell>Sofia Davis</TableCell>
              <TableCell>sofia.davis@email.com</TableCell>
              <TableCell className="text-right">$2,099.00</TableCell>
              <TableCell className="text-right">2023-06-02</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Page;
