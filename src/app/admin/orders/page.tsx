import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  OrdersDataTable,
  OrderWithRelations,
} from '@/app/admin/orders/components/OrdersDataTable';
import { getOrders } from './action';

export default async function Page() {
  const orders = await getOrders();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersDataTable data={orders as OrderWithRelations[]} />
      </CardContent>
    </Card>
  );
}
