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
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Pencil, Save } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation } from 'urql';
import {
  UpdateUserEmailDocument,
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables,
  UpdateUserFullNameDocument,
  UpdateUserFullNameMutation,
  UpdateUserFullNameMutationVariables,
  UpdateUserPhoneDocument,
  UpdateUserPhoneMutation,
  UpdateUserPhoneMutationVariables,
} from '@/graphql/generated';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

export interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface PersonalInfoProps {
  user: UserData | null;
}

export const PersonalInfo = ({ user }: PersonalInfoProps) => {
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const [_, updateUserFullName] = useMutation<
    UpdateUserFullNameMutation,
    UpdateUserFullNameMutationVariables
  >(UpdateUserFullNameDocument);

  const handleNameChange = async (data: UserData) => {
    try {
      const response = await updateUserFullName({
        firstName: data.firstName as string,
        lastName: data.lastName as string,
      });
      console.log(response);
      if (response.error) {
        toast({
          title: 'Error',
          description: `${response.error}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Name updated successfully!',
        });
        setEditingName(false);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const [__, updateUserEmail] = useMutation<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >(UpdateUserEmailDocument);

  const handleEmailChange = async (data: UserData) => {
    try {
      const response = await updateUserEmail({
        email: data.email as string,
      });
      if (response.error) {
        toast({
          title: 'Error',
          description: `${response.error}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Email updated successfully!',
        });
        setEditingEmail(!editingEmail);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const [___, updateUserPhone] = useMutation<
    UpdateUserPhoneMutation,
    UpdateUserPhoneMutationVariables
  >(UpdateUserPhoneDocument);

  const handlePhoneChange = async (data: UserData) => {
    try {
      const response = await updateUserPhone({
        phone: data.phone as string,
      });
      if (response.error) {
        toast({
          title: 'Error',
          description: `${response.error}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Phone Number updated successfully!',
        });
        setEditingPhone(!editingPhone);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleNameChange)}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <FormLabel className="flex items-center justify-between">
                    <h2 className="">Full Name</h2>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingName(!editingName)}
                      className="gap-2 items-center text-orange-700"
                    >
                      <span>Edit</span>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} disabled={!editingName} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} disabled={!editingName} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {editingName && (
                    <div className="flex justify-end">
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Update Name
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </Form>

            <Separator />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEmailChange)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between">
                        <span>Email</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingEmail(!editingEmail)}
                          className="gap-2 text-orange-700"
                        >
                          <span>Edit</span>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={!editingEmail}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {editingEmail && (
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-2">
                      <span>Update Email</span>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </form>
            </Form>

            <Separator />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePhoneChange)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center">
                        <span>Phone Number</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPhone(!editingPhone)}
                          className="gap-2 text-orange-700"
                        >
                          <span>Edit</span>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" disabled={!editingPhone} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {editingPhone && (
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-2">
                      <span>Update Phone</span>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
