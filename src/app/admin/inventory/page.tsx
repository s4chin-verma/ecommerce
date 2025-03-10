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
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sellingPrice: number | null;
  stock: number;
  totalSale: number;
  category: {
    title: string;
  };
};

const Page: NextPage = async () => {
  async function getProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        sellingPrice: true,
        stock: true,
        totalSale: true,
        category: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
  }

  const products = await getProducts();

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Products</CardTitle>
        <Link href="/admin/inventory/create">
          <Button size="sm" className="gap-2">
            Add Product
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Selling Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Total Sale</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="capitalize">{product.name}</TableCell>
                <TableCell className="capitalize">
                  {product.category.title}
                </TableCell>
                <TableCell className="text-right">
                  &#8377;{product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  &#8377;{product.sellingPrice?.toFixed(2) || 0}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-right">
                  {product.totalSale}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/inventory/edit/${product.id}`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Page;
