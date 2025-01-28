'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Package,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  MapPin,
  Receipt,
  Phone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface OrderProduct {
  id: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: Date;
  deliveryTime?: Date | null;
  userName: string;
  // userEmail: string;
  userPhone: string;
  paid: boolean;
  deliveryAddress: {
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryFee: number;
  serviceFee: number;
  status:
    | 'ORDERED'
    | 'CONFIRMED'
    | 'SHIPPED'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED';
  note?: string | null;
  discount?: number | null;
  total: number;
  OrderProduct: OrderProduct[] | [];
}

interface OrderHistoryProps {
  orders?: Order[];
  isLoading?: boolean;
}

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'ORDERED':
      return <Clock className="h-5 w-5" />;
    case 'CONFIRMED':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'SHIPPED':
      return <Package className="h-5 w-5" />;
    case 'OUT_FOR_DELIVERY':
      return <Truck className="h-5 w-5" />;
    case 'DELIVERED':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'CANCELLED':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'ORDERED':
      return 'bg-yellow-100 text-yellow-800';
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-800';
    case 'SHIPPED':
      return 'bg-purple-100 text-purple-800';
    case 'OUT_FOR_DELIVERY':
      return 'bg-indigo-100 text-indigo-800';
    case 'DELIVERED':
      return 'bg-green-100 text-green-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4"
              >
                <Skeleton className="h-16 w-[300px]" />
                <Skeleton className="h-16 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Order History
        </CardTitle>
        <CardDescription>
          View your past orders and track their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders?.map(order => (
            <Dialog key={order.id}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <p className="font-medium">Order #{order.orderNumber}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.orderDate)}
                    </p>
                    <Badge className={`mt-2 ${getStatusColor(order.status)}`}>
                      {/* {order.status.replace('_', ' ')} */}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* {order.OrderProduct.length} items */}0
                    </p>
                    <ChevronRight className="h-5 w-5 inline-block ml-2" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {/* {order.status.replace('_', ' ')} */}
                      {order.status}
                    </Badge>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="items">
                      <AccordionTrigger>Order Items</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {/* {order.OrderProduct.map(item => (
                            <div
                              key={item.id}
                              className="flex justify-between py-2"
                            >
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))} */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="delivery">
                      <AccordionTrigger>Delivery Information</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 mt-1" />
                            <div>
                              <p className="font-medium">Delivery Address</p>
                              <p className="text-sm text-muted-foreground">
                                {order.deliveryAddress.addressLine1}
                                {order.deliveryAddress.addressLine2 &&
                                  `, ${order.deliveryAddress.addressLine2}`}
                                <br />
                                {order.deliveryAddress.city},{' '}
                                {order.deliveryAddress.state}{' '}
                                {order.deliveryAddress.postalCode}
                                <br />
                                {order.deliveryAddress.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            <p className="text-sm">{order.userPhone}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="payment">
                      <AccordionTrigger>Payment Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>
                              $
                              {(
                                order.total -
                                order.deliveryFee -
                                order.serviceFee +
                                (order.discount || 0)
                              ).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p>Delivery Fee</p>
                            <p>${order.deliveryFee.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between">
                            <p>Service Fee</p>
                            <p>${order.serviceFee.toFixed(2)}</p>
                          </div>
                          {order.discount && (
                            <div className="flex justify-between text-green-600">
                              <p>Discount</p>
                              <p>-${order.discount.toFixed(2)}</p>
                            </div>
                          )}
                          <div className="flex justify-between font-bold border-t pt-2">
                            <p>Total</p>
                            <p>${order.total.toFixed(2)}</p>
                          </div>
                          <div className="mt-2">
                            <Badge
                              variant={order.paid ? 'default' : 'destructive'}
                            >
                              {order.paid ? 'Paid' : 'Payment Pending'}
                            </Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {order.note && (
                    <div className="border-t pt-4">
                      <p className="font-medium">Order Notes:</p>
                      <p className="text-sm text-muted-foreground">
                        {order.note}
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
