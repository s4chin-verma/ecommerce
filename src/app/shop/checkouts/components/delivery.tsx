import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { indianStates } from '@/lib/content/state';
import {
  GetAddressesByUserIdDocument,
  GetAddressesByUserIdQuery,
  GetAddressesByUserIdQueryVariables,
} from '@/graphql/generated';
import { useQuery } from 'urql';
import { useSession } from 'next-auth/react';
import { useCheckoutContext, CheckoutStep } from '../[_id]/page';
import { cn } from '@/lib/utils';
import { Address } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const addressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number should be exactly 10 digits'),
  postalCode: z.string().regex(/^\d{6}$/, 'Invalid ZIP code'),
  addressLine: z.string().min(5, 'Address is required'),
  landmark: z.string().min(2, 'Landmark is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  alternatePhone: z.string().optional(),
  saveAddress: z.boolean().default(false),
});

type AddressFormData = z.infer<typeof addressSchema>;

export const DeliverySection = () => {
  const { data: session, status } = useSession();
  const { markStepComplete } = useCheckoutContext();
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [{ data, fetching }] = useQuery<
    GetAddressesByUserIdQuery,
    GetAddressesByUserIdQueryVariables
  >({
    query: GetAddressesByUserIdDocument,
    variables: { userId: session?.user?.id as string },
    pause: status !== 'authenticated',
  });

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      phone: '',
      postalCode: '',
      addressLine: '',
      landmark: '',
      city: '',
      state: '',
      alternatePhone: '',
      saveAddress: false,
    },
  });

  const formatAddress = (address: Address) => {
    return `${address.addressLine}, ${address.landmark}, ${address.city}, ${address.state} ${address.postalCode}`;
  };

  const onSubmit = async (data: AddressFormData) => {
    console.log('her is data', data);

    // markStepComplete(CheckoutStep.DELIVERY);
  };

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
    setShowNewAddressForm(false);
    markStepComplete(CheckoutStep.DELIVERY);
  };

  if (fetching) {
    return <div className="p-4">Loading addresses...</div>;
  }
  const addresses = data?.getAddressesByUserId;

  return (
    <CardContent className="space-y-6 pt-4">
      {addresses && addresses.length > 0 && !showNewAddressForm && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Saved Addresses</h2>
          <div className="space-y-3">
            {addresses.map(address => (
              <div
                key={address.id}
                className={cn(
                  'p-4 border rounded-lg cursor-pointer transition-all',
                  selectedAddressId === address.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'hover:border-orange-300'
                )}
                onClick={() => handleAddressSelection(address.id as string)}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={selectedAddressId === address.id}
                    className="mt-1 rounded-full"
                  />
                  <div>
                    <div className="flex space-x-4 mb-1">
                      <h3 className="font-medium">{address.name}</h3>
                      <h2 className="text-base font-medium">{address.phone}</h2>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatAddress(address as Address)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!showNewAddressForm && (
        <Button
          variant="outline"
          onClick={() => setShowNewAddressForm(true)}
          className="w-full bg-orange-50 border-orange-500 rounded-none"
        >
          + Add New Address
        </Button>
      )}

      {showNewAddressForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Robert Downy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="63XXXXXX18" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="302033" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3  gap-3">
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark</FormLabel>
                    <FormControl>
                      <Input placeholder="XYZ Nagar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Jaipur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={value => form.setValue('state', value)}
                    >
                      <SelectTrigger
                        className={cn(
                          form.formState.errors.state && 'border-red-500'
                        )}
                      >
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map(state => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="302033" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alternatePhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="99XXXXXX33 (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="saveAddress"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Save this address for future deliveries</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
              >
                Save & Deliver Here
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewAddressForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </CardContent>
  );
};
