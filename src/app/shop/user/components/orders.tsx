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
  RefreshCcwDot,
  ShoppingBag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
  onRefresh?: () => Promise<void>;
}

export const getStatusIcon = (status: Order['status']) => {
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

export function OrderHistory({
  orders,
  isLoading,
  onRefresh,
}: OrderHistoryProps) {
  const router = useRouter();

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const handleRefresh = async () => {
    if (!onRefresh) return;
    try {
      await onRefresh();
    } catch {}
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
      <p className="text-muted-foreground mb-4">
        Start shopping to create your first order
      </p>
      <Button onClick={() => router.push('/shop')}>Browse Products</Button>
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCcwDot className={isLoading ? 'animate-spin' : ''} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh Orders</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : !orders?.length ? (
          <EmptyState />
        ) : (
          <div className="space-y-2">
            {orders.map(order => (
              <div
                key={order.id}
                className="flex items-center border rounded-lg p-3 space-x-4"
              >
                {order.product[0]?.image ? (
                  <Image
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
        )}
      </CardContent>
    </Card>
  );
}
