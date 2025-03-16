import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Truck, Bell, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useQuery } from 'urql';
import {
  GetUserForCheckoutDocument,
  GetUserForCheckoutQuery,
  GetUserForCheckoutQueryVariables,
} from '@/graphql/generated';
import { LogoutDialog } from '@/components/LogoutDialog';
import { useCheckoutContext, CheckoutStep } from './utils';

export const AuthCheckout = () => {
  const { data: session, status } = useSession();
  const { markStepComplete } = useCheckoutContext();

  const [{ data, fetching }] = useQuery<
    GetUserForCheckoutQuery,
    GetUserForCheckoutQueryVariables
  >({
    query: GetUserForCheckoutDocument,
    variables: { userId: session?.user?.id as string },
    pause: status !== 'authenticated',
  });

  const handleCheckout = () => {
    markStepComplete(CheckoutStep.AUTH);
    console.log('Processing checkout for user:', data?.getUser);
  };

  const handleContinue = () => {
    console.log('Continuing with authentication');
  };

  return (
    <>
      <CardContent className="grid md:grid-cols-2 gap-8 pt-8">
        {/* Left Section */}
        {status === 'authenticated' ? (
          <div className="space-y-6">
            {fetching ? (
              <div>Loading user information...</div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-500">Name</span>
                    <span className="text-base font-medium">
                      {data?.getUser?.firstName} {data?.getUser?.lastName}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="text-base font-medium">
                      {data?.getUser?.phone}
                    </span>
                  </div>
                  <div>
                    <LogoutDialog>
                      <span className="text-sm group text-orange-500 hover:border-b-2 hover:border-orange-500 hover:cursor-pointer">
                        Logout & Sign in to another account
                      </span>
                    </LogoutDialog>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  PROCEED TO CHECKOUT
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <Input
              type="text"
              placeholder="Enter Email/Mobile number"
              className="w-full"
            />
            <div className="text-sm text-gray-600">
              By continuing, you agree to{' '}
              <Button variant="link" className="text-blue-600 p-0 h-auto">
                Terms of Use
              </Button>{' '}
              and{' '}
              <Button variant="link" className="text-blue-600 p-0 h-auto">
                Privacy Policy
              </Button>
              .
            </div>
            <Button
              onClick={handleContinue}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              CONTINUE
            </Button>
          </div>
        )}

        {/* Right Section */}
        <div className="space-y-6">
          <h3 className="text-lg text-gray-700">
            Advantages of our secure login
          </h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-center space-x-3">
              <Truck className="w-6 h-6 text-orange-600" />
              <span>Easily Track Orders, Hassle free Returns</span>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-orange-600" />
              <span>Get Relevant Alerts and Recommendation</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-orange-600" />
              <span>Wishlist, Reviews, Ratings and more.</span>
            </div>
          </div>
        </div>
      </CardContent>
      {status === 'authenticated' && !fetching && (
        <CardFooter className="text-xs">
          Please note that upon clicking &quot;Logout&quot; you will lose all
          items in cart and will be redirected to the home page.
        </CardFooter>
      )}
    </>
  );
};

export default AuthCheckout;
