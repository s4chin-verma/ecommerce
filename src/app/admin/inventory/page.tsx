import { NextPage } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsDataTable } from '@/app/admin/inventory/components/ProductDataTable';

import { getProducts } from './action';

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
