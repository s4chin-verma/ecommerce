'use client';

import React, { createContext, use, useContext, useState } from 'react';
import { AuthCheckout } from '../components/auth-checkout';
import { DeliverySection } from '../components/delivery';
import { OffersSection } from '../components/offers';
import { PaymentSection } from '../components/payment';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export enum CheckoutStep {
  AUTH = 'auth',
  DELIVERY = 'delivery',
  OFFERS = 'offers',
  PAYMENT = 'payment',
}

type StepStatus = {
  isCompleted: boolean;
  wasVisited: boolean;
};

type CheckoutContextType = {
  activeStep: CheckoutStep;
  setActiveStep: (step: CheckoutStep) => void;
  isStepComplete: (step: CheckoutStep) => boolean;
  markStepComplete: (step: CheckoutStep) => void;
  stepStatuses: Record<CheckoutStep, StepStatus>;
  handleStepChange: (step: CheckoutStep) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

const CheckoutSection = ({
  step,
  stepNumber,
  title,
  children,
}: {
  step: CheckoutStep;
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}) => {
  const { activeStep, isStepComplete, handleStepChange, stepStatuses } =
    useCheckoutContext();
  const isActive = activeStep === step;
  const isCompleted = isStepComplete(step);
  const wasVisited = stepStatuses[step].wasVisited;

  return (
    <Card
      className={cn(
        'border rounded-none transition-all duration-200',
        isActive ? 'bg-white' : 'bg-gray-50',
        wasVisited && !isActive && 'opacity-90'
      )}
    >
      <CardHeader
        className={cn(
          'border-b py-4',
          isActive ? 'bg-orange-50' : 'bg-gray-50',
          isCompleted && !isActive && 'bg-green-50'
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-5">
            <div
              className={cn(
                'w-7 h-7 rounded-sm flex items-center justify-center text-white',
                {
                  'bg-green-500': isCompleted,
                  'bg-orange-500': isActive,
                  'bg-gray-300': !isCompleted && !isActive,
                }
              )}
            >
              {stepNumber}
            </div>
            <h2
              className={cn(
                'text-base font-medium',
                isActive ? 'text-orange-600' : 'text-gray-600'
              )}
            >
              {title}
            </h2>
          </div>
          <div>
            {isCompleted && !isActive && (
              <Button
                className={cn(
                  'rounded-none border px-10',
                  'hover:bg-orange-50 hover:text-orange-700'
                )}
                variant="ghost"
                onClick={() => handleStepChange(step)}
              >
                <span className="text-sm font-medium text-orange-900">
                  CHANGE
                </span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      {isActive && <>{children}</>}
    </Card>
  );
};

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      'useCheckoutContext must be used within a CheckoutProvider'
    );
  }
  return context;
};

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeStep, setActiveStep] = useState<CheckoutStep>(CheckoutStep.AUTH);
  const [stepStatuses, setStepStatuses] = useState<
    Record<CheckoutStep, StepStatus>
  >({
    [CheckoutStep.AUTH]: { isCompleted: false, wasVisited: true },
    [CheckoutStep.DELIVERY]: { isCompleted: false, wasVisited: false },
    [CheckoutStep.OFFERS]: { isCompleted: false, wasVisited: false },
    [CheckoutStep.PAYMENT]: { isCompleted: false, wasVisited: false },
  });

  const markStepComplete = (step: CheckoutStep) => {
    setStepStatuses(prev => ({
      ...prev,
      [step]: { ...prev[step], isCompleted: true },
    }));

    const steps = Object.values(CheckoutStep);
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setActiveStep(nextStep);
      setStepStatuses(prev => ({
        ...prev,
        [nextStep]: { ...prev[nextStep], wasVisited: true },
      }));
    }
  };

  const handleStepChange = (step: CheckoutStep) => {
    setActiveStep(step);

    // Mark all steps up to this one as visited
    const steps = Object.values(CheckoutStep);
    const targetIndex = steps.indexOf(step);

    setStepStatuses(prev => {
      const newStatuses = { ...prev };
      steps.forEach((s, index) => {
        if (index <= targetIndex) {
          newStatuses[s] = { ...newStatuses[s], wasVisited: true };
        }
      });
      return newStatuses;
    });
  };

  const isStepComplete = (step: CheckoutStep) => stepStatuses[step].isCompleted;

  return (
    <CheckoutContext.Provider
      value={{
        activeStep,
        setActiveStep,
        isStepComplete,
        markStepComplete,
        stepStatuses,
        handleStepChange,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
// Main checkout page component
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

                {/* <OrderSummary _id={_id} quantity={quantity} /> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </CheckoutProvider>
  );
}
