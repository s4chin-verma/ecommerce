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
import { LogIn } from 'lucide-react';
import Link from 'next/link';

const contactSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log('Form submitted:', data);
  };

  return (
    <main>
      <section className="mt-44 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          Already Registered?
        </h1>
        <div className="max-w-6xl mx-auto px-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 border-2 border-black rounded-2xl p-6 bg-white text-gray-950 max-w-4xl mx-auto"
            >
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
                name="password"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4 md:gap-2">
                  <span className="text-xs md:text-sm">
                    Don't have an account{' '}
                    <Link
                      href={'/account/register'}
                      className="border-b-2 text-orange-600 hover:text-orange-900 hover:border-orange-500"
                    >
                      Register
                    </Link>
                  </span>
                </div>
                <Button className="gap-2 px-4 py-2 bg-orange-50 text-black-600 rounded-3xl transition-all duration-300 hover:bg-orange-100 hover:shadow-lg hover:-translate-y-1 group border border-orange-200">
                  <span>Login</span>
                  <LogIn />
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
