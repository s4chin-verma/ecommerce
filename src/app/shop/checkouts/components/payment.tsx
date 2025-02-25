import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, HelpCircle, LockIcon } from 'lucide-react';

export const PaymentSection = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  return (
    <>
      <CardContent className="py-6">
        <div className="space-y-6">
          <div className="flex items-center text-sm">
            <LockIcon className="h-4 w-4 mr-2 text-gray-500" />
            <p className="text-gray-600">
              All transactions are secure and encrypted
            </p>
          </div>

          <RadioGroup
            defaultValue="card"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div
              className={`border p-4 rounded-lg ${
                paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center cursor-pointer"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span className="font-medium">Credit / Debit Card</span>
                </Label>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-4 pl-6">
                  <Input placeholder="Card number" type="text" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Expiration date (MM/YY)" />
                    <div className="relative">
                      <Input placeholder="Security code (CVC)" />
                      <HelpCircle className="absolute right-3 top-3 h-4 w-4 text-gray-400 cursor-help" />
                    </div>
                  </div>
                  <Input placeholder="Name on card" />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="useShipping"
                      checked={useShippingAsBilling}
                      onCheckedChange={checked =>
                        setUseShippingAsBilling(!!checked)
                      }
                    />
                    <Label
                      htmlFor="useShipping"
                      className="text-sm cursor-pointer"
                    >
                      Use shipping address as billing address
                    </Label>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`border p-4 rounded-lg ${
                paymentMethod === 'paypal'
                  ? 'border-orange-500 bg-orange-50'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label
                  htmlFor="paypal"
                  className="flex items-center cursor-pointer"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1 6.84C19.811 4.315 17.796 3.009 15.226 3H7.21C6.832 3 6.49 3.244 6.392 3.615L3.318 17.356C3.242 17.646 3.463 17.918 3.76 17.918H7.101L7.733 14.27C7.773 14.07 7.919 13.991 8.077 13.991H10.227C13.525 13.991 15.818 12.339 16.533 8.639C16.822 7.123 16.635 5.914 15.773 5.146C15.611 5.001 15.424 4.886 15.226 4.8"
                      fill="#002C8A"
                    />
                    <path
                      d="M16.748 9.6C16.01 13.3 13.716 14.952 10.42 14.952H8.27L7.639 18.6H5.357C5.06 18.6 4.838 18.327 4.914 18.039L7.99 4.298C8.087 3.927 8.428 3.682 8.806 3.682H16.825C18.109 3.682 19.12 4.044 19.776 4.787C19.973 4.873 20.16 4.987 20.323 5.133C21.185 5.9 21.372 7.11 21.083 8.626C20.97 8.962 20.872 9.284 20.734 9.6H16.748Z"
                      fill="#0085FF"
                    />
                    <path
                      d="M8.806 3.682C8.428 3.682 8.087 3.927 7.99 4.298L4.915 18.039C4.838 18.327 5.06 18.6 5.358 18.6H7.639L8.27 14.952H10.42C13.716 14.952 16.01 13.3 16.748 9.6H20.736C20.871 9.284 20.967 8.962 21.08 8.626C21.372 7.11 21.185 5.9 20.32 5.133C20.157 4.987 19.97 4.873 19.773 4.787C19.475 4.334 19.07 4.032 18.585 3.854C18.017 3.737 17.414 3.682 16.825 3.682H8.806Z"
                      fill="#00186A"
                    />
                  </svg>
                  <span className="font-medium">PayPal</span>
                </Label>
              </div>

              {paymentMethod === 'paypal' && (
                <div className="mt-4 pl-6">
                  <p className="text-sm text-gray-600">
                    You will be redirected to PayPal to complete your purchase
                    securely.
                  </p>
                </div>
              )}
            </div>
          </RadioGroup>
        </div>
      </CardContent>

      <CardFooter className="border-t p-6 flex flex-row">
        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-6">
          Complete Payment
        </Button>
        {/* <div className="w-full text-center mt-4 text-xs text-gray-500">
          By completing your purchase, you agree to our Terms of Service and
          Privacy Policy
        </div> */}
      </CardFooter>
    </>
  );
};
