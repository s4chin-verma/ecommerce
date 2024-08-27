'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { CategoryLink } from './home/ui';
import Link from 'next/link';

const contactSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      description: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log('Form submitted:', data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 border-black rounded-2xl p-6 bg-white text-gray-950"
      >
        <div className="flex gap-4">
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
        <div className="flex gap-4">
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your message here..."
                  {...field}
                  className="h-36"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">
              I have read and agree to the{' '}
              <Link
                href="/term-conditions"
                className="border-b-2 text-orange-600 hover:text-orange-900 hover:border-orange-500"
              >
                Terms &amp; Conditions.
              </Link>
            </span>
          </div>
          <CategoryLink href="#" className="text-sm">
            Send Message
          </CategoryLink>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
