'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import {
  CreateAddressDocument,
  CreateAddressMutation,
  CreateAddressMutationVariables,
  DeleteAddressDocument,
  DeleteAddressMutation,
  DeleteAddressMutationVariables,
} from '@/graphql/generated';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { indianStates } from '@/lib/content/state';
import {
  Plus,
  Pencil,
  X,
  Save,
  ArrowDownAZIcon,
  Trash2,
  MapPin,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Address } from '@prisma/client';
import { addressSchema } from '@/lib/schema/zod';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useMutation } from 'urql';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';

type AddressFormData = z.infer<typeof addressSchema>;

const AddressForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: {
  defaultValues?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
}) => {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
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
                <Select onValueChange={value => form.setValue('state', value)}>
                  <SelectTrigger
                    className={cn(
                      form.formState.errors.state && 'border-red-500'
                    )}
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state, index) => (
                      <SelectItem key={index} value={state}>
                        {state}
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

        <div className="flex space-x-4 ">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 gap-2"
          >
            <span>Save</span>
            <Save className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={onCancel}
          >
            <span>Cancel</span>
            <X className="h-6 w-6" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

const LoadingSkelton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div
              key={i}
              className="flex items-start justify-between border-b pb-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-8 w-[60px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface AddressesProps {
  addresses: Address[] | undefined;
  isLoading?: boolean;
  refetchAddresses: () => void;
}

export function AddressManagement({
  addresses,
  isLoading,
  refetchAddresses,
}: AddressesProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [editingAddressId, setEditingAddressId] = useState('');
  const [isEditingFormOpen, setIsEditingFormOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  const handleAddressSubmit = async (data: AddressFormData) => {
    setSelectedAddress(null);
  };

  const formatAddress = (address: Address) => {
    return `${address.addressLine}, ${address.landmark}, ${address.city}, ${address.state} ${address.postalCode}`;
  };

  const [_, createAddress] = useMutation<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddressDocument);

  const handleAddNewAddress = async (data: AddressFormData) => {
    try {
      const response = await createAddress({
        ...data,
      });
      if (response.error) toast(`${response.error}`);
      else {
        toast('New address added successfully');
        setIsNewFormOpen(false);
        refetchAddresses();
      }
    } catch (error) {
      toast('An unexpected error occurred. Please try again.');
    }
  };

  const [__, deleteAddress] = useMutation<
    DeleteAddressMutation,
    DeleteAddressMutationVariables
  >(DeleteAddressDocument);

  const handleDeleteAddress = async (id: string) => {
    try {
      const response = await deleteAddress({ deleteAddressId: id });
      if (response.error) toast(`${response.error}`);
      else toast('Address deleted successfully');
    } catch (error) {
      toast('An unexpected error occurred. Please try again.');
    }
  };

  if (isLoading) return <LoadingSkelton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
        <CardDescription>
          Manage your saved addresses for faster checkout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {addresses?.map(address => (
            <div key={address.id}>
              <div className="flex items-start justify-between pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-5">
                    <p className="font-medium">{address.name}</p>
                    <p>{address.phone}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatAddress(address)}
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAddress(address);
                      setEditingAddressId(address.id);
                      setIsEditingFormOpen(!isEditingFormOpen);
                    }}
                  >
                    {isEditingFormOpen === true &&
                    editingAddressId === address.id ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="ml-4">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Address</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this address? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          Delete
                        </Button>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {editingAddressId === address?.id && isEditingFormOpen && (
                <AddressForm
                  defaultValues={selectedAddress as AddressFormData}
                  onSubmit={handleAddressSubmit}
                  onCancel={() => {
                    setSelectedAddress(null);
                    setEditingAddressId('');
                    setIsEditingFormOpen(false);
                  }}
                />
              )}
            </div>
          ))}

          {addresses?.length === 0 && (
            <div className="text-center flex flex-col items-center gap-2">
              <MapPin className="w-10 h-10 text-gray-500" />
              <p className="text-gray-600">
                No saved addresses yet. Add one to make checkout easier!
              </p>
            </div>
          )}

          {isNewFormOpen ? (
            <div className="border-b pb-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                Fill the New Address Details below
              </h1>
              <ArrowDownAZIcon />
            </div>
          ) : (
            <Button className="w-full" onClick={() => setIsNewFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          )}

          {isNewFormOpen && (
            <AddressForm
              defaultValues={{
                name: '',
                phone: '',
                addressLine: '',
                landmark: '',
                city: '',
                state: '',
                postalCode: '',
                alternatePhone: '',
              }}
              onSubmit={handleAddNewAddress}
              onCancel={() => {
                setIsNewFormOpen(false);
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
