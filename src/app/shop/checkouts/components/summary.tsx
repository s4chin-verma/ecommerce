import React from 'react';
import Image from 'next/image';
import { useQuery } from 'urql';
import {
  GetProductForCheckOutDocument,
  GetProductForCheckOutQuery,
  GetProductForCheckOutQueryVariables,
} from '@/graphql/generated';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScanBarcodeIcon } from 'lucide-react';

interface OrderSummaryProps {
  _id: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string | null;
  description: string | null;
  images: string[];
  price: number | null;
  ratings: number | null;
  sellingPrice: number | null;
  stock: number | null;
  category: {
    title: string | null;
  } | null;
}

export const OrderSummarySkeleton = () => (
  <div className="space-y-4 p-6 border rounded-lg bg-white">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-16 w-16 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-[1px] w-full bg-gray-200" />
    <div className="space-y-3">
      <Skeleton className="h-6 w-1/3" />
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  </div>
);

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  _id,
  quantity,
}) => {
  const [{ data, fetching, error }] = useQuery<
    GetProductForCheckOutQuery,
    GetProductForCheckOutQueryVariables
  >({ query: GetProductForCheckOutDocument, variables: { productId: _id } });

  if (fetching) return <OrderSummarySkeleton />;
  if (error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading product details</p>
      </div>
    );

  const product = data?.getProduct as Product;
  const originalPrice = product.price || 0;
  const productName = product.name || 'United';
  const sellingPrice = product.sellingPrice || 0;
  const discount = originalPrice - sellingPrice;
  const subtotal = sellingPrice * quantity;
  const shippingFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + shippingFee;
  const stock = product.stock || 0;

  return (
    <Card className="rounded-none">
      <CardHeader className="bg-orange-50 py-4 border-b">
        <div className="flex items-center space-x-5">
          <ScanBarcodeIcon className="w-8-h-8" />
          <h2 className="text-base font-semibold ">ORDER SUMMARY</h2>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-5">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-md overflow-hidden border">
              <Image
                src={product.images[0]}
                alt={productName}
                fill
                className="object-cover"
              />
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
              {quantity}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-gray-900 mb-1">
              {productName?.length > 27
                ? `${productName.slice(0, 27)}...`
                : productName}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{product.category?.title}</p>
              <p className="font-medium text-gray-900">
                ₹{sellingPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Price Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Price</span>
              <span className="text-gray-900">₹{originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Selling Price</span>
              <span className="text-green-600">₹{sellingPrice.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="text-gray-900">{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Fee</span>
              <span
                className={
                  shippingFee === 0 ? 'text-green-600' : 'text-gray-900'
                }
              >
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-sm text-gray-500">INR</span>
                <span className="ml-1 text-lg font-semibold text-gray-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {stock < quantity && (
          <div className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm font-medium">
                Sorry, this product is out of stock
              </p>
            </div>
            {stock > 0 && (
              <div className="flex justify-between text-sm font-medium mt-1 text-green-600 bg-green-50 border border-green-400 rounded-md p-3">
                <span>Availability</span>
                <span>{stock} item</span>
              </div>
            )}
          </div>
        )}

        {shippingFee > 0 && (
          <p className="text-sm text-gray-500">
            Add ₹{(500 - subtotal).toFixed(2)} more to get free shipping
          </p>
        )}
      </CardContent>
    </Card>
  );
};
