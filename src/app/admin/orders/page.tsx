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
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#3210</TableCell>
              <TableCell>Olivia Martin</TableCell>
              <TableCell>Diamond Necklace</TableCell>
              <TableCell className="text-right">$1,999.00</TableCell>
              <TableCell className="text-right">Shipped</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#3209</TableCell>
              <TableCell>Jackson Lee</TableCell>
              <TableCell>Gold Watch</TableCell>
              <TableCell className="text-right">$39.00</TableCell>
              <TableCell className="text-right">Pending</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#3208</TableCell>
              <TableCell>Isabella Nguyen</TableCell>
              <TableCell>Pearl Earrings</TableCell>
              <TableCell className="text-right">$299.00</TableCell>
              <TableCell className="text-right">Processing</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#3207</TableCell>
              <TableCell>William Kim</TableCell>
              <TableCell>Silver Bracelet</TableCell>
              <TableCell className="text-right">$99.00</TableCell>
              <TableCell className="text-right">Shipped</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#3206</TableCell>
              <TableCell>Sofia Davis</TableCell>
              <TableCell>Ruby Ring</TableCell>
              <TableCell className="text-right">$849.00</TableCell>
              <TableCell className="text-right">Delivered</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Page;
