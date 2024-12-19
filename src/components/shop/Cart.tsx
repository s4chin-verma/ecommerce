'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

const initialCartItems = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    price: 1999.99,
    image: '/banner1.webp',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Pearl Necklace',
    price: 299.99,
    image: '/banner2.webp',
    quantity: 2,
  },
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    price: 1999.99,
    image: '/banner1.webp',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Pearl Necklace',
    price: 299.99,
    image: '/banner2.webp',
    quantity: 2,
  },
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    price: 1999.99,
    image: '/banner1.webp',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Pearl Necklace',
    price: 299.99,
    image: '/banner2.webp',
    quantity: 2,
  },
];

export function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const windowWidth = useWindowWidth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        {windowWidth !== undefined && windowWidth > 768 ? (
          <div className="flex items-center border border-gray-600 rounded-full cursor-pointer hover:bg-gray-100 transition-colors relative">
            <span className="mx-3">Cart {totalItems} items</span>
            <div className="rounded-full bg-gray-800 p-2 cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div className="h-6 w-6 rounded-full absolute -top-2 -right-2 bg-red-400 flex items-center justify-center">
              <span className="text-white">{totalItems}</span>
            </div>
          </div>
        ) : (
          <ShoppingCart />
        )}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[740px] ">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review and manage your selected items.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between">
          <ScrollArea className="h-[670px] ">
            <div className="flex flex-col space-y-4 my-4">
              {cartItems.map(item => (
                <Card key={item.id}>
                  <CardHeader className="flex flex-row gap-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-4">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        {/* <div className="absolute right-0 bottom-0"> */}
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
            <Button className="w-full">Proceed to Checkout</Button>
          </SheetClose>
        </SheetFooter>
        {/* </div> */}
      </SheetContent>
    </Sheet>
  );
}
