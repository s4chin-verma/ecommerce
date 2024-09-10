'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const contactSchema = z
  .object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z
      .string()
      .min(8, 'password must be at least 8 characters')
      .max(16, 'password can not be greater than 16 characters'),
    confirmPassword: z
      .string()
      .min(8, 'password must be at least 8 characters')
      .max(16, 'Confirm password can not be greater than 16 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The confirm passwords did not match with password',
        path: ['confirmPassword'],
      });
    }
  });

const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log('Form submitted:', data);
  };

  return (
    <main>
      <section className="mt-24 py-20">
        <h1 className="text-5xl font-bold text-center mb-8">Create Account</h1>
        <div className="max-w-6xl mx-auto px-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 border-2 border-black rounded-2xl p-6 bg-white text-gray-950 max-w-5xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4 md:gap-2">
                  <Checkbox />
                  <span className="text-xs md:text-sm">
                    I have read and agree to the{' '}
                    <Link
                      href="/term-conditions"
                      className="border-b-2 text-orange-600 hover:text-orange-900 hover:border-orange-500"
                    >
                      Terms &amp; Conditions.
                    </Link>
                  </span>
                </div>
                <Button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-black-600 rounded-3xl transition-all duration-300 hover:bg-orange-100 hover:shadow-lg hover:-translate-y-1 group"
                >
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default ContactForm;
