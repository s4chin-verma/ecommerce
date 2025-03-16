'use client';

import { use } from 'react';
import { AuthCheckout } from '../components/auth-checkout';
import { DeliverySection } from '../components/delivery';
import { OffersSection } from '../components/offers';
import { PaymentSection } from '../components/payment';
import { OrderSummary } from '../components/summary';
import {
  CheckoutProvider,
  CheckoutSection,
  CheckoutStep,
} from '../components/utils';

const Page = ({
  params,
  searchParams,
}: {
  params: Promise<{ _id: string }>;
  searchParams: Promise<{ quantity?: string }>;
}) => {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const _id = resolvedParams._id;
  const quantity = parseInt(resolvedSearchParams.quantity || '1');

  return (
    <CheckoutProvider>
      <main className="bg-gray-50">
        <section className="max-w-6xl mx-auto">
          <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-5">
                  <CheckoutSection
                    step={CheckoutStep.AUTH}
                    stepNumber={1}
                    title="LOGIN OR SIGNUP"
                  >
                    <AuthCheckout />
                  </CheckoutSection>

                  <CheckoutSection
                    step={CheckoutStep.DELIVERY}
                    stepNumber={2}
                    title="DELIVERY ADDRESS"
                  >
                    <DeliverySection />
                  </CheckoutSection>

                  <CheckoutSection
                    step={CheckoutStep.OFFERS}
                    stepNumber={3}
                    title="OFFERS"
                  >
                    <OffersSection />
                  </CheckoutSection>

                  <CheckoutSection
                    step={CheckoutStep.PAYMENT}
                    stepNumber={4}
                    title="PAYMENT"
                  >
                    <PaymentSection />
                  </CheckoutSection>
                </div>

                <div>
                  <OrderSummary _id={_id} quantity={quantity} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </CheckoutProvider>
  );
};

export default Page;
