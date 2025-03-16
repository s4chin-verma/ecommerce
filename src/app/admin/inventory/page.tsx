import { NextPage } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsDataTable } from '@/app/admin/inventory/components/ProductDataTable';
import prisma from '@/lib/prisma';

export async function getProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      sellingPrice: true,
      stock: true,
      totalSale: true,
      ratings: true,
      category: {
        select: {
          title: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

const Page: NextPage = async () => {
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
        <ProductsDataTable data={products} />
      </CardContent>
    </Card>
  );
};

export default Page;
