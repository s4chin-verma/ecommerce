'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
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

export function Cart() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [{ data, fetching, error }] = useQuery<
    GetCartItemsQuery,
    GetCartItemsQueryVariables
  >({
    query: GetCartItemsDocument,
    pause: !open,
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
      else toast.success('Item removed form Cart');
    } catch (e) {
      console.error('Error deleting cart item');
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    console.log('removing item');
    setCartItems(items => items.filter(item => item.id !== id));
  };

  useEffect(() => {
    setTotalItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems, open]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.sellingPrice * item.quantity,
    0
  );

  const cartItemsList = (data?.getCartItems as CartItems[]) || [];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="hidden md:flex items-center border border-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <span className="mx-3">Cart</span>
            <div className="rounded-full bg-gray-800 p-2">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="block md:hidden">
            <ShoppingCart className="h-6 w-6" />
          </div>

          <div className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white font-medium">
            {totalItems}
          </div>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[740px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review and manage your selected items.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col justify-between">
          {fetching ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
              <p className="text-gray-500">Loading your cart...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-red-500 mb-4">⚠️</div>
              <p className="text-gray-700">Could not load your cart</p>
              <p className="text-gray-500 text-sm mt-2">
                Please try again later
              </p>
            </div>
          ) : cartItemsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="flex flex-col space-y-4 my-4">
                {cartItemsList.map(item => (
                  <Card key={item.id}>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="relative w-16 h-16">
                        <Image
                          src={
                            item.product.images[0] || '/api/placeholder/100/100'
                          }
                          alt={item.product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-700">
                          &#8377; {item.product.sellingPrice.toFixed(2)}
                          {item.product.price !== item.product.sellingPrice && (
                            <span className="line-through ml-2 text-gray-400">
                              &#8377; {item.product.price.toFixed(2)}
                            </span>
                          )}
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {item.product.category.title}
                        </p>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrementCartQuantity(item.id)}
                          disabled={item.quantity === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => incrementCartItemQuantity(item.id)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        {item.quantity >= item.product.stock && (
                          <span className="ml-2 text-xs text-amber-600">
                            Max stock
                          </span>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteItemFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Shipping:</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button className="w-full" disabled={cartItemsList.length === 0}>
              Proceed to Checkout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
