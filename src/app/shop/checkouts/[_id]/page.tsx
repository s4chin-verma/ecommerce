'use client';

import { use, useState } from 'react';
import { Search, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { indianStates } from '@/lib/content/state';
import { OrderSummary } from '../components/summary';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ _id: string }>;
  searchParams: Promise<{ quantity?: string }>;
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const _id = resolvedParams._id;
  const quantity = parseInt(resolvedSearchParams.quantity || '1');

  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [saveInformation, setSaveInformation] = useState(false);
  const [emailNews, setEmailNews] = useState(false);

  return (
    <main className="bg-gray-50">
      <section className="max-w-6xl mx-auto">
        <div className="min-h-scree">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Checkout Form */}
              <div className="md:col-span-2 space-y-8">
                {/* Contact Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <Button variant="link" className="text-blue-600">
                      Log in
                    </Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="Email or mobile phone number"
                    className="w-full"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailNews"
                      checked={emailNews}
                      onCheckedChange={checked =>
                        setEmailNews(checked as boolean)
                      }
                    />
                    <Label htmlFor="emailNews">
                      Email me with news and offers
                    </Label>
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Delivery</h2>
                  <Select defaultValue="US">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Country/Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First name (optional)" />
                    <Input placeholder="Last name" required />
                  </div>

                  <div className="relative">
                    <Input placeholder="Address" required />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  </div>

                  <Input placeholder="Apartment, suite, etc. (optional)" />

                  <div className="grid grid-cols-6 gap-4">
                    <Input placeholder="City" className="col-span-2" required />
                    <div className="col-span-2">
                      <Select defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map(state => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="ZIP code"
                      className="col-span-2"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={saveInformation}
                      onCheckedChange={checked =>
                        setSaveInformation(checked as boolean)
                      }
                    />
                    <Label htmlFor="saveInfo">
                      Save this information for next time
                    </Label>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Shipping method</h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600">
                      Enter your shipping address to view available shipping
                      methods.
                    </p>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Payment</h2>
                  <p className="text-sm text-gray-600">
                    All transactions are secure and encrypted.
                  </p>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit card
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Card number" type="text" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Expiration date (MM/YY)" />
                        <div className="relative">
                          <Input placeholder="Security code" />
                          <HelpCircle className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <Input placeholder="Name on card" />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="useShipping"
                          checked={useShippingAsBilling}
                          onCheckedChange={checked =>
                            setUseShippingAsBilling(checked as boolean)
                          }
                        />
                        <Label htmlFor="useShipping">
                          Use shipping address as billing address
                        </Label>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Pay now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg h-fit">
                <h1 className="font-semibold text-2xl mb-5 mt-1.5">
                  Order Item
                </h1>
                <OrderSummary _id={_id} quantity={quantity} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
