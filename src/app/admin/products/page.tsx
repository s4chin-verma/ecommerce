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
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">JWL001</TableCell>
              <TableCell>Diamond Solitaire Ring</TableCell>
              <TableCell>Rings</TableCell>
              <TableCell className="text-right">$1,999.00</TableCell>
              <TableCell className="text-right">15</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">JWL002</TableCell>
              <TableCell>Pearl Necklace</TableCell>
              <TableCell>Necklaces</TableCell>
              <TableCell className="text-right">$299.00</TableCell>
              <TableCell className="text-right">28</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">JWL003</TableCell>
              <TableCell>Gold Hoop Earrings</TableCell>
              <TableCell>Earrings</TableCell>
              <TableCell className="text-right">$129.00</TableCell>
              <TableCell className="text-right">42</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">JWL004</TableCell>
              <TableCell>Silver Charm Bracelet</TableCell>
              <TableCell>Bracelets</TableCell>
              <TableCell className="text-right">$79.00</TableCell>
              <TableCell className="text-right">36</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">JWL005</TableCell>
              <TableCell>Sapphire Stud Earrings</TableCell>
              <TableCell>Earrings</TableCell>
              <TableCell className="text-right">$249.00</TableCell>
              <TableCell className="text-right">20</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Page;
