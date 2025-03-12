'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useMutation, useQuery } from 'urql';
import {
  DeleteCartItemDocument,
  DeleteCartItemMutation,
  DeleteCartItemMutationVariables,
  GetCartItemsDocument,
  GetCartItemsQuery,
  GetCartItemsQueryVariables,
  UpdateCartItemQuantityDocument,
  UpdateCartItemQuantityMutation,
  UpdateCartItemQuantityMutationVariables,
} from '@/graphql/generated';
import { CartItems } from '@/lib/interface';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [{ data, fetching, error }, reexecuteQuery] = useQuery<
    GetCartItemsQuery,
    GetCartItemsQueryVariables
  >({
    query: GetCartItemsDocument,
  });

  const [result, updateCartItemQuantity] = useMutation<
    UpdateCartItemQuantityMutation,
    UpdateCartItemQuantityMutationVariables
  >(UpdateCartItemQuantityDocument);

  const [_, deleteCartItem] = useMutation<
    DeleteCartItemMutation,
    DeleteCartItemMutationVariables
  >(DeleteCartItemDocument);

  const incrementCartItemQuantity = async (id: string) => {
    try {
      const response = await updateCartItemQuantity({
        cartItemId: id,
        change: +1,
      });
      if (response.error) toast.error(response.error.graphQLErrors[0].message);
    } catch (e) {
      console.error('Error updating cart item quantity');
    }
  };

  const decrementCartQuantity = async (id: string) => {
    try {
      const response = await updateCartItemQuantity({
        cartItemId: id,
        change: -1,
      });
      if (response.error) toast.error(response.error.graphQLErrors[0].message);
    } catch (e) {
      console.error('Error updating cart item quantity');
    }
  };

  const deleteItemFromCart = async (id: string) => {
    try {
      const response = await deleteCartItem({ cartItemId: id });
      if (response.error) toast.error(response.error.graphQLErrors[0].message);
      else toast.success('Item removed from Cart');
    } catch (e) {
      console.error('Error deleting cart item');
    }
  };

  const cartItemsList = (data?.getCartItems as CartItems[]) || [];

  const subtotal = cartItemsList?.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0
  );

  const estimatedTax = subtotal * 0.18;
  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto max-w-6xl px-3 py-8 pt-40">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="text-gray-900 font-bold text-xl">
          {cartItemsList.length} |{' '}
          {cartItemsList.length === 1 ? 'Item' : 'Items'}
        </div>
      </div>

      {fetching ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-700">Could not load your cart</p>
          <p className="text-gray-500 text-sm mt-2">Please try again later</p>
        </div>
      ) : cartItemsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg p-8">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/shop/collection">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <div className="space-y-4 mt-4">
              {cartItemsList.map(item => (
                <Card
                  key={item.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <CardContent className="flex flex-col md:flex-row p-2">
                    <div className="relative w-full md:w-40 h-48 md:h-40 flex-shrink-0">
                      <Image
                        src={
                          item.product.images[0] || '/api/placeholder/100/100'
                        }
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="pl-5 h-full space-y-8">
                      <div className="space-y-1.5">
                        <h3 className="font-semibold text-lg">
                          {item.product.name}
                        </h3>
                        <p className="text-base text-gray-800 mt-1">
                          {item.product.category.title}
                        </p>
                        <p className="text-gray-700 text-base">
                          &#8377; {item.product.sellingPrice.toFixed(2)}
                          {item.product.price !== item.product.sellingPrice && (
                            <span className="line-through ml-2 text-gray-400 text-sm">
                              &#8377; {item.product.price.toFixed(2)}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border rounded-full">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => decrementCartQuantity(item.id)}
                            disabled={item.quantity === 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => incrementCartItemQuantity(item.id)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        {item.quantity >= item.product.stock && (
                          <span className="ml-2 text-xs text-amber-600">
                            Max stock
                          </span>
                        )}

                        <div className="md:w-1/12 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deleteItemFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex items-center">
              <Link
                href="/shop"
                className="text-sm flex items-center text-gray-600 hover:text-black"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    &#8377;{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>&#8377;{shipping.toFixed(2)}</span>
                    )}
                  </span>
                </div>

                {subtotal < 500 && shipping > 0 && (
                  <div className="text-sm text-green-600 py-1">
                    Add &#8377;{(500 - subtotal).toFixed(2)} more to get free
                    shipping
                  </div>
                )}

                <div className="flex justify-between pt-3 border-t border-gray-200 text-lg font-bold">
                  <span>Total</span>
                  <span>&#8377;{total.toFixed(2)}</span>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  * GST will be calculated at checkout
                </div>
              </div>

              <Link href="/shop/checkouts/">
                <Button
                  className="w-full mt-6"
                  size="lg"
                  disabled={cartItemsList.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>We accept:</span>
                  <span className="font-medium">UPI, Cards, NetBanking</span>
                </div>

                <div className="text-xs text-center text-gray-500">
                  <p>Free returns within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
