'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, Loader2 } from 'lucide-react';
import { DeviconGoogle } from '@/lib/svg/DeviconGoogle';
import { Facebook } from 'lucide-react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { User } from '@prisma/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export default function LoginPage() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        const session = await getSession();
        if (session?.user) {
          if ((session.user as User).role === 'ADMIN') {
            setIsAdmin(true);
            console.log(session.user.role);
            toast({
              title: 'Logged in successfully!',
              description: 'Welcome back Admin!',
            });
          } else {
            toast({
              title: 'Logged in successfully!',
              description: 'Welcome back!',
            });
            console.log(session.user.role);
          }
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <main className="flex items-center justify-center pt-44">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Already Registered?
          </CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleProviderSignIn('google')}
            >
              <DeviconGoogle className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleProviderSignIn('facebook')}
            >
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
              Continue with Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <div className="text-sm">
            Don't have an account?{' '}
            <Link
              href="/shop/auth/register"
              className="font-medium text-orange-600 hover:text-orange-900"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
      {isAdmin && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Admin Access Detected</AlertDialogTitle>
              <AlertDialogDescription>
                You have admin privileges. Would you like to go to the admin
                dashboard?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => router.push('/')}>
                No, go to user dashboard
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push('/admin')}>
                Yes, go to admin dashboard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </main>
  );
}
