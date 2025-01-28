'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  AlertCircle,
  Gem,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: Date;
  subtotal: number;
  status:
    | 'ORDERED'
    | 'CONFIRMED'
    | 'SHIPPED'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED';
  product: {
    name: string;
    image: string;
  }[];
}

interface OrderHistoryProps {
  orders?: Order[];
  isLoading?: boolean;
}

const getStatusIcon = (status: Order['status']) => {
  const icons = {
    ORDERED: <Clock className="h-4 w-4" />,
    CONFIRMED: <CheckCircle2 className="h-4 w-4" />,
    SHIPPED: <Package className="h-4 w-4" />,
    OUT_FOR_DELIVERY: <Truck className="h-4 w-4" />,
    DELIVERED: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    CANCELLED: <AlertCircle className="h-4 w-4 text-red-500" />,
  };
  return icons[status] || <Clock className="h-4 w-4" />;
};

export function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  console.log(orders);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent>
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 w-full mb-2" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {orders?.map(order => (
            <div
              key={order.id}
              className="flex items-center border rounded-lg p-3 space-x-4"
            >
              {order.product[0]?.image ? (
                <img
                  src={order.product[0].image}
                  alt={order.product[0].name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <Gem />
                </div>
              )}
              <div className="flex-grow">
                <p className="font-medium"># {order.orderNumber || '0001'}</p>
                <p className="font-medium">
                  {order.product[0]?.name || 'Product'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(order.orderDate)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-5">
                <p className="font-semibold">${order.subtotal.toFixed(2)}</p>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getStatusIcon(order.status)}
                  {order.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
