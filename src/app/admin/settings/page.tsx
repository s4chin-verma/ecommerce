'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, MapPin, Package, User } from 'lucide-react';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '/placeholder-avatar.jpg',
  });

  const orders = [
    { id: '1234', date: '2023-05-01', status: 'Delivered', total: '$120.00' },
    { id: '5678', date: '2023-06-15', status: 'Shipped', total: '$85.50' },
    { id: '9012', date: '2023-07-20', status: 'Processing', total: '$200.00' },
  ];

  const addresses = [
    { id: '1', type: 'Home', address: '123 Main St, Anytown, AT 12345' },
    { id: '2', type: 'Work', address: '456 Office Blvd, Workville, WV 67890' },
  ];

  const paymentMethods = [
    { id: '1', type: 'Visa', last4: '1234', expiry: '12/24' },
    { id: '2', type: 'Mastercard', last4: '5678', expiry: '09/25' },
  ];

  return (
    <div className="mx-auto py-10 mt-32 max-w-6xl px-3">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="personal-info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          order.status === 'Delivered'
                            ? 'text-green-600'
                            : 'text-blue-600'
                        }`}
                      >
                        {order.status}
                      </p>
                      <p className="text-sm">{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>
                Manage your saved addresses for faster checkout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.map(address => (
                  <div
                    key={address.id}
                    className="flex items-start justify-between border-b pb-4"
                  >
                    <div>
                      <p className="font-medium">{address.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.address}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
                <Button className="w-full">
                  <MapPin className="mr-2 h-4 w-4" /> Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-6 w-6" />
                      <div>
                        <p className="font-medium">
                          {method.type} ending in {method.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" /> Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
