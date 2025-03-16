import React, { useCallback, useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { ArrowDownNarrowWideIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCheckoutContext, CheckoutStep } from './utils';

export const OffersSection = () => {
  const { markStepComplete } = useCheckoutContext();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponStatus, setCouponStatus] = useState<'success' | 'error' | null>(
    null
  );

  const availableOffers = [
    {
      id: 1,
      code: 'WELCOME10',
      description: '10% off your first order',
      discount: '10%',
    },
    {
      id: 2,
      code: 'FREESHIP',
      description: 'Free shipping on orders over $50',
      discount: 'Free Shipping',
    },
    {
      id: 3,
      code: 'SUMMER25',
      description: '25% off summer collection',
      discount: '25%',
    },
  ];

  const validateCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage('Please enter a coupon code');
      setCouponStatus('error');
      return;
    }

    const foundCoupon = availableOffers.find(
      offer => offer.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (foundCoupon) {
      setCouponMessage(
        `Coupon "${foundCoupon.code}" applied successfully! ${foundCoupon.description}`
      );
      setCouponStatus('success');
    } else {
      setCouponMessage('Invalid coupon code. Please try again.');
      setCouponStatus('error');
    }
  };

  return (
    <CardContent className="space-y-5">
      <div className="pt-4">
        <h2 className="text-xl font-semibold text-orange-800">
          Available Offers
        </h2>
      </div>
      <div className="">
        {availableOffers.length > 0 ? (
          <ul className="space-y-4">
            {availableOffers.map(offer => (
              <li
                key={offer.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{offer.description}</p>
                  <p className="text-sm text-gray-500">
                    Use code:{' '}
                    <span className="text-orange-600 font-medium">
                      {offer.code}
                    </span>
                  </p>
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {offer.discount}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No active offers at the moment.</p>
        )}
      </div>
      <div className="pb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-orange-800">Apply Coupon</h2>
        <ArrowDownNarrowWideIcon className="text-orange-800" />
      </div>

      <div className="space-y-4">
        <div className="flex space-x-5">
          <input
            type="text"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="px-4 py-2 border rounded-lg flex-1 focus:ring-1 focus:ring-orange-500 focus:outline-none"
          />
          <Button
            onClick={validateCoupon}
            variant="ghost"
            type="submit"
            className="border text-orange-800 bg-orange-50 hover:bg-orange-100 font-bold rounded-none transition duration-200"
          >
            APPLY
          </Button>
        </div>

        {couponMessage && (
          <div
            className={`p-3 rounded-lg ${
              couponStatus === 'success'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {couponMessage}
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>* Coupons cannot be combined with other offers</p>
          <p>* Some restrictions may apply</p>
        </div>
      </div>
      <Button
        className="border text-orange-800 bg-orange-50 hover:bg-orange-100 font-bold rounded-none transition duration-200 w-full flex items-center space-x-1"
        onClick={() => markStepComplete(CheckoutStep.OFFERS)}
      >
        <span className="text-base">SKIP</span>
        <X />
      </Button>
    </CardContent>
  );
};
